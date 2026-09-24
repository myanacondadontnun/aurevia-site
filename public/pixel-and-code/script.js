/* ============================================================
   Pixel & Code — interactions & animation
   ============================================================ */
// Next.js injects the gsap/ScrollTrigger tags and this file as async scripts, so
// load order isn't guaranteed. Booting before gsap exists silently disabled every
// animation (logo mark morph, hero entrance, reveals). Wait for it, briefly.
(function waitForGsap(tries) {
  if ((typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") || tries > 60) return pcBoot();
  setTimeout(function () { waitForGsap(tries + 1); }, 50);
})(0);

function pcBoot() {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGSAP = typeof gsap !== "undefined";

  /* ---------- Ad tracking (IDs live in index.html: window.PC_ANALYTICS) ---------- */
  const A = window.PC_ANALYTICS || {};
  if (A.ga4) {
    const g = document.createElement("script"); g.async = true; g.src = "https://www.googletagmanager.com/gtag/js?id=" + A.ga4; document.head.appendChild(g);
    window.dataLayer = window.dataLayer || []; window.gtag = function () { window.dataLayer.push(arguments); };
    gtag("js", new Date()); gtag("config", A.ga4);
  }
  if (A.meta) {
    !(function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", A.meta); fbq("track", "PageView");
  }
  // pcTrack("lead_submit" | "book_call" | "chat_lead" | "email_click")
  window.pcTrack = function (name, params) {
    try { if (window.gtag) gtag("event", name, params || {}); } catch {}
    try { if (window.fbq) fbq("trackCustom", name, params || {}); if (window.fbq && name === "lead_submit") fbq("track", "Lead"); } catch {}
  };
  document.addEventListener("click", (e) => { const t = e.target.closest("[data-track]"); if (t) window.pcTrack(t.dataset.track); });
  if (hasGSAP && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  document.querySelector("[data-year]").textContent = new Date().getFullYear();

  /* ---------- Three.js background: pixel field + drifting code --------
     A pixel wave field is always present. Once you scroll past the hero,
     a cloud of code tokens fades in over it — pixels in the hero, both
     everywhere below.                                                     */
  function initThree() {
    const canvas = document.querySelector("[data-canvas]");
    if (!canvas || reduce || typeof THREE === "undefined") return;

    const ACCENT = 0x00cc99;
    const isSmall = window.innerWidth < 760;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090b, 0.05);

    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 100);
    camera.position.set(0, 4.2, 13);
    camera.lookAt(0, -0.3, -3);

    /* --- pixel wave field (always visible) --- */
    const NX = isSmall ? 28 : 48;
    const NZ = isSmall ? 28 : 48;
    const GAP = 0.5, SIZE = 0.32;
    const mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(SIZE, SIZE, SIZE), new THREE.MeshBasicMaterial({ transparent: true }), NX * NZ);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.rotation.x = -Math.PI * 0.5 * 0.82;
    mesh.position.y = -2.6;
    scene.add(mesh);
    const dummy = new THREE.Object3D();
    const cBase = new THREE.Color(0x171a21), cAccent = new THREE.Color(ACCENT), cTmp = new THREE.Color();
    const halfX = ((NX - 1) * GAP) / 2, halfZ = ((NZ - 1) * GAP) / 2;

    /* --- drifting code tokens (fade in past the hero) --- */
    const TOKENS = [
      "</>", "{ }", "[ ]", "( )", "=>", "const", "let", "return", "async", "await",
      "import", "export", "function", "class", "def", "null", "true", "&&", "||", "===",
      "0x1F", "git push", "npm run", "<div>", "useState", "props", "// TODO", "<Pixel/>",
      "&Code", "fetch()", "#!/bin", "AI", "RAG", ";", "::", "…", "µs", "λ",
    ];
    function makeToken(text, accent) {
      const c = document.createElement("canvas");
      const ctx = c.getContext("2d");
      const dpr = 2, fs = 44;
      ctx.font = `600 ${fs}px "JetBrains Mono", ui-monospace, monospace`;
      const w = Math.ceil(ctx.measureText(text).width) + 20, h = fs + 20;
      c.width = w * dpr; c.height = h * dpr;
      ctx.scale(dpr, dpr);
      ctx.font = `600 ${fs}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "middle"; ctx.textAlign = "center";
      if (accent) { ctx.shadowColor = "rgba(0,204,153,0.6)"; ctx.shadowBlur = 12; }
      ctx.fillStyle = accent ? "#00cc99" : "#cfd4de";
      ctx.fillText(text, w / 2, h / 2);
      const tex = new THREE.CanvasTexture(c);
      tex.minFilter = THREE.LinearFilter;
      const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false }));
      const scale = 0.8;
      spr.scale.set((w / h) * scale, scale, 1);
      return spr;
    }
    // Some pages (e.g. How We Work) skip the pixel field entirely and show
    // only the drifting code tokens, right from the top of the hero — so
    // that mode runs fewer, dimmer tokens to stay calm behind readable text.
    const codeOnly = document.body.dataset.bg === "code";
    const COUNT = isSmall ? 24 : (codeOnly ? 30 : 48);
    const codeGroup = new THREE.Group();
    const items = [];
    for (let i = 0; i < COUNT; i++) {
      const accent = Math.random() < 0.16;
      const spr = makeToken(TOKENS[(Math.random() * TOKENS.length) | 0], accent);
      spr.position.set((Math.random() - 0.5) * 32, Math.random() * 16 - 1, (Math.random() - 0.5) * 22 - 6);
      codeGroup.add(spr);
      const baseOpacity = (accent ? 0.85 : 0.5) * (codeOnly ? 0.7 : 1);
      items.push({ spr, base: baseOpacity, vy: 0.004 + Math.random() * 0.006, bob: Math.random() * Math.PI * 2 });
    }
    scene.add(codeGroup);

    let tx = 0.15, ty = -0.4, mx = 0.15, my = -0.4;
    window.addEventListener("mousemove", (e) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    });

    function resize() {
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    (function render() {
      requestAnimationFrame(render);
      t += 0.02;
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;

      // scroll drives the crossfade: pixels in the hero, code below.
      // code-only pages skip the pixel field and ease the code tokens in
      // gently over the first couple of seconds instead of snapping to full opacity.
      const vh = window.innerHeight || 1;
      const fade = codeOnly ? Math.min(1, t / 2.2) : Math.min(1, Math.max(0, (window.scrollY - vh * 0.55) / (vh * 0.6)));
      const pxOpacity = codeOnly ? 0 : 1 - fade;

      // pixel field: layered waves + cursor ripple (only while visible)
      mesh.visible = pxOpacity > 0.01;
      mesh.material.opacity = pxOpacity;
      if (mesh.visible) {
        const cursorX = mx * halfX * 2, cursorZ = my * halfZ * 2;
        let idx = 0;
        for (let i = 0; i < NX; i++) {
          for (let j = 0; j < NZ; j++) {
            const x = i * GAP - halfX, z = j * GAP - halfZ;
            let hgt = Math.sin(x * 0.5 + t) * 0.35 + Math.cos(z * 0.5 + t * 0.9) * 0.35 + Math.sin((x + z) * 0.35 + t * 1.3) * 0.3;
            const dx = x - cursorX, dz = z - cursorZ;
            hgt += Math.exp(-(dx * dx + dz * dz) * 0.12) * 1.15;
            dummy.position.set(x, hgt, z); dummy.updateMatrix();
            mesh.setMatrixAt(idx, dummy.matrix);
            const norm = Math.min(Math.max((hgt + 1.0) / 2.6, 0), 1);
            cTmp.copy(cBase).lerp(cAccent, norm * norm * 0.8);
            mesh.setColorAt(idx, cTmp);
            idx++;
          }
        }
        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      }
      for (let k = 0; k < items.length; k++) {
        const it = items[k];
        it.spr.visible = fade > 0.01;
        it.spr.material.opacity = it.base * fade;
        it.spr.position.y += it.vy;
        it.spr.position.x += Math.sin(t * 0.5 + it.bob) * 0.0016;
        if (it.spr.position.y > 15) it.spr.position.y = -1;
      }
      codeGroup.rotation.y = mx * 0.28;
      codeGroup.rotation.x = my * 0.14;

      camera.position.x += (mx * 2 - camera.position.x) * 0.05;
      camera.lookAt(0, -0.3, -3);
      renderer.render(scene, camera);
    })();
  }
  initThree();

  /* ---------- Pixel-block logo: brackets refactor themselves ----------
     Blocks slide between < >  { }  [ ]  ( ) — same reusable markup,
     no fonts, no SVG. The green pixel pulses (CSS).                     */
  function initPcMark() {
    if (reduce || typeof gsap === "undefined") return;
    const marks = document.querySelectorAll("[data-pc-mark]");
    if (!marks.length) return;
    const states = [[2, 0, 2], [1, 0, 1], [0, 0, 0], [2, 1, 2]]; // < { [ (
    marks.forEach((mark) => {
      const u = parseFloat(getComputedStyle(mark).getPropertyValue("--u")) || 5;
      const L = mark.querySelectorAll(".pc-mark__left i");
      const R = mark.querySelectorAll(".pc-mark__right i");
      if (L.length < 3 || R.length < 3) return;
      let i = 0;
      const offset = parseFloat(mark.dataset.delay || 0);
      states[0].forEach((c, k) => { gsap.set(L[k], { x: c * u }); gsap.set(R[k], { x: -c * u }); });
      (function loop(first) {
        gsap.delayedCall(first ? 2.2 + offset : 2.2, () => {
          i = (i + 1) % states.length;
          states[i].forEach((c, k) => {
            gsap.to(L[k], { x: c * u, duration: 0.55, ease: "power3.inOut", delay: k * 0.05 });
            gsap.to(R[k], { x: -c * u, duration: 0.55, ease: "power3.inOut", delay: k * 0.05 });
          });
          loop(false);
        });
      })(true);
    });
  }
  initPcMark();

  /* ---------- Meaningful 3D inside the service cards ---------- */
  function initServiceViz() {
    if (typeof THREE === "undefined") return;
    const ACCENT = 0x00cc99;

    // --- scene builders (each returns a Group with an optional userData.update) ---
    function buildAI() {
      const g = new THREE.Group();
      const layers = [3, 4, 4, 2];
      const xs = [-1.7, -0.57, 0.57, 1.7];
      const nodeGeo = new THREE.SphereGeometry(0.1, 12, 12);
      const cols = [];
      const meshes = [];
      for (let l = 0; l < layers.length; l++) {
        const arr = [];
        for (let i = 0; i < layers[l]; i++) {
          const y = (i - (layers[l] - 1) / 2) * 0.72;
          const m = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: ACCENT }));
          m.position.set(xs[l], y, 0);
          g.add(m); arr.push(m.position); meshes.push(m);
        }
        cols.push(arr);
      }
      const pts = [];
      for (let l = 0; l < cols.length - 1; l++)
        for (const a of cols[l]) for (const b of cols[l + 1]) pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
      const lg = new THREE.BufferGeometry();
      lg.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
      g.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.16 })));
      g.userData.update = (t) => meshes.forEach((m, i) => m.scale.setScalar(1 + Math.sin(t * 2.4 + i * 0.6) * 0.28));
      return g;
    }

    function buildMarket() {
      const g = new THREE.Group();
      const nodeGeo = new THREE.SphereGeometry(0.12, 12, 12);
      const left = [], right = [];
      for (let i = 0; i < 4; i++) {
        const y = (i - 1.5) * 0.66;
        const m = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
        m.position.set(-1.25, y, 0); g.add(m); left.push(m);
      }
      for (let i = 0; i < 4; i++) {
        const y = (i - 1.5) * 0.66;
        const m = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: ACCENT }));
        m.position.set(1.25, y, 0); g.add(m); right.push(m);
      }
      const pairs = [[0, 1], [1, 0], [2, 3], [3, 2], [0, 2]];
      const linkMats = [];
      pairs.forEach(([a, b]) => {
        const p = left[a].position, q = right[b].position;
        const lg = new THREE.BufferGeometry();
        lg.setAttribute("position", new THREE.Float32BufferAttribute([p.x, p.y, p.z, q.x, q.y, q.z], 3));
        const mat = new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.25 });
        g.add(new THREE.LineSegments(lg, mat)); linkMats.push(mat);
      });
      g.userData.update = (t) => linkMats.forEach((m, i) => { m.opacity = 0.12 + 0.35 * (0.5 + 0.5 * Math.sin(t * 2 + i * 1.3)); });
      return g;
    }

    function buildWeb() {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(
        new THREE.SphereGeometry(1.5, 20, 14),
        new THREE.MeshBasicMaterial({ color: ACCENT, wireframe: true, transparent: true, opacity: 0.4 })
      ));
      g.add(new THREE.Mesh(
        new THREE.SphereGeometry(1.46, 20, 14),
        new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.05 })
      ));
      return g;
    }

    function buildMobile() {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(
        new THREE.BoxGeometry(1.05, 1.95, 0.12),
        new THREE.MeshBasicMaterial({ color: ACCENT, wireframe: true, transparent: true, opacity: 0.5 })
      ));
      const apps = new THREE.Group();
      const sq = new THREE.PlaneGeometry(0.18, 0.18);
      for (let r = 0; r < 4; r++)
        for (let c = 0; c < 3; c++) {
          const m = new THREE.Mesh(sq, new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.5, side: THREE.DoubleSide }));
          m.position.set((c - 1) * 0.3, 0.6 - r * 0.4, 0.07);
          apps.add(m);
        }
      g.add(apps);
      g.userData.update = (t) => apps.children.forEach((m, i) => { m.material.opacity = 0.2 + 0.4 * (0.5 + 0.5 * Math.sin(t * 3 + i * 0.5)); });
      return g;
    }

    const builders = { ai: buildAI, market: buildMarket, web: buildWeb, mobile: buildMobile };
    const items = [];

    document.querySelectorAll("[data-viz]").forEach((card) => {
      const canvas = card.querySelector("[data-viz-canvas]");
      const build = builders[card.dataset.shape];
      if (!canvas || !build) return;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.z = 4.6;

      const content = build();
      const spin = new THREE.Group(); spin.add(content);
      const tilt = new THREE.Group(); tilt.add(spin); scene.add(tilt);

      const s = { renderer, scene, camera, spin, tilt, content, canvas, hover: 0, target: 0, tx: 0, ty: 0, mx: 0, my: 0 };
      function size() { const w = Math.max(1, canvas.clientWidth); renderer.setSize(w, w, false); }
      size();
      window.addEventListener("resize", size);
      card.addEventListener("mouseenter", () => { s.target = 1; });
      card.addEventListener("mouseleave", () => { s.target = 0; s.tx = 0; s.ty = 0; });
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        s.tx = (e.clientX - r.left) / r.width - 0.5;
        s.ty = (e.clientY - r.top) / r.height - 0.5;
      });
      items.push(s);
    });

    if (!items.length) return;

    function frame(t) {
      for (let i = 0; i < items.length; i++) {
        const s = items[i];
        s.hover += (s.target - s.hover) * 0.08;
        s.mx += (s.tx - s.mx) * 0.08;
        s.my += (s.ty - s.my) * 0.08;
        const spd = 0.003 + s.hover * 0.016;
        s.spin.rotation.y += spd;
        s.spin.rotation.x += spd * 0.4;
        s.tilt.rotation.y = s.mx * 0.7;
        s.tilt.rotation.x = s.my * 0.7;
        s.tilt.scale.setScalar(1 + s.hover * 0.16);
        if (s.content.userData.update) s.content.userData.update(t);
        s.renderer.render(s.scene, s.camera);
      }
    }

    if (reduce) { frame(0); return; }
    (function loop(now) { requestAnimationFrame(loop); frame(now * 0.001); })(0);
  }
  initServiceViz();

  /* ---------- Lenis smooth scroll ---------- */
  let lenis = null;
  if (!reduce && typeof Lenis !== "undefined") {
    // Elements marked [data-lenis-prevent] (e.g. the chat log) scroll natively —
    // otherwise Lenis hijacks the wheel event and scrolls the page underneath instead.
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, prevent: (node) => node.closest && node.closest("[data-lenis-prevent]") });
    lenis.on("scroll", () => { if (hasGSAP) ScrollTrigger.update(); });
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Anchor links -> smooth scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      if (lenis) lenis.scrollTo(target, { offset: -10, duration: 1.2 });
      else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });
  });

  /* ---------- Custom cursor ---------- */
  const cursor = document.querySelector("[data-cursor]");
  const dot = document.querySelector("[data-cursor-dot]");
  if (cursor && !reduce && window.matchMedia("(hover: hover)").matches) {
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; });
    (function loop() {
      cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll("a, button, [data-magnetic], [data-project]").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-active"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (!reduce && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const strength = 0.35;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = "translate(0,0)"; });
    });
  }

  /* ---------- Nav: scrolled state + burger ---------- */
  const nav = document.querySelector("[data-nav]");
  const burger = document.querySelector("[data-burger]");
  const navLinks = document.querySelector(".nav__links");
  function closeMenu() { nav.classList.remove("is-menu-open"); navLinks.classList.remove("is-open"); }
  burger.addEventListener("click", () => {
    nav.classList.toggle("is-menu-open");
    navLinks.classList.toggle("is-open");
  });
  addEventListener("scroll", () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  });

  /* ---------- Start (no preloader: content is visible on first paint) ---------- */
  function startSite() { document.body.classList.add("is-loaded"); heroIn(); }
  if (reduce || !hasGSAP) {
    revealFallback();
  } else {
    gsap.set(".hero__title .line > span", { yPercent: 110 });
    startSite();
  }

  /* ---------- Hero intro ---------- */
  function heroIn() {
    const lines = document.querySelectorAll(".hero__title .line > span");
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    gsap.set(lines, { yPercent: 110 });
    tl.to(".hero__eyebrow", { opacity: 1, y: 0, duration: 0.5 })
      .to(lines, { yPercent: 0, duration: 0.7, stagger: 0.1 }, "-=0.3")
      .to(".hero__sub", { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
      .to(".hero__builds", { opacity: 1, y: 0, duration: 0.5 }, "-=0.35")
      .to(".hero__actions", { opacity: 1, y: 0, duration: 0.5 }, "-=0.35")
      .to(".hero__trust", { opacity: 1, y: 0, duration: 0.4 }, "-=0.3")
      .from("[data-loop] .loop__page", { opacity: 0, y: 22, duration: 0.6, ease: "power3.out" }, "-=0.9")
      .to(".loop__caption", { opacity: 1, y: 0, duration: 0.4 }, "-=0.3");
  }

  /* ---------- Reveal fallback (no GSAP / reduced) ---------- */
  function revealFallback() {
    document.querySelectorAll(".reveal-up").forEach((el) => { el.style.opacity = 1; el.style.transform = "none"; });
  }

  /* ---------- Chat assistant (client-side, no backend) ---------- */
  function initChat() {
    const root = document.querySelector("[data-chat]");
    if (!root) return;
    const log = root.querySelector("[data-chat-log]");
    const chipsWrap = root.querySelector("[data-chat-chips]");
    const form = root.querySelector("[data-chat-form]");
    const input = root.querySelector("[data-chat-input]");
    const actionsWrap = root.querySelector("[data-chat-actions]");

    // Persistent session id (survives across visits) + transcript (survives reloads this tab)
    let sessionId;
    try {
      sessionId = localStorage.getItem("pc_sid");
      if (!sessionId) { sessionId = "sid_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36); localStorage.setItem("pc_sid", sessionId); }
    } catch (e) { sessionId = "sid_" + Date.now().toString(36); }

    const STORE_KEY = "pc_chat_v1";
    let transcript = [];      // [{who, text}] for re-rendering
    let apiHistory = [];      // [{role, content}] for the agent
    let greeted = false;
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORE_KEY) || "null");
      if (saved && Array.isArray(saved.transcript)) { transcript = saved.transcript; apiHistory = Array.isArray(saved.history) ? saved.history : []; }
    } catch (e) {}
    function saveState() {
      try { sessionStorage.setItem(STORE_KEY, JSON.stringify({ transcript, history: apiHistory })); } catch (e) {}
    }

    const scrollLog = () => { log.scrollTop = log.scrollHeight; };

    // Light, safe markdown for bot replies: escape HTML first, then only ever
    // introduce tags we write ourselves — user/model text can't smuggle markup in.
    function escapeHtml(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
    function renderMarkdown(raw) {
      let s = escapeHtml(raw);
      s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
      s = s.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>");
      s = s.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
      s = s.replace(/(^|[^_\w])_([^_\n]+)_(?!\w)/g, "$1<em>$2</em>");
      s = s.replace(/`([^`\n]+)`/g, "<code>$1</code>");
      if (/\n[-*] /.test("\n" + s)) {
        s = ("\n" + s).replace(/\n[-*] (.+)/g, "\n<li>$1</li>").slice(1);
        s = s.replace(/(<li>.*<\/li>)/s, '<ul class="msg__list">$1</ul>');
      }
      return s;
    }

    function addMsg(text, who, persist) {
      const d = document.createElement("div");
      d.className = "msg msg--" + who;
      if (who === "bot") d.innerHTML = renderMarkdown(text);
      else d.textContent = text;
      log.appendChild(d); scrollLog();
      if (persist !== false) { transcript.push({ who: who, text: text }); saveState(); }
    }
    function renderChips(list) {
      chipsWrap.innerHTML = "";
      (list || []).forEach((label) => {
        const b = document.createElement("button");
        b.type = "button"; b.className = "chat__chip"; b.textContent = label;
        b.addEventListener("click", () => handle(label));
        chipsWrap.appendChild(b);
      });
    }

    const CALENDLY = "https://calendly.com/km-kkishal/30min";

    /* --- notification sound (unlocked on first gesture) --- */
    let audioCtx = null;
    function unlockAudio() { if (!audioCtx) { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } }
    window.addEventListener("pointerdown", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    function playPing() {
      if (!audioCtx || reduce) return;
      try {
        if (audioCtx.state === "suspended") audioCtx.resume();
        const t = audioCtx.currentTime;
        [784, 1046.5].forEach((f, i) => {
          const o = audioCtx.createOscillator(), g = audioCtx.createGain();
          o.type = "sine"; o.frequency.value = f;
          const s = t + i * 0.1;
          g.gain.setValueAtTime(0.0001, s);
          g.gain.exponentialRampToValueAtTime(0.09, s + 0.015);
          g.gain.exponentialRampToValueAtTime(0.0001, s + 0.16);
          o.connect(g); g.connect(audioCtx.destination);
          o.start(s); o.stop(s + 0.18);
        });
      } catch (e) {}
    }

    /* --- ping / unread when collapsed --- */
    const pingEl = root.querySelector("[data-chat-ping]");
    const pingText = root.querySelector("[data-chat-ping-text]");
    function notify(text, sound) {
      if (root.classList.contains("is-open")) return;
      pingText.textContent = text.length > 120 ? text.slice(0, 117) + "…" : text;
      root.classList.add("has-ping", "has-unread");
      if (sound) playPing();
    }
    function clearPing() { root.classList.remove("has-ping", "has-unread"); }

    /* --- rich actions: options, lead form, booking --- */
    function clearActions() { actionsWrap.innerHTML = ""; }
    function renderActions(actions) {
      clearActions();
      if ((actions || []).some((a) => a.type === "meeting")) window.pcTrack("chat_lead");
      (actions || []).forEach((a) => {
        if (a.type === "options") {
          const box = document.createElement("div");
          box.className = "chat__opts";
          (a.options || []).forEach((opt) => {
            const b = document.createElement("button");
            b.type = "button"; b.className = "chat__opt"; b.textContent = opt;
            b.addEventListener("click", () => { clearActions(); handle(opt); });
            box.appendChild(b);
          });
          actionsWrap.appendChild(box);
        } else if (a.type === "meeting") {
          const link = document.createElement("a");
          link.className = "chat__book"; link.href = a.url || CALENDLY;
          link.target = "_blank"; link.rel = "noopener";
          link.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/></svg><span>Book a 30-min call</span>';
          actionsWrap.appendChild(link);
        } else if (a.type === "lead_form") {
          // Just name + email — by the time this shows, the conversation already
          // has the project context, so we don't make the visitor retype it.
          const f = document.createElement("form");
          f.className = "chat__lead";
          f.innerHTML = '<input name="n" placeholder="Your name" autocomplete="name" required>' +
            '<input name="e" type="email" placeholder="Email" autocomplete="email" required>' +
            '<button type="submit">Send details</button>';
          f.addEventListener("submit", (e) => {
            e.preventDefault();
            const n = f.querySelector('[name="n"]').value.trim();
            const em = f.querySelector('[name="e"]').value.trim();
            if (!n || !em) return;
            clearActions();
            // The agent calls save_lead itself with its own project summary —
            // no separate direct email here, or the team gets it twice.
            handle("Here are my details — name: " + n + "; email: " + em);
          });
          actionsWrap.appendChild(f);
        }
      });
      scrollLog();
    }

    function showTyping() {
      const t = document.createElement("div");
      t.className = "chat__typing";
      t.innerHTML = "<i></i><i></i><i></i>";
      log.appendChild(t); scrollLog();
      return t;
    }

    // No local fallback bot: if /api/chat fails or returns nothing usable, the
    // visitor sees an honest error, and the team gets an email with the cause
    // (see sendErrorAlert server-side) — never a faked "someone will follow up".
    async function sendToAgent(typing) {
      let replyText = "";
      let data = null;
      try {
        const res = await fetch("/pixel-and-code/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: apiHistory, sessionId: sessionId }),
        });
        data = await res.json().catch(() => null);
        if (res.ok && data && data.reply) replyText = data.reply;
      } catch (e) {}

      typing.remove();
      if (replyText) {
        apiHistory.push({ role: "assistant", content: replyText }); saveState();
        addMsg(replyText, "bot");
        renderChips([]);
        renderActions(data.actions);
        notify(replyText, true);
      } else {
        const msg = "Something went wrong — please try again later.";
        addMsg(msg, "bot");
        renderChips([]);
        notify(msg, true);
      }
    }
    function handle(text) {
      text = (text || "").trim();
      if (!text) return;
      addMsg(text, "user");
      apiHistory.push({ role: "user", content: text }); saveState();
      renderChips([]); clearActions();
      const typing = showTyping();
      sendToAgent(typing);
    }

    function open() {
      root.classList.add("is-open");
      clearPing();
      if (!greeted) {
        greeted = true;
        setTimeout(() => {
          addMsg("👋 Welcome to Pixel & Code — we design & build AI apps, job boards, and web & mobile products.", "bot");
        }, 250);
        setTimeout(() => {
          addMsg("I can estimate pricing, explain our process, show similar work, or help you start today. What are you after?", "bot");
          renderChips(["Build an MVP", "Redesign my product", "AI automation", "Get a price estimate"]);
        }, 900);
      }
      setTimeout(() => input.focus(), 320);
    }
    function close() { root.classList.remove("is-open"); }

    // Restore a saved conversation (survives reloads within the tab)
    if (transcript.length) {
      greeted = true;
      transcript.forEach((m) => addMsg(m.text, m.who, false));
    }

    root.querySelector("[data-chat-toggle]").addEventListener("click", () => root.classList.contains("is-open") ? close() : open());
    root.querySelector("[data-chat-close]").addEventListener("click", close);
    form.addEventListener("submit", (e) => { e.preventDefault(); const v = input.value; input.value = ""; handle(v); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

    // Ping bubble: click opens chat; the ✕ just dismisses the preview
    pingEl.addEventListener("click", open);
    root.querySelector("[data-chat-ping-dismiss]").addEventListener("click", (e) => { e.stopPropagation(); clearPing(); });

    // Contact section: the AI input bar hands off to this same chat agent
    const contactForm = document.querySelector("[data-contact-ai]");
    if (contactForm) {
      const cInput = contactForm.querySelector("[data-contact-input]");
      const startFromContact = (text) => {
        if (text) greeted = true; // arrived with intent — skip the generic welcome
        open();
        if (text) setTimeout(() => handle(text), 80);
      };
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const v = (cInput.value || "").trim();
        cInput.value = "";
        startFromContact(v);
      });
      document.querySelectorAll("[data-contact-prompts] .contact__prompt").forEach((b) => {
        b.addEventListener("click", () => startFromContact(b.textContent.trim()));
      });
    }
    document.querySelectorAll("[data-open-chat]").forEach((b) => b.addEventListener("click", () => { open(); window.pcTrack("chat_open"); }));
  }

  /* ---------- Lead form -> /api/lead ---------- */
  (function initLeadForm() {
    const form = document.querySelector("[data-lead-form]");
    if (!form) return;
    const note = form.querySelector("[data-lead-note]");
    const btn = form.querySelector("[data-lead-submit]");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      data.page = location.pathname + location.search;
      note.classList.remove("is-error");
      if (!data.name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email || "") || !data.project) {
        note.classList.add("is-error"); note.textContent = "Add your name, a working email and a line about the project."; return;
      }
      btn.disabled = true; note.textContent = "Sending…";
      try {
        const r = await fetch("/pixel-and-code/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
        const j = await r.json().catch(() => ({}));
        if (!r.ok || !j.ok) throw new Error(j.error || "send failed");
        form.reset();
        note.textContent = "Got it. You'll hear from Kishal or Ritwik within one business day.";
        window.pcTrack("lead_submit", { source: "homepage form" });
      } catch (err) {
        note.classList.add("is-error");
        note.textContent = "That didn't send. Email sales@aurevia.io and we'll pick it up.";
      } finally { btn.disabled = false; }
    });
  })();
  initChat();

  if (!hasGSAP) return; // everything below needs GSAP

  /* ---------- Generic reveal-up on scroll (hero is owned by heroIn) ---------- */
  gsap.utils.toArray(".reveal-up").forEach((el) => {
    if (el.closest(".hero")) return;
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  /* ---------- Split-text headings ---------- */
  if (typeof SplitType !== "undefined") {
    gsap.utils.toArray("[data-split]").forEach((el) => {
      const split = new SplitType(el, { types: "words,chars" });
      gsap.from(split.chars, {
        yPercent: 110, opacity: 0, duration: 0.8, ease: "power4.out", stagger: 0.02,
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });
  }

  /* ---------- Pixel wipe on section entry ---------- */
  gsap.utils.toArray("[data-wipe]").forEach((w) => {
    if (reduce) return; // CSS leaves a faint static pixel rule
    gsap.set(w, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
    gsap.timeline({ scrollTrigger: { trigger: w, start: "top 90%" } })
      .to(w, { clipPath: "inset(0 0% 0 0)", duration: 0.6, ease: "steps(14)" })
      .to(w, { opacity: 0.16, duration: 0.5 }, "+=0.15");
  });

  /* ---------- Marquee (scroll-velocity aware) ---------- */
  const track = document.querySelector("[data-marquee]");
  if (track) {
    const half = track.scrollWidth / 2;
    let x = 0, dir = -1, base = 0.6;
    gsap.ticker.add(() => {
      x += dir * base;
      if (x <= -half) x = 0;
      if (x > 0) x = -half;
      track.style.transform = `translateX(${x}px)`;
    });
    ScrollTrigger.create({
      trigger: "body", start: "top top", end: "bottom bottom",
      onUpdate: (self) => { dir = self.direction === 1 ? -1 : 1; base = 0.6 + Math.abs(self.getVelocity()) / 300; },
    });
  }

  /* ---------- Aurevia band: the four-step rail advances on a timer ---------- */
  (function initAurevia() {
    const root = document.querySelector("[data-aur]");
    if (!root || reduce) return;
    const steps = root.querySelectorAll("[data-aur-step]");
    const fill = root.querySelector(".aur__fill");
    if (steps.length < 2) return;
    let k = 2; // matches the server-rendered is-on
    setInterval(() => {
      steps[k].classList.remove("is-on");
      k = (k + 1) % steps.length;
      steps[k].classList.add("is-on");
      if (fill) fill.style.transform = "scaleX(" + (k / (steps.length - 1)) + ")";
    }, 2400);
  })();

  /* ---------- Hero: the highlighted word cycles ---------- */
  (function initSwap() {
    const em = document.querySelector("[data-swap]");
    if (!em || reduce) return;
    const words = (em.dataset.words || "").split("|").map((w) => w.trim()).filter(Boolean);
    if (words.length < 2) return;
    let k = 0;
    setInterval(() => {
      em.classList.add("is-out");
      setTimeout(() => { k = (k + 1) % words.length; em.textContent = words[k]; em.classList.remove("is-out"); }, 300);
    }, 2600);
  })();

  /* ---------- Blank store -> branded store, three specimens on a loop (every instance) ---------- */
  document.querySelectorAll("[data-loop]").forEach((root, idx) => {
    const word = root.querySelector("[data-loop-word]");
    const scope = root.closest("[data-loop-scope]") || root;
    const pins = Array.from(scope.querySelectorAll("[data-pin]"));
    const items = Array.from(scope.querySelectorAll("[data-pin-item]"));
    const brands = [
      { cls: "brand-a", name: "NOON" },
      { cls: "brand-b", name: "HALO" },
      { cls: "brand-c", name: "RIVER" },
    ];
    const phases = ["is-mark", "is-colour", "is-type", "is-products", "is-live"];
    const clear = () => {
      root.classList.remove(...phases, ...brands.map((b) => b.cls));
      pins.forEach((p) => p.classList.remove("is-on"));
      items.forEach((li) => li.classList.remove("is-on"));
    };
    const light = (phase) => {
      root.classList.add(phase);
      pins.filter((p) => p.dataset.phase === phase).forEach((p) => {
        p.classList.add("is-on");
        items.filter((li) => li.dataset.pinItem === p.dataset.pin).forEach((li) => li.classList.add("is-on"));
      });
    };
    if (reduce) { root.classList.add(brands[0].cls); phases.forEach(light); word.textContent = brands[0].name; return; }
    let i = idx % brands.length; // instances start on different specimens
    const run = () => {
      const b = brands[i];
      clear(); root.classList.add("is-blank");
      word.textContent = "\u00a0";
      setTimeout(() => { root.classList.remove("is-blank"); root.classList.add(b.cls); light("is-mark"); }, 700);
      setTimeout(() => light("is-colour"), 1500);
      setTimeout(() => { word.textContent = b.name; light("is-type"); }, 2300);
      setTimeout(() => light("is-products"), 3100);
      setTimeout(() => light("is-live"), 3900);
      setTimeout(() => { i = (i + 1) % brands.length; run(); }, 7400);
    };
    setTimeout(run, 900 + idx * 400);
  });

  /* ---------- Pricing tabs: buttons, not anchors, so nothing scroll-jumps ---------- */
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = Array.from(root.querySelectorAll("[data-tab]"));
    const panels = Array.from(root.querySelectorAll("[data-panel]"));
    const show = (key) => {
      tabs.forEach((t) => { const on = t.dataset.tab === key; t.classList.toggle("is-active", on); t.setAttribute("aria-selected", String(on)); });
      panels.forEach((p) => { const on = p.dataset.panel === key; p.classList.toggle("is-active", on); p.hidden = !on; });
    };
    tabs.forEach((t) => t.addEventListener("click", () => show(t.dataset.tab)));
  });

  /* ---------- Process: the hand-over stack fans out once it scrolls into view ---------- */
  (function initHand() {
    const hand = document.querySelector("[data-hand]");
    if (!hand) return;
    if (reduce || !("IntersectionObserver" in window)) { hand.classList.add("is-on"); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { hand.classList.add("is-on"); io.disconnect(); }
    }, { rootMargin: "0px 0px -20% 0px" });
    io.observe(hand);
  })();

  /* ---------- Process steps: 3x3 pixel block fills in as each step arrives ---------- */
  (function initStepBlocks() {
    const steps = Array.from(document.querySelectorAll("[data-step]"));
    if (!steps.length) return;
    const light = (step) => step.querySelectorAll(".step__blocks i").forEach((b, k) => setTimeout(() => b.classList.add("is-on"), 70 * k));
    if (!("IntersectionObserver" in window)) { steps.forEach(light); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { light(e.target); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -20% 0px" });
    steps.forEach((st) => io.observe(st));
  })();

  /* ---------- Section-label pixel blinks once on entry ---------- */
  (function initLabels() {
    const els = Array.from(document.querySelectorAll(".section__label"));
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -12% 0px" });
    els.forEach((el) => io.observe(el));
  })();

  /* ---------- Stat counters ---------- */
  gsap.utils.toArray("[data-num]").forEach((el) => {
    const end = parseFloat(el.dataset.num);
    const o = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: "top 90%", once: true,
      onEnter: () => gsap.to(o, { v: end, duration: 1.6, ease: "power2.out", onUpdate: () => { el.textContent = Math.round(o.v); } }),
    });
  });

  /* ---------- Roadmap (How we work): line draws in, nodes light up ---------- */
  function initRoadmap() {
    const root = document.querySelector("[data-roadmap]");
    if (!root) return;
    const fill = root.querySelector("[data-roadmap-line]");
    gsap.fromTo(fill, { height: "0%" }, {
      height: "100%", ease: "none",
      scrollTrigger: { trigger: root, start: "top 60%", end: "bottom 70%", scrub: 0.6 },
    });
    gsap.utils.toArray("[data-roadmap-stage]").forEach((stage, i) => {
      const node = stage.querySelector("[data-roadmap-node]");
      gsap.to(stage, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: {
          trigger: stage, start: "top 75%",
          onEnter: () => node.classList.add("is-active"),
          onLeaveBack: () => node.classList.remove("is-active"),
        },
      });
    });
  }
  initRoadmap();

  /* ---------- Testimonials (homepage): single-slide featured carousel --- */
  function initTestimonials() {
    const root = document.querySelector("[data-testimonials]");
    if (!root) return;
    const viewport = root.querySelector("[data-testimonial-viewport]");
    const slides = Array.from(root.querySelectorAll("[data-testimonial]"));
    const dots = Array.from(root.querySelectorAll("[data-testimonial-dot]"));
    const prevBtn = root.querySelector("[data-testimonial-prev]");
    const nextBtn = root.querySelector("[data-testimonial-next]");
    if (!slides.length) return;
    let index = slides.findIndex((s) => s.classList.contains("is-active"));
    if (index < 0) index = 0;
    let timer = null;

    function setHeight() { viewport.style.height = slides[index].offsetHeight + "px"; }

    function show(i) {
      slides[index].classList.remove("is-active");
      dots[index] && dots[index].classList.remove("is-active");
      index = (i + slides.length) % slides.length;
      slides[index].classList.add("is-active");
      dots[index] && dots[index].classList.add("is-active");
      setHeight();
    }

    function restart() {
      clearInterval(timer);
      if (reduce) return;
      timer = setInterval(() => show(index + 1), 6000);
    }

    prevBtn.addEventListener("click", () => { show(index - 1); restart(); });
    nextBtn.addEventListener("click", () => { show(index + 1); restart(); });
    dots.forEach((dot, i) => dot.addEventListener("click", () => { show(i); restart(); }));
    root.addEventListener("mouseenter", () => clearInterval(timer));
    root.addEventListener("mouseleave", restart);

    window.addEventListener("resize", setHeight);
    setHeight();
    restart();
  }
  initTestimonials();

  // Recalculate after fonts/images settle
  if (typeof ScrollTrigger !== "undefined") { if (document.readyState === "complete") ScrollTrigger.refresh(); else window.addEventListener("load", () => ScrollTrigger.refresh()); }
}
