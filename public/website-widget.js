/**
 * Aurevia marketing-site chat widget.
 *
 * A deliberately simple sibling of the Shopify storefront widget (widget.js): the exact
 * same visual system — launcher pill, 400×660 light panel, Fraunces display face, the
 * two-layer animated mark, white bot bubbles / ink user bubbles — but with none of the
 * Shopify machinery. No WebSocket, no cart, no product cards.
 *
 * Transport is plain request/response: every user turn POSTs to
 *   {baseUrl}/api/website-widget/chat/
 * and renders whatever comes back (AureviaApp/api_website_widget.py). History lives in
 * localStorage and is sent with each request, so the backend stays stateless.
 *
 * The agent can reply with three interactive payloads, each rendered inline:
 *   response.question      -> options card (label + description, Claude-Code style)
 *   response.form          -> inline contact-details form
 *   response.action_button -> one prominent CTA (e.g. Calendly / install link)
 *
 * Override the backend with:
 *   window.__AUREVIA_SITE_WIDGET__ = { baseUrl: 'http://localhost:8000' }
 * in a <script> BEFORE this file loads.
 */
(function () {
    'use strict';

    if (window.__aureviaSiteWidgetLoaded) return;
    window.__aureviaSiteWidgetLoaded = true;

    var ASSET_BASE = 'https://app-widgets-aurevia.s3.eu-west-2.amazonaws.com/default';

    var ENV = (typeof window !== 'undefined' && window.__AUREVIA_SITE_WIDGET__) || {};
    var BASE_URL = ENV.baseUrl || 'https://app.aurevia.io';
    var CHAT_URL = BASE_URL.replace(/\/$/, '') + '/api/website-widget/chat/';
    // Publishable widget key (visible in the browser by design; rotatable from the admin
    // dashboard). Set via window.__AUREVIA_SITE_WIDGET__.apiKey before this script loads.
    var API_KEY = ENV.apiKey || '';

    var STORAGE_SESSION = 'aurevia_site_session_id';
    var STORAGE_HISTORY = 'aurevia_site_history';
    var MAX_STORED_TURNS = 40;

    /* ------------------------------------------------------------------ utils */

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /* Minimal markdown: bold, links (http(s) only), bullet lines, line breaks.
       Escapes first, so agent output can never inject markup. */
    function renderMarkdown(text) {
        var safe = escapeHtml(text);
        safe = safe.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        safe = safe.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
        safe = safe.replace(/^[-*] (.*)$/gm, '&bull; $1');
        safe = safe.replace(/\n/g, '<br>');
        return safe;
    }

    function uuid() {
        return 'xxxxxxxxyxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0;
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        }) + Date.now().toString(16);
    }

    /* ------------------------------------------------------------------ widget */

    function AureviaSiteWidget() {
        this.isOpen = false;
        this.busy = false;
        this.sessionId = this.restoreSessionId();
        this.history = this.restoreHistory();
        this.build();
        if (this.history.length === 0) {
            this.startSession();
        } else {
            this.renderHistory();
        }
    }

    AureviaSiteWidget.prototype.restoreSessionId = function () {
        try {
            var stored = localStorage.getItem(STORAGE_SESSION);
            if (stored) return stored;
            var fresh = uuid();
            localStorage.setItem(STORAGE_SESSION, fresh);
            return fresh;
        } catch (e) {
            return uuid();
        }
    };

    AureviaSiteWidget.prototype.restoreHistory = function () {
        try {
            var raw = localStorage.getItem(STORAGE_HISTORY);
            var parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            return [];
        }
    };

    AureviaSiteWidget.prototype.persistHistory = function () {
        try {
            localStorage.setItem(STORAGE_HISTORY, JSON.stringify(this.history.slice(-MAX_STORED_TURNS)));
        } catch (e) { /* storage full/blocked — history just won't survive reload */ }
    };

    AureviaSiteWidget.prototype.pushHistory = function (role, content) {
        this.history.push({ role: role, content: content });
        this.history = this.history.slice(-MAX_STORED_TURNS);
        this.persistHistory();
    };

    /* ------------------------------------------------------------------ styles */

    AureviaSiteWidget.prototype.injectStyles = function () {
        var style = document.createElement('style');
        style.textContent = '\n' +
        "@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap');\n" +
        ':root {\n' +
        '  --aurevia-font-display: "Fraunces", ui-serif, serif;\n' +
        '  --aurevia-ease-out: cubic-bezier(0.16, 1, 0.3, 1);\n' +
        '  --aurevia-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);\n' +
        '  --aurevia-dur-instant: 100ms;\n' +
        '  --aurevia-dur-fast: 160ms;\n' +
        '  --aurevia-dur-base: 220ms;\n' +
        '  --aurevia-radius-sm: 8px;\n' +
        '  --aurevia-radius-md: 12px;\n' +
        '  --aurevia-radius-lg: 18px;\n' +
        '  --aurevia-shadow-sm: 0 1px 2px rgba(15,15,15,0.06), 0 1px 1px rgba(15,15,15,0.04);\n' +
        '  --aurevia-shadow-lg: 0 24px 48px rgba(15,15,15,0.18), 0 8px 16px rgba(15,15,15,0.08);\n' +
        '}\n' +

        /* Launcher pill — same as the storefront widget's light-mode default */
        '#aurevia-site-bubble {\n' +
        '  position: fixed; bottom: calc(20px + env(safe-area-inset-bottom, 0px));\n' +
        '  right: calc(20px + env(safe-area-inset-right, 0px));\n' +
        '  height: 52px; max-width: min(280px, calc(100vw - 40px));\n' +
        '  border-radius: 999px; padding: 0 18px 0 6px;\n' +
        '  display: inline-flex; align-items: center; gap: 4px;\n' +
        '  background-color: #FFFFFF;\n' +
        '  background-image: linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 80%, #DFFBF0 100%);\n' +
        '  border: none; cursor: pointer; z-index: 2147483000;\n' +
        '  box-shadow: 0 4px 12px rgba(15,15,15,0.10), 0 12px 28px rgba(0,204,153,0.22);\n' +
        '  transition: transform var(--aurevia-dur-base) var(--aurevia-ease-out), box-shadow var(--aurevia-dur-base) var(--aurevia-ease-out);\n' +
        '  -webkit-tap-highlight-color: transparent; user-select: none;\n' +
        '}\n' +
        '#aurevia-site-bubble:hover { transform: scale(1.02); box-shadow: 0 6px 16px rgba(15,15,15,0.12), 0 14px 32px rgba(0,204,153,0.28); }\n' +
        '#aurevia-site-bubble:active { transform: scale(0.96); transition-duration: var(--aurevia-dur-instant); }\n' +
        '#aurevia-site-bubble.aurevia-hidden { display: none; }\n' +
        '#aurevia-site-bubble::before {\n' +
        '  content: ""; position: absolute; inset: auto 10% -10px 10%; height: 12px; border-radius: 999px;\n' +
        '  background: radial-gradient(ellipse at center, rgba(0,204,153,0.55) 0%, rgba(0,204,153,0) 70%);\n' +
        '  filter: blur(5px); pointer-events: none; z-index: -1;\n' +
        '  animation: aureviaSiteBubblePulse 3.2s var(--aurevia-ease-in-out) infinite;\n' +
        '}\n' +
        '@keyframes aureviaSiteBubblePulse { 0%,100% { transform: scale(0.85); opacity: 0; } 35% { opacity: 0.6; } 70% { transform: scale(1.65); opacity: 0; } }\n' +
        '.aurevia-site-bubble-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }\n' +
        '.aurevia-site-bubble-label { font-size: 12.5px; font-weight: 300; color: rgba(45,55,55,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.2; font-family: inherit; }\n' +

        /* Two-layer mark: spinning/breathing outer ring, static glyph */
        '.aurevia-site-mark { position: relative; display: inline-block; flex-shrink: 0; }\n' +
        '.aurevia-site-mark-breathe { position: absolute; inset: 0; }\n' +
        '.aurevia-site-mark img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; display: block; }\n' +
        '.aurevia-site-mark-animate .aurevia-site-mark-breathe { animation: aureviaSiteMarkBreathe 4s var(--aurevia-ease-in-out) infinite; }\n' +
        '.aurevia-site-mark-animate .aurevia-site-mark-outer { animation: aureviaSiteMarkSpin 10s linear infinite; }\n' +
        '@keyframes aureviaSiteMarkSpin { to { transform: rotate(360deg); } }\n' +
        '@keyframes aureviaSiteMarkBreathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.035); } }\n' +
        '@media (prefers-reduced-motion: reduce) {\n' +
        '  #aurevia-site-bubble::before, .aurevia-site-mark-breathe, .aurevia-site-mark-outer { animation: none !important; }\n' +
        '}\n' +

        /* Panel — 400×660, 12px radius, light surface + ambient glow */
        '#aurevia-site-panel {\n' +
        '  position: fixed; bottom: 20px; right: 20px; width: 400px; height: 660px;\n' +
        '  max-height: calc(100dvh - 40px); border-radius: var(--aurevia-radius-md);\n' +
        '  background-color: #F3F6F5;\n' +
        '  background-image: radial-gradient(circle at 100% -20%, rgba(0,82,61,0.22) 0%, transparent 65%);\n' +
        '  box-shadow: var(--aurevia-shadow-lg); display: none; flex-direction: column;\n' +
        '  overflow: hidden; z-index: 2147483001; transform-origin: bottom right;\n' +
        "  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n" +
        '}\n' +
        '#aurevia-site-panel.aurevia-open { display: flex; animation: aureviaSitePanelIn 320ms var(--aurevia-ease-out); }\n' +
        '@keyframes aureviaSitePanelIn { from { opacity: 0; transform: translateY(14px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }\n' +
        '#aurevia-site-panel * { box-sizing: border-box; font-family: inherit; }\n' +

        /* Header: 52px, transparent over the panel surface */
        '.aurevia-site-header { display: flex; align-items: center; gap: 8px; height: 52px; padding: 10px 14px 10px 18px; flex-shrink: 0; }\n' +
        '.aurevia-site-header-logo { width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }\n' +
        '.aurevia-site-header-info { flex: 1; min-width: 0; display: flex; flex-direction: column; }\n' +
        '.aurevia-site-header-title { font-family: var(--aurevia-font-display); font-weight: 600; font-size: 16px; color: #2D3737; line-height: 1.15; letter-spacing: -0.01em; }\n' +
        '.aurevia-site-header-status { display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 300; color: #2D3737; opacity: 0.9; margin-top: 1px; line-height: 1.1; }\n' +
        '.aurevia-site-header-status::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #00CC99; display: inline-block; }\n' +
        '.aurevia-site-header-btn {\n' +
        '  width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;\n' +
        '  padding: 0; border: none; border-radius: var(--aurevia-radius-sm); background: transparent;\n' +
        '  color: #2D3737; cursor: pointer; opacity: 0.75;\n' +
        '  transition: opacity var(--aurevia-dur-fast) var(--aurevia-ease-out), background-color var(--aurevia-dur-fast) var(--aurevia-ease-out);\n' +
        '}\n' +
        '.aurevia-site-header-btn:hover { opacity: 1; background-color: rgba(45,55,55,0.08); }\n' +
        '.aurevia-site-header-btn svg { width: 18px; height: 18px; display: block; }\n' +

        /* Messages */
        '.aurevia-site-messages { flex: 1; min-height: 0; overflow-y: auto; padding: 20px; scroll-behavior: smooth; scrollbar-width: none; }\n' +
        '.aurevia-site-messages::-webkit-scrollbar { display: none; }\n' +
        '.aurevia-site-message-list { display: flex; flex-direction: column; gap: 16px; }\n' +
        '.aurevia-site-msg { display: flex; max-width: 95%; animation: aureviaSiteMsgIn var(--aurevia-dur-base) var(--aurevia-ease-out); }\n' +
        '@keyframes aureviaSiteMsgIn { from { opacity: 0; transform: translateY(6px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }\n' +
        '.aurevia-site-msg.bot { justify-content: flex-start; align-items: flex-start; gap: 8px; }\n' +
        '.aurevia-site-msg.user { justify-content: flex-end; margin-left: auto; }\n' +
        '.aurevia-site-avatar { width: 26px; height: 26px; flex-shrink: 0; }\n' +
        '.aurevia-site-bubble-msg { padding: 10px 12px; border-radius: var(--aurevia-radius-md); box-shadow: var(--aurevia-shadow-sm); word-wrap: break-word; overflow-wrap: break-word; min-width: 0; }\n' +
        '.aurevia-site-msg.bot .aurevia-site-bubble-msg { background: #FFFFFF; color: #2D3737; font-size: 13px; line-height: 1.45; border-top-left-radius: 4px; }\n' +
        '.aurevia-site-msg.user .aurevia-site-bubble-msg { background: #2D3737; color: #FFFFFF; font-size: 14px; line-height: 1.5; padding: 10px 13px; border-bottom-right-radius: 4px; }\n' +
        '.aurevia-site-bubble-msg a { color: #009973; border-bottom: 1px solid rgba(0,153,115,0.3); text-decoration: none; }\n' +
        '.aurevia-site-bubble-msg a:hover { border-bottom-color: #009973; }\n' +
        '.aurevia-site-msg.user .aurevia-site-bubble-msg a { color: #7ef0cf; border-bottom-color: rgba(126,240,207,0.4); }\n' +

        /* Typing indicator */
        '.aurevia-site-typing-dots { display: flex; align-items: center; gap: 4px; padding: 12px 14px; }\n' +
        '.aurevia-site-typing-dots span { width: 6px; height: 6px; border-radius: 50%; background: rgba(45,55,55,0.45); animation: aureviaSiteDot 1.2s ease-in-out infinite; }\n' +
        '.aurevia-site-typing-dots span:nth-child(2) { animation-delay: 0.15s; }\n' +
        '.aurevia-site-typing-dots span:nth-child(3) { animation-delay: 0.3s; }\n' +
        '@keyframes aureviaSiteDot { 0%,60%,100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-5px); opacity: 1; } }\n' +

        /* Quick-reply pills (same .option-button recipe as the storefront widget) */
        '.aurevia-site-options { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 2px; margin-left: 34px; max-width: calc(95% - 34px); }\n' +
        '.aurevia-site-option-pill {\n' +
        '  padding: 8px 16px; background-color: #FFFFFF; color: #2D3737;\n' +
        '  border: 1px solid rgba(15,15,15,0.08); border-radius: 9999px; font-size: 13px; font-weight: 500;\n' +
        '  cursor: pointer; box-shadow: 0 1px 2px rgba(15,15,15,0.05), 0 4px 10px rgba(15,15,15,0.06);\n' +
        '  transition: background-color var(--aurevia-dur-fast) var(--aurevia-ease-out), color var(--aurevia-dur-fast) var(--aurevia-ease-out), transform var(--aurevia-dur-instant) var(--aurevia-ease-out);\n' +
        '}\n' +
        '.aurevia-site-option-pill:hover { background-color: #00CC99; color: #FFFFFF; border-color: transparent; }\n' +
        '.aurevia-site-option-pill:active { transform: scale(0.96); }\n' +

        /* Dock — interactive question/form surface pinned just above the input bar,
           styled like the storefront widget's sticky cart bar (rounded-top card). */
        '.aurevia-site-dock { flex-shrink: 0; padding: 6px 16px 0; }\n' +
        '.aurevia-site-dock[hidden] { display: none; }\n' +
        '.aurevia-site-dock-inner {\n' +
        '  border-radius: 9px 9px 0 0; background: linear-gradient(180deg, #ffffff 0%, #f4f5f6 100%);\n' +
        '  border: 1px solid rgba(0,0,0,0.06); border-bottom: none;\n' +
        '  box-shadow: 0 -4px 14px rgba(0,0,0,0.05);\n' +
        '  max-height: 320px; overflow-y: auto;\n' +
        '  animation: aureviaSiteDockIn 0.55s cubic-bezier(0.22, 1, 0.36, 1);\n' +
        '}\n' +
        '@keyframes aureviaSiteDockIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }\n' +

        /* Question card — structured options with label + description (rendered in the dock) */
        '.aurevia-site-question { overflow: hidden; }\n' +
        '.aurevia-site-question-text { padding: 10px 12px 8px; font-size: 13px; line-height: 1.45; color: #2D3737; font-weight: 600; }\n' +
        '.aurevia-site-question-options { display: flex; flex-direction: column; padding: 0 8px 8px; gap: 6px; }\n' +
        '.aurevia-site-question-option {\n' +
        '  text-align: left; padding: 9px 12px; border: 1px solid rgba(15,15,15,0.08); border-radius: var(--aurevia-radius-sm);\n' +
        '  background: #FFFFFF; cursor: pointer; display: flex; flex-direction: column; gap: 2px;\n' +
        '  transition: border-color var(--aurevia-dur-fast) var(--aurevia-ease-out), background-color var(--aurevia-dur-fast) var(--aurevia-ease-out), transform var(--aurevia-dur-instant) var(--aurevia-ease-out);\n' +
        '}\n' +
        '.aurevia-site-question-option:hover { border-color: #00CC99; background: rgba(0,204,153,0.06); }\n' +
        '.aurevia-site-question-option:active { transform: scale(0.98); }\n' +
        '.aurevia-site-question-option-label { font-size: 13px; font-weight: 600; color: #2D3737; line-height: 1.3; }\n' +
        '.aurevia-site-question-option-desc { font-size: 12px; font-weight: 400; color: #6B7573; line-height: 1.35; }\n' +

        /* Contact form (lead-form styling from the storefront widget; rendered in the dock) */
        '.aurevia-site-form { padding: 12px; }\n' +
        '.aurevia-site-form-title { font-family: var(--aurevia-font-display); font-size: 15px; font-weight: 600; color: #2D3737; margin: 0 0 2px; }\n' +
        '.aurevia-site-form-intro { font-size: 12px; color: #6B7573; margin: 0 0 10px; line-height: 1.4; }\n' +
        '.aurevia-site-form-field { margin-bottom: 8px; }\n' +
        '.aurevia-site-form-field label { display: block; font-size: 11px; font-weight: 500; color: #6B7573; margin-bottom: 3px; }\n' +
        '.aurevia-site-form-field input, .aurevia-site-form-field textarea {\n' +
        '  width: 100%; padding: 9px 11px; font-size: 13px; color: #2D3737; background: #FFFFFF;\n' +
        '  border: 1px solid rgba(15,15,15,0.12); border-radius: var(--aurevia-radius-sm); outline: none;\n' +
        '  transition: border-color var(--aurevia-dur-base) var(--aurevia-ease-out), box-shadow var(--aurevia-dur-base) var(--aurevia-ease-out);\n' +
        '}\n' +
        '.aurevia-site-form-field input:hover, .aurevia-site-form-field textarea:hover { border-color: rgba(0,0,0,0.18); }\n' +
        '.aurevia-site-form-field input:focus, .aurevia-site-form-field textarea:focus { border-color: #00CC99; box-shadow: 0 0 0 3px rgba(0,204,153,0.16); }\n' +
        '.aurevia-site-form-error { color: #ef4444; font-size: 12px; margin: 4px 0 0; display: none; }\n' +
        '.aurevia-site-form-submit {\n' +
        '  width: 100%; margin-top: 4px; padding: 10px 14px; border: none; border-radius: 999px;\n' +
        '  font-size: 13px; font-weight: 600; color: #FFFFFF; cursor: pointer;\n' +
        '  background-image: linear-gradient(135deg, #00CC99, #009973);\n' +
        '  box-shadow: 0 6px 16px rgba(0,153,115,0.35);\n' +
        '  transition: opacity var(--aurevia-dur-fast) var(--aurevia-ease-out), box-shadow var(--aurevia-dur-fast) var(--aurevia-ease-out), transform var(--aurevia-dur-instant) var(--aurevia-ease-out);\n' +
        '}\n' +
        '.aurevia-site-form-submit:hover { box-shadow: 0 8px 20px rgba(0,153,115,0.45); }\n' +
        '.aurevia-site-form-submit:active { transform: scale(0.98); }\n' +
        '.aurevia-site-form-submit:disabled { opacity: 0.55; cursor: default; }\n' +

        /* Action CTA button */
        '.aurevia-site-action { margin: 2px 0 0 34px; max-width: calc(95% - 34px); }\n' +
        '.aurevia-site-action a {\n' +
        '  display: block; text-align: center; padding: 11px 16px; border-radius: 999px;\n' +
        '  font-size: 13px; font-weight: 600; color: #FFFFFF; text-decoration: none;\n' +
        '  background-image: linear-gradient(135deg, #00CC99, #009973);\n' +
        '  box-shadow: 0 6px 16px rgba(0,153,115,0.35);\n' +
        '  transition: box-shadow var(--aurevia-dur-fast) var(--aurevia-ease-out), transform var(--aurevia-dur-instant) var(--aurevia-ease-out);\n' +
        '}\n' +
        '.aurevia-site-action a:hover { box-shadow: 0 8px 20px rgba(0,153,115,0.45); }\n' +
        '.aurevia-site-action a:active { transform: scale(0.98); }\n' +

        /* Input area */
        '.aurevia-site-input-wrap { flex-shrink: 0; padding: 0 8px 8px; }\n' +
        '.aurevia-site-input-pill {\n' +
        '  display: flex; align-items: center; gap: 6px; padding: 6px 6px 6px 16px;\n' +
        '  border-radius: var(--aurevia-radius-lg); background: #FFFFFF;\n' +
        '  border: 1px solid rgba(15,15,15,0.05);\n' +
        '  box-shadow: 0 1px 2px rgba(15,15,15,0.04), 0 6px 16px rgba(15,15,15,0.10), 0 1px 0 rgba(255,255,255,0.6) inset;\n' +
        '  transition: border-color var(--aurevia-dur-base) var(--aurevia-ease-out), box-shadow var(--aurevia-dur-base) var(--aurevia-ease-out);\n' +
        '}\n' +
        '.aurevia-site-input-pill:focus-within { border-color: #00CC99; box-shadow: 0 1px 2px rgba(15,15,15,0.04), 0 6px 16px rgba(15,15,15,0.10), 0 0 0 3px rgba(0,204,153,0.16); }\n' +
        '#aurevia-site-input {\n' +
        '  flex: 1; resize: none; background: transparent; color: #3a3a3a; border: none;\n' +
        '  height: 40px; padding: 8px 12px 8px 0; line-height: 1.5; font-size: 14px; outline: none; caret-color: #00CC99;\n' +
        '}\n' +
        '#aurevia-site-input::placeholder { color: rgb(154,154,154); opacity: 1; }\n' +
        '#aurevia-site-send {\n' +
        '  display: flex; align-items: center; justify-content: center; width: 38px; height: 38px;\n' +
        '  border-radius: 50%; border: none; padding: 0; cursor: pointer; flex-shrink: 0;\n' +
        '  background-color: #1A1A1A; color: #FFFFFF;\n' +
        '  transition: opacity var(--aurevia-dur-fast) var(--aurevia-ease-out), transform var(--aurevia-dur-instant) var(--aurevia-ease-out);\n' +
        '}\n' +
        '#aurevia-site-send:hover { opacity: 0.9; }\n' +
        '#aurevia-site-send:active { transform: scale(0.94); opacity: 0.85; }\n' +
        '#aurevia-site-send:disabled { opacity: 0.45; cursor: default; transform: none; }\n' +
        '#aurevia-site-send svg { width: 18px; height: 18px; display: block; }\n' +
        '.aurevia-site-powered {\n' +
        '  display: flex; align-items: center; justify-content: center; gap: 5px; padding: 8px 0 0;\n' +
        '  font-size: 12px; font-weight: 500; color: rgba(45,55,55,0.5); text-decoration: none; user-select: none;\n' +
        '  transition: color var(--aurevia-dur-fast) var(--aurevia-ease-out);\n' +
        '}\n' +
        '.aurevia-site-powered:hover { color: rgba(45,55,55,0.75); }\n' +
        '.aurevia-site-powered img { height: 15px; width: auto; display: block; opacity: 0.85; }\n' +

        /* Phone: full-bleed sheet */
        '@media (max-width: 480px) {\n' +
        '  #aurevia-site-panel {\n' +
        '    left: 0; right: 0; top: env(safe-area-inset-top, 0px); bottom: 0;\n' +
        '    width: 100%; max-width: 100%; height: auto;\n' +
        '    max-height: calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom));\n' +
        '    border-radius: 0; box-shadow: none; transform-origin: bottom center;\n' +
        '  }\n' +
        '  #aurevia-site-bubble { bottom: calc(16px + env(safe-area-inset-bottom, 0px)); right: calc(16px + env(safe-area-inset-right, 0px)); }\n' +
        '}\n' +
        '@media (max-width: 768px) and (min-width: 481px) {\n' +
        '  #aurevia-site-panel { left: 0; right: 0; margin: 0 auto; width: 400px; max-height: calc(100dvh - 40px); }\n' +
        '}\n';
        document.head.appendChild(style);
    };

    /* ------------------------------------------------------------------ dom */

    /* The mark is just the knot ring — no inner glyph — spinning at a visible pace. */
    AureviaSiteWidget.prototype.markHtml = function (size, animate) {
        return '<span class="aurevia-site-mark' + (animate ? ' aurevia-site-mark-animate' : '') + '" style="width:' + size + 'px;height:' + size + 'px" aria-hidden="true">' +
            '<span class="aurevia-site-mark-breathe"><img class="aurevia-site-mark-outer" src="' + ASSET_BASE + '/outer_circle.png" alt=""></span>' +
        '</span>';
    };

    AureviaSiteWidget.prototype.build = function () {
        this.injectStyles();

        var bubble = document.createElement('button');
        bubble.id = 'aurevia-site-bubble';
        bubble.type = 'button';
        bubble.setAttribute('aria-label', 'Open Aurevia chat');
        bubble.innerHTML =
            '<span class="aurevia-site-bubble-icon">' + this.markHtml(32, true) + '</span>' +
            '<span class="aurevia-site-bubble-label">Ask Aurevia anything…</span>';
        document.body.appendChild(bubble);
        this.bubble = bubble;

        var panel = document.createElement('div');
        panel.id = 'aurevia-site-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'Aurevia chat');
        panel.innerHTML =
            '<div class="aurevia-site-header">' +
                '<div class="aurevia-site-header-logo">' + this.markHtml(32, true) + '</div>' +
                '<div class="aurevia-site-header-info">' +
                    '<span class="aurevia-site-header-title">Aurevia</span>' +
                    '<span class="aurevia-site-header-status">Online</span>' +
                '</div>' +
                '<button type="button" class="aurevia-site-header-btn" id="aurevia-site-new-chat" aria-label="Start new chat" title="Start new chat">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="12" y1="7" x2="12" y2="13"/><line x1="9" y1="10" x2="15" y2="10"/></svg>' +
                '</button>' +
                '<button type="button" class="aurevia-site-header-btn" id="aurevia-site-minimize" aria-label="Minimize chat" title="Minimize">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
                '</button>' +
            '</div>' +
            '<div class="aurevia-site-messages"><div class="aurevia-site-message-list" id="aurevia-site-message-list"></div></div>' +
            '<div class="aurevia-site-dock" id="aurevia-site-dock" hidden></div>' +
            '<div class="aurevia-site-input-wrap">' +
                '<div class="aurevia-site-input-pill">' +
                    '<textarea id="aurevia-site-input" placeholder="Ask Aurevia" rows="1" title="Type your message. Press Enter to send."></textarea>' +
                    '<button type="button" id="aurevia-site-send" aria-label="Send message">' +
                        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>' +
                    '</button>' +
                '</div>' +
                '<a class="aurevia-site-powered" href="https://www.aurevia.io" target="_blank" rel="noopener noreferrer">' +
                    '<img src="' + ASSET_BASE + '/logo.png" alt="Aurevia"><span>Powered by Aurevia.io</span>' +
                '</a>' +
            '</div>';
        document.body.appendChild(panel);
        this.panel = panel;
        this.messagesEl = panel.querySelector('.aurevia-site-messages');
        this.listEl = panel.querySelector('#aurevia-site-message-list');
        this.dockEl = panel.querySelector('#aurevia-site-dock');
        this.inputEl = panel.querySelector('#aurevia-site-input');
        this.sendBtn = panel.querySelector('#aurevia-site-send');

        var self = this;
        bubble.addEventListener('click', function () { self.open(); });
        panel.querySelector('#aurevia-site-minimize').addEventListener('click', function () { self.close(); });
        panel.querySelector('#aurevia-site-new-chat').addEventListener('click', function () { self.resetSession(); });
        this.sendBtn.addEventListener('click', function () { self.sendMessage(); });
        this.inputEl.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                self.sendMessage();
            }
        });
    };

    AureviaSiteWidget.prototype.open = function () {
        this.isOpen = true;
        this.bubble.classList.add('aurevia-hidden');
        this.panel.classList.add('aurevia-open');
        this.scrollToBottom();
        this.inputEl.focus();
    };

    AureviaSiteWidget.prototype.close = function () {
        this.isOpen = false;
        this.panel.classList.remove('aurevia-open');
        this.bubble.classList.remove('aurevia-hidden');
    };

    AureviaSiteWidget.prototype.resetSession = function () {
        try {
            localStorage.removeItem(STORAGE_HISTORY);
            localStorage.removeItem(STORAGE_SESSION);
        } catch (e) { /* ignore */ }
        this.history = [];
        this.sessionId = this.restoreSessionId();
        this.listEl.innerHTML = '';
        this.startSession();
    };

    AureviaSiteWidget.prototype.scrollToBottom = function () {
        var el = this.messagesEl;
        if (el) requestAnimationFrame(function () { el.scrollTop = el.scrollHeight; });
    };

    /* ------------------------------------------------------------------ rendering */

    AureviaSiteWidget.prototype.addBotMessage = function (text) {
        var row = document.createElement('div');
        row.className = 'aurevia-site-msg bot';
        row.innerHTML =
            '<span class="aurevia-site-avatar">' + this.markHtml(26, false) + '</span>' +
            '<div class="aurevia-site-bubble-msg">' + renderMarkdown(text) + '</div>';
        this.listEl.appendChild(row);
        this.scrollToBottom();
        return row;
    };

    AureviaSiteWidget.prototype.addUserMessage = function (text) {
        var row = document.createElement('div');
        row.className = 'aurevia-site-msg user';
        row.innerHTML = '<div class="aurevia-site-bubble-msg">' + renderMarkdown(text) + '</div>';
        this.listEl.appendChild(row);
        this.scrollToBottom();
        return row;
    };

    AureviaSiteWidget.prototype.showTyping = function () {
        this.hideTyping();
        var row = document.createElement('div');
        row.className = 'aurevia-site-msg bot';
        row.id = 'aurevia-site-typing';
        row.innerHTML =
            '<span class="aurevia-site-avatar">' + this.markHtml(26, false) + '</span>' +
            '<div class="aurevia-site-bubble-msg aurevia-site-typing-dots"><span></span><span></span><span></span></div>';
        this.listEl.appendChild(row);
        this.scrollToBottom();
    };

    AureviaSiteWidget.prototype.hideTyping = function () {
        var typing = document.getElementById('aurevia-site-typing');
        if (typing) typing.remove();
    };

    /* The dock holds at most one interactive surface (question or form), pinned just
       above the input bar — the same slot the storefront widget uses for its cart bar. */
    AureviaSiteWidget.prototype.showDock = function (contentEl) {
        this.dockEl.innerHTML = '';
        var inner = document.createElement('div');
        inner.className = 'aurevia-site-dock-inner';
        inner.appendChild(contentEl);
        this.dockEl.appendChild(inner);
        this.dockEl.hidden = false;
        this.scrollToBottom();
    };

    AureviaSiteWidget.prototype.clearDock = function () {
        this.dockEl.innerHTML = '';
        this.dockEl.hidden = true;
    };

    AureviaSiteWidget.prototype.clearInteractive = function () {
        // A new turn supersedes any pending pills and whatever sits in the dock.
        this.listEl.querySelectorAll('.aurevia-site-options').forEach(function (el) { el.remove(); });
        this.clearDock();
    };

    AureviaSiteWidget.prototype.addPills = function (pills) {
        var self = this;
        var container = document.createElement('div');
        container.className = 'aurevia-site-options';
        pills.forEach(function (label) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'aurevia-site-option-pill';
            btn.textContent = String(label);
            btn.addEventListener('click', function () {
                container.remove();
                self.sendMessage(String(label));
            });
            container.appendChild(btn);
        });
        this.listEl.appendChild(container);
        this.scrollToBottom();
    };

    /* Ask-question tool: options card with label + optional description, docked
       above the input bar. Picking an option clears the dock and sends the answer. */
    AureviaSiteWidget.prototype.addQuestionCard = function (question) {
        var self = this;
        var card = document.createElement('div');
        card.className = 'aurevia-site-question';

        if (question.text) {
            var textEl = document.createElement('div');
            textEl.className = 'aurevia-site-question-text';
            textEl.textContent = question.text;
            card.appendChild(textEl);
        }

        var options = document.createElement('div');
        options.className = 'aurevia-site-question-options';
        (question.options || []).forEach(function (opt) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'aurevia-site-question-option';
            var label = document.createElement('span');
            label.className = 'aurevia-site-question-option-label';
            label.textContent = opt.label || '';
            btn.appendChild(label);
            if (opt.description) {
                var desc = document.createElement('span');
                desc.className = 'aurevia-site-question-option-desc';
                desc.textContent = opt.description;
                btn.appendChild(desc);
            }
            btn.addEventListener('click', function () {
                self.sendMessage(opt.label || '');
            });
            options.appendChild(btn);
        });
        card.appendChild(options);
        this.showDock(card);
    };

    /* Contact-details form tool. */
    AureviaSiteWidget.prototype.addFormCard = function (form) {
        var self = this;
        var card = document.createElement('div');
        card.className = 'aurevia-site-form';

        var title = document.createElement('p');
        title.className = 'aurevia-site-form-title';
        title.textContent = form.title || 'Leave your details';
        card.appendChild(title);

        if (form.intro) {
            var intro = document.createElement('p');
            intro.className = 'aurevia-site-form-intro';
            intro.textContent = form.intro;
            card.appendChild(intro);
        }

        var fields = Array.isArray(form.fields) && form.fields.length ? form.fields : [
            { name: 'name', label: 'Name', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
        ];
        var inputs = {};
        fields.forEach(function (field) {
            var wrap = document.createElement('div');
            wrap.className = 'aurevia-site-form-field';
            var label = document.createElement('label');
            label.textContent = field.label + (field.required ? ' *' : '');
            wrap.appendChild(label);
            var input = document.createElement(field.type === 'textarea' ? 'textarea' : 'input');
            if (field.type !== 'textarea') input.type = field.type || 'text';
            input.name = field.name;
            wrap.appendChild(input);
            inputs[field.name] = { el: input, field: field };
            card.appendChild(wrap);
        });

        var error = document.createElement('p');
        error.className = 'aurevia-site-form-error';
        card.appendChild(error);

        var submit = document.createElement('button');
        submit.type = 'button';
        submit.className = 'aurevia-site-form-submit';
        submit.textContent = 'Submit';
        submit.addEventListener('click', function () {
            var values = {};
            var missing = null;
            Object.keys(inputs).forEach(function (name) {
                var entry = inputs[name];
                var value = String(entry.el.value || '').trim();
                values[name] = value;
                if (!missing && entry.field.required && !value) missing = entry.field.label;
            });
            var email = values.email || '';
            if (missing) {
                error.textContent = missing + ' is required.';
                error.style.display = 'block';
                return;
            }
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                error.textContent = 'Please enter a valid email address.';
                error.style.display = 'block';
                return;
            }
            error.style.display = 'none';
            submit.disabled = true;
            submit.textContent = 'Sending…';
            self.submitForm(values, card, submit);
        });
        card.appendChild(submit);

        this.showDock(card);
    };

    /* Action-button tool: one prominent CTA the admin configured. */
    AureviaSiteWidget.prototype.addActionButton = function (action) {
        if (!action || !action.url || !/^https?:\/\//.test(action.url)) return;
        var wrap = document.createElement('div');
        wrap.className = 'aurevia-site-action';
        var link = document.createElement('a');
        link.href = action.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = action.label || 'Open link';
        wrap.appendChild(link);
        this.listEl.appendChild(wrap);
        this.scrollToBottom();
    };

    AureviaSiteWidget.prototype.renderResponse = function (payload) {
        if (!payload) return;
        if (payload.message) {
            this.addBotMessage(payload.message);
            this.pushHistory('assistant', payload.message);
        }
        if (payload.question && Array.isArray(payload.question.options) && payload.question.options.length) {
            this.addQuestionCard(payload.question);
        }
        if (payload.form) this.addFormCard(payload.form);
        if (payload.action_button) this.addActionButton(payload.action_button);
        if (Array.isArray(payload.pills) && payload.pills.length) this.addPills(payload.pills);
    };

    AureviaSiteWidget.prototype.renderHistory = function () {
        var self = this;
        this.history.forEach(function (turn) {
            if (turn.role === 'assistant') self.addBotMessage(turn.content);
            else self.addUserMessage(turn.content);
        });
    };

    /* ------------------------------------------------------------------ transport */

    AureviaSiteWidget.prototype.post = function (body) {
        return fetch(CHAT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Aurevia-Widget-Key': API_KEY,
            },
            body: JSON.stringify(body),
        }).then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.json();
        });
    };

    AureviaSiteWidget.prototype.startSession = function () {
        var self = this;
        this.post({
            event: 'session_start',
            session_id: this.sessionId,
            page_url: window.location.href,
        }).then(function (payload) {
            self.renderResponse(payload);
        }).catch(function () {
            self.addBotMessage("Hi, I'm Aurevia's assistant. What brings you here today?");
        });
    };

    AureviaSiteWidget.prototype.sendMessage = function (presetText) {
        var text = presetText != null ? String(presetText) : String(this.inputEl.value || '');
        text = text.trim();
        if (!text || this.busy) return;

        if (presetText == null) this.inputEl.value = '';
        this.clearInteractive();

        // History BEFORE this turn goes to the backend; the new turn rides in `message`.
        var priorHistory = this.history.slice(-MAX_STORED_TURNS);
        this.addUserMessage(text);
        this.pushHistory('user', text);

        this.busy = true;
        this.sendBtn.disabled = true;
        this.showTyping();

        var self = this;
        this.post({
            event: 'chat',
            session_id: this.sessionId,
            message: text,
            history: priorHistory,
            page_url: window.location.href,
        }).then(function (payload) {
            self.hideTyping();
            self.renderResponse(payload);
        }).catch(function () {
            self.hideTyping();
            self.addBotMessage("I'm having trouble connecting right now — please try again in a moment.");
        }).finally(function () {
            self.busy = false;
            self.sendBtn.disabled = false;
        });
    };

    AureviaSiteWidget.prototype.submitForm = function (values, card, submitBtn) {
        var self = this;
        this.post({
            event: 'form_submitted',
            session_id: this.sessionId,
            values: values,
            page_url: window.location.href,
        }).then(function (payload) {
            self.clearDock();
            var summary = Object.keys(values)
                .filter(function (k) { return values[k]; })
                .map(function (k) { return values[k]; })
                .join(' · ');
            self.addUserMessage(summary || 'Submitted contact details');
            self.pushHistory('user', 'Submitted contact details: ' + JSON.stringify(values));
            if (payload && payload.message) {
                self.addBotMessage(payload.message);
                self.pushHistory('assistant', payload.message);
            }
        }).catch(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
            var error = card.querySelector('.aurevia-site-form-error');
            if (error) {
                error.textContent = 'Could not send — please try again.';
                error.style.display = 'block';
            }
        });
    };

    /* ------------------------------------------------------------------ boot */

    function boot() {
        try {
            // Instance exposed for debugging/QA (e.g. widget.renderResponse({...}) in devtools).
            window.__aureviaSiteWidget = new AureviaSiteWidget();
        } catch (e) {
            console.error('Aurevia site widget failed to initialize:', e);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
