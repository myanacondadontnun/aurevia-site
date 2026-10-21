/**
 * Demo product art as inline SVG data URIs, for categories the site has no product photos for (beauty, fitness).
 * Shared by the widget demo (FeatureDemo), the "What you get" visuals and the industry hero chats. Not real
 * products; plain vector art in the site's palette.
 */

const svg = (raw: string) => `data:image/svg+xml,${encodeURIComponent(raw.replace(/\n\s*/g, ""))}`;

export const DEMO_ART: Record<string, string> = {
  serum: svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280">
  <defs>
    <linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eef1f0"/><stop offset="100%" stop-color="#dde2e0"/></linearGradient>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#d8ede7"/><stop offset="100%" stop-color="#a8d5c8"/></linearGradient>
  </defs>
  <rect width="280" height="280" fill="url(#b)"/>
  <rect x="118" y="52" width="44" height="26" rx="5" fill="#2d3737"/>
  <rect x="126" y="40" width="28" height="16" rx="4" fill="#4a5552"/>
  <rect x="104" y="78" width="72" height="140" rx="14" fill="url(#g)"/>
  <rect x="104" y="78" width="72" height="140" rx="14" fill="none" stroke="#8fbfb2" stroke-width="1.5"/>
  <rect x="116" y="118" width="48" height="52" rx="4" fill="#ffffff" opacity="0.85"/>
  <rect x="122" y="128" width="36" height="5" rx="2.5" fill="#2d3737" opacity="0.7"/>
  <rect x="122" y="140" width="26" height="4" rx="2" fill="#2d3737" opacity="0.4"/>
  <rect x="100" y="222" width="80" height="6" rx="3" fill="rgba(0,0,0,0.07)"/>
</svg>`),
  cream: svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280">
  <defs>
    <linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eef1f0"/><stop offset="100%" stop-color="#dde2e0"/></linearGradient>
    <linearGradient id="j" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fdfdfc"/><stop offset="100%" stop-color="#e4e2da"/></linearGradient>
  </defs>
  <rect width="280" height="280" fill="url(#b)"/>
  <rect x="88" y="108" width="104" height="86" rx="18" fill="url(#j)" stroke="#cfccc2" stroke-width="1.5"/>
  <rect x="82" y="86" width="116" height="30" rx="10" fill="#c9b896"/>
  <rect x="82" y="86" width="116" height="12" rx="6" fill="#d8caac"/>
  <rect x="106" y="138" width="68" height="30" rx="4" fill="#ffffff" opacity="0.9"/>
  <rect x="114" y="147" width="52" height="5" rx="2.5" fill="#2d3737" opacity="0.65"/>
  <rect x="114" y="157" width="34" height="4" rx="2" fill="#2d3737" opacity="0.35"/>
  <rect x="84" y="198" width="112" height="6" rx="3" fill="rgba(0,0,0,0.07)"/>
</svg>`),
  spf: svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280">
  <defs>
    <linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eef1f0"/><stop offset="100%" stop-color="#dde2e0"/></linearGradient>
    <linearGradient id="t" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff4d6"/><stop offset="100%" stop-color="#f5d98b"/></linearGradient>
  </defs>
  <rect width="280" height="280" fill="url(#b)"/>
  <rect x="112" y="60" width="56" height="18" rx="6" fill="#2d3737"/>
  <path d="M108 84 h64 l6 118 a12 12 0 0 1 -12 12 h-52 a12 12 0 0 1 -12 -12 Z" fill="url(#t)" stroke="#e2c46e" stroke-width="1.5"/>
  <rect x="118" y="122" width="44" height="56" rx="5" fill="#ffffff" opacity="0.9"/>
  <rect x="124" y="132" width="32" height="6" rx="3" fill="#2d3737" opacity="0.75"/>
  <rect x="124" y="144" width="22" height="4" rx="2" fill="#2d3737" opacity="0.4"/>
  <circle cx="140" cy="164" r="8" fill="#f0b429" opacity="0.8"/>
  <rect x="104" y="216" width="72" height="6" rx="3" fill="rgba(0,0,0,0.07)"/>
</svg>`),

  roadShoe: svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280">
  <defs><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eef1f0"/><stop offset="100%" stop-color="#dde2e0"/></linearGradient><linearGradient id="u" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e9f4f1"/><stop offset="100%" stop-color="#9fd3c4"/></linearGradient></defs>
  <rect width="280" height="280" fill="url(#b)"/>
  <path d="M52 176 C 60 140, 92 126, 118 120 L 150 104 C 160 100, 170 104, 176 112 L 196 138 C 210 146, 228 150, 236 162 C 240 170, 238 180, 228 182 L 60 184 C 54 184, 50 180, 52 176 Z" fill="url(#u)" stroke="#6fb3a1" stroke-width="2"/>
  <path d="M48 184 L 234 182 C 238 182, 240 186, 238 190 C 236 196, 228 198, 220 198 L 62 198 C 52 198, 46 192, 48 184 Z" fill="#2d3737"/>
  <path d="M132 120 L 168 152 M 120 128 L 156 158 M 144 112 L 178 142" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.9"/>
  <path d="M190 140 C 200 150, 214 156, 226 160" stroke="#00806a" stroke-width="5" stroke-linecap="round" fill="none"/>
  <rect x="54" y="206" width="180" height="6" rx="3" fill="rgba(0,0,0,0.07)"/>
</svg>`),
  trailShoe: svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280">
  <defs><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eef1f0"/><stop offset="100%" stop-color="#dde2e0"/></linearGradient><linearGradient id="u" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f3e7d4"/><stop offset="100%" stop-color="#c9a46c"/></linearGradient></defs>
  <rect width="280" height="280" fill="url(#b)"/>
  <path d="M52 172 C 60 136, 94 122, 120 116 L 152 98 C 162 94, 172 98, 178 106 L 198 132 C 212 140, 230 146, 238 158 C 242 166, 240 176, 230 178 L 60 180 C 54 180, 50 176, 52 172 Z" fill="url(#u)" stroke="#a8844f" stroke-width="2"/>
  <path d="M46 180 L 236 178 C 240 178, 242 182, 240 188 L 236 200 L 54 200 L 46 190 Z" fill="#3b2f25"/>
  <path d="M62 200 l 6 8 l 6 -8 M 96 200 l 6 8 l 6 -8 M 130 200 l 6 8 l 6 -8 M 164 200 l 6 8 l 6 -8 M 198 200 l 6 8 l 6 -8" stroke="#3b2f25" stroke-width="5" fill="none" stroke-linejoin="round"/>
  <path d="M134 116 L 170 148 M 122 124 L 158 154 M 146 108 L 180 138" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.85"/>
  <rect x="54" y="216" width="180" height="6" rx="3" fill="rgba(0,0,0,0.07)"/>
</svg>`),
  socks: svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280">
  <defs><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eef1f0"/><stop offset="100%" stop-color="#dde2e0"/></linearGradient></defs>
  <rect width="280" height="280" fill="url(#b)"/>
  <path d="M96 60 h46 v92 c0 10 4 18 12 24 l 22 16 c 12 9 10 30 -8 32 h-40 c-22 0-34-14-34-34 Z" fill="#ffffff" stroke="#cfd6d3" stroke-width="2"/>
  <rect x="96" y="60" width="46" height="18" fill="#00806a"/>
  <rect x="96" y="84" width="46" height="6" fill="#00806a" opacity="0.5"/>
  <path d="M146 76 h40 v84 c0 9 4 16 10 21 l 18 14 c 10 8 8 26 -7 28 h-34 c-19 0-29-12-29-29 Z" fill="#2d3737" opacity="0.9"/>
  <rect x="146" y="76" width="40" height="14" fill="#00a888"/>
  <rect x="88" y="232" width="128" height="6" rx="3" fill="rgba(0,0,0,0.07)"/>
</svg>`),
  protein: svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280">
  <defs><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eef1f0"/><stop offset="100%" stop-color="#dde2e0"/></linearGradient><linearGradient id="t" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2d3737"/><stop offset="100%" stop-color="#17201e"/></linearGradient></defs>
  <rect width="280" height="280" fill="url(#b)"/>
  <rect x="84" y="70" width="112" height="26" rx="8" fill="#00806a"/>
  <rect x="78" y="94" width="124" height="124" rx="16" fill="url(#t)"/>
  <rect x="96" y="124" width="88" height="56" rx="6" fill="#ffffff" opacity="0.95"/>
  <rect x="106" y="136" width="56" height="8" rx="4" fill="#17201e" opacity="0.8"/>
  <rect x="106" y="150" width="40" height="5" rx="2.5" fill="#17201e" opacity="0.4"/>
  <rect x="106" y="162" width="68" height="6" rx="3" fill="#00a888"/>
  <rect x="78" y="226" width="124" height="6" rx="3" fill="rgba(0,0,0,0.07)"/>
</svg>`),
  shaker: svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280">
  <defs><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eef1f0"/><stop offset="100%" stop-color="#dde2e0"/></linearGradient><linearGradient id="t" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/><stop offset="100%" stop-color="#cde9e1" stop-opacity="0.95"/></linearGradient></defs>
  <rect width="280" height="280" fill="url(#b)"/>
  <rect x="122" y="44" width="36" height="16" rx="5" fill="#2d3737"/>
  <path d="M106 62 h68 l -4 26 h-60 Z" fill="#00806a"/>
  <path d="M110 88 h60 l -8 128 a10 10 0 0 1 -10 9 h-24 a10 10 0 0 1 -10 -9 Z" fill="url(#t)" stroke="#9fcfc2" stroke-width="2"/>
  <path d="M116 150 h48 M117 170 h46 M119 190 h42" stroke="#6fb3a1" stroke-width="2" opacity="0.7"/>
  <rect x="104" y="232" width="72" height="6" rx="3" fill="rgba(0,0,0,0.07)"/>
</svg>`),
  electrolytes: svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280">
  <defs><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eef1f0"/><stop offset="100%" stop-color="#dde2e0"/></linearGradient><linearGradient id="t" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#ffd8a8"/><stop offset="100%" stop-color="#f59f4a"/></linearGradient></defs>
  <rect width="280" height="280" fill="url(#b)"/>
  <rect x="112" y="56" width="56" height="22" rx="6" fill="#2d3737"/>
  <rect x="108" y="76" width="64" height="150" rx="14" fill="url(#t)"/>
  <rect x="118" y="116" width="44" height="64" rx="5" fill="#ffffff" opacity="0.92"/>
  <rect x="124" y="128" width="32" height="6" rx="3" fill="#2d3737" opacity="0.75"/>
  <circle cx="140" cy="158" r="10" fill="#f59f4a"/>
  <rect x="104" y="232" width="72" height="6" rx="3" fill="rgba(0,0,0,0.07)"/>
</svg>`),
};
