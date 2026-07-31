/**
 * Static SVG motifs for all themes (safe, curated markup only).
 */
const icon = (body: string): string =>
  `<svg class="motif-svg" viewBox="0 0 64 64" aria-hidden="true">${body}</svg>`;

export const MOTIF_SVGS: Record<string, string> = {
  // ----- Code -----
  git: icon(`
    <rect width="64" height="64" rx="12" fill="#F05032"/>
    <path fill="#fff" d="M32.8 12.4l18.8 18.8a2.4 2.4 0 010 3.4L32.8 53.4a2.4 2.4 0 01-3.4 0L10.6 34.6a2.4 2.4 0 010-3.4L29.4 12.4a2.4 2.4 0 013.4 0z"/>
    <circle cx="32" cy="22" r="3.2" fill="#F05032"/>
    <circle cx="22" cy="38" r="3.2" fill="#F05032"/>
    <circle cx="40" cy="40" r="3.2" fill="#F05032"/>
    <path stroke="#F05032" stroke-width="3.2" d="M32 25v16M32 38l-7.5-6.5"/>
  `),
  typescript: icon(`
    <rect width="64" height="64" rx="10" fill="#3178C6"/>
    <text x="32" y="42" text-anchor="middle" font-size="26" font-family="Arial Black, Arial, sans-serif" font-weight="800" fill="#fff">TS</text>
  `),
  angular: icon(`
    <path fill="#DD0031" d="M32 8l22 8-3.5 28L32 56 13.5 44 10 16z"/>
    <path fill="#C3002F" d="M32 8v48l18.5-12L54 16z"/>
    <path fill="#fff" d="M32 18.5l-9.5 23h5.2l1.7-4.4h10.2l1.7 4.4H46.5L37 18.5zm0 8.2l3.4 8.6H28.6z"/>
  `),
  html5: icon(`
    <path fill="#E44D26" d="M12 8h40l-3.6 40.5L32 56l-16.4-7.5z"/>
    <path fill="#F16529" d="M32 11.5V52.8l13.2-3.7L48.2 11.5z"/>
    <path fill="#EBEBEB" d="M32 20.5H21.2l.7 7.5H32v-7.5zm0 16.2h-5.3l.4 4.1L32 42.5v-5.8z"/>
    <path fill="#fff" d="M32 20.5h10.8l-.7 7.5H32v-7.5zm0 16.2h5.5l-.4 4.1L32 42.5v-5.8z"/>
  `),
  css3: icon(`
    <path fill="#264DE4" d="M12 8h40l-3.6 40.5L32 56l-16.4-7.5z"/>
    <path fill="#2965F1" d="M32 11.5V52.8l13.2-3.7L48.2 11.5z"/>
    <path fill="#EBEBEB" d="M21.5 21h20.2l-.6 6.4H27.4l.4 4.4h12.8l-1.1 12.2L32 46.5l-7.5-2.1-.5-5.4h5.5l.2 2.4 2.3.6 2.3-.6.3-2.8H24.1z"/>
    <path fill="#fff" d="M32 21h10.1l-.6 6.4H32V21zm0 11.8h5.2l-.4 4.2-.3 2.8L32 41.2v5.3l7.5-2.1 1.1-12.2H32v-5.4z"/>
  `),
  django: icon(`
    <rect width="64" height="64" rx="10" fill="#092E20"/>
    <text x="32" y="42" text-anchor="middle" font-size="28" font-family="Georgia, serif" font-weight="700" fill="#fff">dj</text>
  `),
  javascript: icon(`
    <rect width="64" height="64" rx="10" fill="#F7DF1E"/>
    <text x="38" y="48" text-anchor="middle" font-size="24" font-family="Arial Black, Arial, sans-serif" font-weight="800" fill="#000">JS</text>
  `),
  vscode: icon(`
    <path fill="#007ACC" d="M12 18l16-8 24 10v24L28 54 12 46V18z"/>
    <path fill="#1F9CF0" d="M28 10l24 10v24L28 54V10z"/>
    <path fill="#fff" d="M28 18.5v27l16-6.5V25z"/>
  `),
  react: icon(`
    <rect width="64" height="64" rx="12" fill="#20232A"/>
    <circle cx="32" cy="32" r="4" fill="#61DAFB"/>
    <ellipse cx="32" cy="32" rx="22" ry="8.5" fill="none" stroke="#61DAFB" stroke-width="2.5"/>
    <ellipse cx="32" cy="32" rx="22" ry="8.5" fill="none" stroke="#61DAFB" stroke-width="2.5" transform="rotate(60 32 32)"/>
    <ellipse cx="32" cy="32" rx="22" ry="8.5" fill="none" stroke="#61DAFB" stroke-width="2.5" transform="rotate(120 32 32)"/>
  `),
  node: icon(`
    <path fill="#339933" d="M32 8l20 11.5v25L32 56 12 44.5v-25z"/>
    <path fill="#fff" d="M32 18.5c5.8 0 8.8 2.3 8.8 7.2h-5.2c0-1.9-1-2.7-3.6-2.7-2.4 0-3.5.8-3.5 2.2 0 1.5.8 2.1 4.2 3l.8.2c5.2 1.4 7.4 3.2 7.4 7.4 0 4.8-3.4 7.6-9.2 7.6-6.2 0-9.5-2.8-9.3-8h5.4c0 2.2 1.2 3.3 4 3.3 2.3 0 3.6-.9 3.6-2.4 0-1.5-1-2.3-4.2-3.2l-.8-.2c-4.7-1.3-7.2-3.3-7.2-7.4 0-4.6 3.5-7 9-7z"/>
  `),
  python: icon(`
    <path fill="#3776AB" d="M32 10c-8 0-7.5 3.5-7.5 3.5V20h15v2.5c0 5-4 6.5-7.5 6.5h-8S16 32 16 40.5 23.5 54 32 54s8-3.5 8-3.5V42H25v-2.5c0-5 4-6.5 7.5-6.5h8S49 30 49 21.5 40.5 10 32 10z"/>
    <circle cx="27" cy="17" r="2" fill="#fff"/>
    <circle cx="37" cy="47" r="2" fill="#FFD43B"/>
  `),
  docker: icon(`
    <rect width="64" height="64" rx="12" fill="#2496ED"/>
    <path fill="#fff" d="M10 34h6v6H10zm8 0h6v6h-6zm8 0h6v6h-6zm8 0h6v6h-6zM18 26h6v6h-6zm8 0h6v6h-6zm8 0h6v6h-6zM26 18h6v6h-6zm24 18c2.5-1.8 3.8-4.8 3.2-8.2-2.2.1-4.3 1.4-5.3 3.4-1.2-.8-2.7-1-4.1-.5.2 3.5 2.8 5.5 6.2 5.3z"/>
  `),
  github: icon(`
    <circle cx="32" cy="32" r="26" fill="#181717"/>
    <path fill="#fff" d="M32 18c-7.7 0-14 6.3-14 14 0 6.2 4 11.4 9.6 13.3.7.1 1-.3 1-.7v-2.4c-3.9.9-4.7-1.7-4.7-1.7-.6-1.6-1.5-2-1.5-2-1.3-.9.1-.9.1-.9 1.4.1 2.1 1.4 2.1 1.4 1.2 2.1 3.3 1.5 4.1 1.1.1-.9.5-1.5.9-1.8-3.1-.4-6.4-1.6-6.4-7 0-1.5.6-2.8 1.4-3.8-.1-.4-.6-1.8.1-3.7 0 0 1.2-.4 3.8 1.4a13 13 0 016.9 0c2.6-1.8 3.8-1.4 3.8-1.4.7 1.9.3 3.3.1 3.7.9 1 1.4 2.3 1.4 3.8 0 5.4-3.3 6.6-6.4 7 .5.4 1 1.3 1 2.6v3.8c0 .4.2.8 1 .7C42 43.4 46 38.2 46 32c0-7.7-6.3-14-14-14z"/>
  `),
  npm: icon(`
    <rect width="64" height="64" rx="10" fill="#CB3837"/>
    <path fill="#fff" d="M16 16h32v32H16zm6 6v20h8V28h8v14h8V22z"/>
  `),
  terminal: icon(`
    <rect width="64" height="64" rx="10" fill="#111827"/>
    <rect x="8" y="12" width="48" height="40" rx="4" fill="#1F2937"/>
    <path stroke="#34D399" stroke-width="3" stroke-linecap="round" d="M16 26l8 6-8 6"/>
    <path stroke="#9CA3AF" stroke-width="3" stroke-linecap="round" d="M28 38h16"/>
  `),
  json: icon(`
    <rect width="64" height="64" rx="10" fill="#292929"/>
    <text x="32" y="40" text-anchor="middle" font-size="22" font-family="Consolas, monospace" font-weight="700" fill="#FBBF24">{ }</text>
  `),
  api: icon(`
    <rect width="64" height="64" rx="10" fill="#0EA5E9"/>
    <text x="32" y="40" text-anchor="middle" font-size="18" font-family="Arial Black, Arial, sans-serif" font-weight="800" fill="#fff">API</text>
  `),
  database: icon(`
    <ellipse cx="32" cy="16" rx="18" ry="7" fill="#6366F1"/>
    <path fill="#818CF8" d="M14 16v24c0 3.9 8.1 7 18 7s18-3.1 18-7V16"/>
    <ellipse cx="32" cy="40" rx="18" ry="7" fill="#6366F1"/>
    <ellipse cx="32" cy="28" rx="18" ry="7" fill="#4F46E5"/>
  `),

  // ----- Gaming -----
  squid_circle: icon(`
    <rect x="18" y="14" width="28" height="36" rx="6" fill="#FF4B8B"/>
    <circle cx="32" cy="30" r="7" fill="none" stroke="#1a1a1a" stroke-width="3.5"/>
    <rect x="24" y="50" width="6" height="8" rx="2" fill="#FF4B8B"/>
    <rect x="34" y="50" width="6" height="8" rx="2" fill="#FF4B8B"/>
  `),
  squid_triangle: icon(`
    <rect x="18" y="14" width="28" height="36" rx="6" fill="#FF4B8B"/>
    <path d="M32 22l8 14H24z" fill="none" stroke="#1a1a1a" stroke-width="3.5" stroke-linejoin="round"/>
    <rect x="24" y="50" width="6" height="8" rx="2" fill="#FF4B8B"/>
    <rect x="34" y="50" width="6" height="8" rx="2" fill="#FF4B8B"/>
  `),
  creeper: icon(`
    <rect width="64" height="64" rx="8" fill="#2D5A27"/>
    <rect x="14" y="14" width="12" height="12" fill="#0B1A0A"/>
    <rect x="38" y="14" width="12" height="12" fill="#0B1A0A"/>
    <rect x="26" y="28" width="12" height="10" fill="#0B1A0A"/>
    <rect x="20" y="36" width="8" height="14" fill="#0B1A0A"/>
    <rect x="36" y="36" width="8" height="14" fill="#0B1A0A"/>
    <rect x="28" y="36" width="8" height="8" fill="#0B1A0A"/>
  `),
  dice: icon(`
    <rect x="8" y="22" width="28" height="28" rx="4" fill="#3B82F6" transform="rotate(-12 22 36)"/>
    <circle cx="16" cy="30" r="2.2" fill="#fff"/>
    <circle cx="28" cy="42" r="2.2" fill="#fff"/>
    <rect x="28" y="16" width="28" height="28" rx="4" fill="#F8FAFC" transform="rotate(10 42 30)"/>
    <circle cx="36" cy="24" r="2.2" fill="#111"/>
    <circle cx="48" cy="24" r="2.2" fill="#111"/>
    <circle cx="42" cy="30" r="2.2" fill="#E11D48"/>
    <circle cx="36" cy="36" r="2.2" fill="#111"/>
    <circle cx="48" cy="36" r="2.2" fill="#111"/>
  `),
  mushroom: icon(`
    <ellipse cx="32" cy="28" rx="22" ry="16" fill="#E11D48"/>
    <ellipse cx="22" cy="22" rx="5" ry="4" fill="#fff"/>
    <ellipse cx="40" cy="20" rx="6" ry="4.5" fill="#fff"/>
    <ellipse cx="34" cy="32" rx="4" ry="3" fill="#fff"/>
    <path fill="#FDE68A" d="M18 32c0 10 6 18 14 18s14-8 14-18H18z"/>
    <circle cx="26" cy="40" r="1.6" fill="#92400E"/>
    <circle cx="36" cy="42" r="1.6" fill="#92400E"/>
  `),
  pacman: icon(`
    <circle cx="32" cy="32" r="22" fill="#7C3AED"/>
    <path fill="#FBBF24" d="M32 12a20 20 0 1014.1 5.9L32 32z"/>
    <circle cx="38" cy="24" r="2.4" fill="#111"/>
    <circle cx="18" cy="22" r="5" fill="#F472B6"/>
    <circle cx="16.5" cy="20.5" r="1.2" fill="#111"/>
    <circle cx="19.5" cy="20.5" r="1.2" fill="#111"/>
  `),
  maze: icon(`
    <circle cx="32" cy="32" r="24" fill="#6D28D9"/>
    <circle cx="32" cy="32" r="16" fill="none" stroke="#C4B5FD" stroke-width="4"/>
    <circle cx="32" cy="32" r="7" fill="#C4B5FD"/>
    <path stroke="#C4B5FD" stroke-width="4" d="M32 8v8M32 48v8M8 32h8M48 32h8"/>
  `),
  controller: icon(`
    <path fill="#38BDF8" d="M12 28c0-6 5-10 11-10h18c6 0 11 4 11 10v6c0 8-5 14-12 16l-5 4H29l-5-4c-7-2-12-8-12-16v-6z"/>
    <rect x="18" y="28" width="4" height="12" rx="1" fill="#0F172A"/>
    <rect x="14" y="32" width="12" height="4" rx="1" fill="#0F172A"/>
    <circle cx="40" cy="30" r="3" fill="#FBBF24"/>
    <circle cx="46" cy="36" r="3" fill="#F472B6"/>
  `),
  trophy: icon(`
    <path fill="#F59E0B" d="M20 14h24v8c0 8-6 14-12 14S20 30 20 22V14z"/>
    <path fill="#D97706" d="M16 16h6v6c-4 0-6-3-6-6zm26 0h6c0 3-2 6-6 6V16z"/>
    <rect x="28" y="36" width="8" height="8" fill="#B45309"/>
    <rect x="22" y="44" width="20" height="6" rx="2" fill="#FBBF24"/>
  `),
  coin: icon(`
    <circle cx="32" cy="32" r="22" fill="#F59E0B"/>
    <circle cx="32" cy="32" r="16" fill="#FBBF24"/>
    <text x="32" y="40" text-anchor="middle" font-size="22" font-family="Arial Black, sans-serif" fill="#B45309">$</text>
  `),
  star: icon(`
    <path fill="#FBBF24" d="M32 8l5.5 16.8H56l-14 10.2 5.4 16.8L32 42.2 16.6 51.8l5.4-16.8L8 24.8h18.5z"/>
  `),
  potion: icon(`
    <path fill="#A78BFA" d="M26 12h12v10l10 22a12 12 0 01-11 16H27a12 12 0 01-11-16l10-22V12z"/>
    <rect x="24" y="8" width="16" height="6" rx="2" fill="#6D28D9"/>
    <circle cx="28" cy="40" r="2" fill="#EDE9FE"/>
    <circle cx="36" cy="36" r="1.5" fill="#EDE9FE"/>
  `),
  sword: icon(`
    <path fill="#94A3B8" d="M34 8l6 6-20 28-8 2 2-8z"/>
    <path fill="#F59E0B" d="M18 40l6 6-4 2-4-4z"/>
    <rect x="14" y="44" width="14" height="5" rx="1" fill="#78350F" transform="rotate(45 21 46.5)"/>
  `),
  bomb: icon(`
    <circle cx="32" cy="36" r="18" fill="#1F2937"/>
    <rect x="28" y="14" width="8" height="8" rx="2" fill="#6B7280"/>
    <path stroke="#F97316" stroke-width="3" fill="none" d="M36 14c4-4 8-2 10 2"/>
    <circle cx="46" cy="12" r="3" fill="#FBBF24"/>
  `),
  gem: icon(`
    <path fill="#22D3EE" d="M32 8l16 14-16 34L16 22z"/>
    <path fill="#67E8F9" d="M32 8l16 14H16z"/>
    <path fill="#0891B2" d="M16 22h32L32 56z"/>
  `),
  fireball: icon(`
    <path fill="#F97316" d="M32 8c10 12 16 18 16 28a16 16 0 11-32 0c0-10 6-16 16-28z"/>
    <path fill="#FDE047" d="M32 24c5 6 8 10 8 16a8 8 0 11-16 0c0-6 3-10 8-16z"/>
  `),

  // ----- DA Projects -----
  figma: icon(`
    <rect x="18" y="8" width="14" height="14" rx="7" fill="#F24E1E"/>
    <rect x="32" y="8" width="14" height="14" rx="7" fill="#FF7262"/>
    <rect x="18" y="22" width="14" height="14" rx="7" fill="#A259FF"/>
    <circle cx="39" cy="29" r="7" fill="#1ABCFE"/>
    <rect x="18" y="36" width="14" height="14" rx="7" fill="#0ACF83"/>
  `),
  pen_tool: icon(`
    <path fill="#3B82F6" d="M12 48l8-4 28-28 4 4-28 28z"/>
    <path fill="#1D4ED8" d="M44 12l8 8-4 4-8-8z"/>
    <circle cx="16" cy="48" r="4" fill="#60A5FA"/>
  `),
  layers: icon(`
    <path fill="#60A5FA" d="M32 10l22 12-22 12L10 22z"/>
    <path fill="#3B82F6" d="M32 26l22 12-22 12L10 38z"/>
    <path fill="#1D4ED8" d="M32 34l22 12-22 12L10 46z"/>
  `),
  palette: icon(`
    <circle cx="32" cy="32" r="24" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
    <circle cx="24" cy="24" r="5" fill="#EF4444"/>
    <circle cx="40" cy="22" r="5" fill="#3B82F6"/>
    <circle cx="44" cy="36" r="5" fill="#22C55E"/>
    <circle cx="28" cy="42" r="5" fill="#EAB308"/>
    <circle cx="20" cy="34" r="4" fill="#A855F7"/>
  `),
  typography: icon(`
    <rect width="64" height="64" rx="10" fill="#1E3A8A"/>
    <text x="32" y="44" text-anchor="middle" font-size="34" font-family="Georgia, serif" fill="#fff">Aa</text>
  `),
  wireframe: icon(`
    <rect x="10" y="10" width="44" height="44" rx="4" fill="#EFF6FF" stroke="#3B82F6" stroke-width="2"/>
    <rect x="16" y="16" width="32" height="8" rx="2" fill="#93C5FD"/>
    <rect x="16" y="28" width="14" height="18" rx="2" fill="#BFDBFE"/>
    <rect x="34" y="28" width="14" height="18" rx="2" fill="#BFDBFE"/>
  `),
  camera: icon(`
    <rect x="8" y="20" width="48" height="32" rx="6" fill="#1E293B"/>
    <rect x="22" y="14" width="20" height="8" rx="2" fill="#334155"/>
    <circle cx="32" cy="36" r="10" fill="#38BDF8"/>
    <circle cx="32" cy="36" r="5" fill="#0F172A"/>
  `),
  cursor: icon(`
    <path fill="#111827" d="M16 12l8 36 8-10 12 8z"/>
    <path fill="#fff" stroke="#111" stroke-width="1.5" d="M18 16l5.5 26 5.5-8 9 6z"/>
  `),
  grid: icon(`
    <rect width="64" height="64" rx="8" fill="#DBEAFE"/>
    <path stroke="#3B82F6" stroke-width="2" d="M21 8v48M43 8v48M8 21h48M8 43h48"/>
  `),
  sticky: icon(`
    <path fill="#FDE047" d="M14 10h36v36l-10 10H14z"/>
    <path fill="#FACC15" d="M40 46l10 10V46z"/>
    <path stroke="#CA8A04" stroke-width="2" d="M22 24h20M22 32h16M22 40h12"/>
  `),
  bezier: icon(`
    <path d="M10 48C18 18 46 18 54 48" fill="none" stroke="#2563EB" stroke-width="3"/>
    <circle cx="10" cy="48" r="4" fill="#1D4ED8"/>
    <circle cx="54" cy="48" r="4" fill="#1D4ED8"/>
    <circle cx="24" cy="24" r="3.5" fill="#93C5FD"/>
    <circle cx="40" cy="24" r="3.5" fill="#93C5FD"/>
    <path stroke="#93C5FD" stroke-width="2" d="M10 48l14-24M54 48L40 24"/>
  `),
  prototype: icon(`
    <rect x="8" y="12" width="22" height="40" rx="4" fill="#3B82F6"/>
    <rect x="34" y="12" width="22" height="40" rx="4" fill="#93C5FD"/>
    <path stroke="#1E3A8A" stroke-width="3" stroke-linecap="round" fill="none" d="M26 32h12m0 0l-4-4m4 4l-4 4"/>
  `),
  brand: icon(`
    <circle cx="32" cy="32" r="22" fill="#1D4ED8"/>
    <text x="32" y="40" text-anchor="middle" font-size="20" font-family="Arial Black, sans-serif" fill="#fff">DA</text>
  `),
  layout: icon(`
    <rect x="8" y="10" width="48" height="12" rx="2" fill="#60A5FA"/>
    <rect x="8" y="26" width="18" height="28" rx="2" fill="#93C5FD"/>
    <rect x="30" y="26" width="26" height="12" rx="2" fill="#BFDBFE"/>
    <rect x="30" y="42" width="26" height="12" rx="2" fill="#DBEAFE"/>
  `),
  swatch: icon(`
    <rect x="10" y="14" width="16" height="36" rx="3" fill="#EF4444"/>
    <rect x="24" y="14" width="16" height="36" rx="3" fill="#22C55E"/>
    <rect x="38" y="14" width="16" height="36" rx="3" fill="#3B82F6"/>
  `),
  vector: icon(`
    <path fill="#2563EB" d="M12 48V16l28 16z"/>
    <circle cx="44" cy="20" r="6" fill="#93C5FD"/>
    <circle cx="48" cy="44" r="6" fill="#60A5FA"/>
  `),
  frame: icon(`
    <rect x="12" y="12" width="40" height="40" rx="2" fill="none" stroke="#2563EB" stroke-width="4"/>
    <path stroke="#2563EB" stroke-width="3" d="M22 8v8M42 8v8M22 48v8M42 48v8M8 22h8M8 42h8M48 22h8M48 42h8"/>
  `),

  // ----- Food -----
  icecream: icon(`
    <path fill="#D97706" d="M26 34h12l-2 22h-8z"/>
    <path fill="#7DD3FC" d="M20 20a12 12 0 0124 0v14H20z"/>
    <circle cx="32" cy="14" r="5" fill="#EF4444"/>
    <path fill="#FCA5A5" d="M32 10c2 4 0 8 0 8s-4-2-4-6 2-4 4-2z"/>
  `),
  chocolate: icon(`
    <rect x="12" y="16" width="40" height="32" rx="4" fill="#5C2E0B"/>
    <path stroke="#3E1F08" stroke-width="2" d="M12 32h40M25 16v32M39 16v32"/>
    <rect x="14" y="18" width="10" height="12" rx="1" fill="#7A3F14"/>
  `),
  pizza: icon(`
    <path fill="#F59E0B" d="M32 10l22 40H10z"/>
    <path fill="#EF4444" d="M32 16l16 30H16z"/>
    <circle cx="28" cy="34" r="3" fill="#7F1D1D"/>
    <circle cx="36" cy="30" r="2.5" fill="#166534"/>
    <circle cx="34" cy="40" r="2.8" fill="#7F1D1D"/>
  `),
  wrap: icon(`
    <path fill="#DC2626" d="M18 18h28v36l-6 4H24l-6-4z"/>
    <path fill="#FDE68A" d="M22 14h20l4 28H18z"/>
    <path fill="#16A34A" d="M22 24h20l-2 8H24z"/>
    <path fill="#B91C1C" d="M24 30h16l-1 6H25z"/>
  `),
  pretzel: icon(`
    <path d="M18 36c0-12 8-18 14-18s8 4 8 8-4 6-8 6-10-2-10 4 6 10 14 10 14-8 14-14" fill="none" stroke="#C2410C" stroke-width="7" stroke-linecap="round"/>
    <path d="M18 36c0-12 8-18 14-18s8 4 8 8-4 6-8 6-10-2-10 4 6 10 14 10 14-8 14-14" fill="none" stroke="#3F1A05" stroke-width="7" stroke-linecap="round" stroke-dasharray="0 90 40"/>
  `),
  chicken: icon(`
    <path fill="#DC2626" d="M18 20h28v34H18z"/>
    <path fill="#F8FAFC" d="M24 14h16v10H24z"/>
    <path fill="#F59E0B" d="M22 28h8v14h-8zm12 4h8v12h-8z"/>
    <text x="32" y="50" text-anchor="middle" font-size="8" font-family="Arial" fill="#fff">KFC</text>
  `),
  sushi: icon(`
    <ellipse cx="32" cy="36" rx="22" ry="14" fill="#1F2937"/>
    <ellipse cx="32" cy="34" rx="16" ry="9" fill="#F8FAFC"/>
    <ellipse cx="32" cy="34" rx="8" ry="5" fill="#FCA5A5"/>
    <rect x="28" y="30" width="8" height="8" rx="1" fill="#16A34A"/>
  `),
  fries: icon(`
    <path fill="#DC2626" d="M18 30h28l-4 26H22z"/>
    <path fill="#FBBF24" d="M22 12h4v22h-4zm8-4h4v26h-4zm8 6h4v20h-4zm-20 2h4v18h-4z"/>
    <path fill="#fff" d="M24 36h16v6H24z"/>
  `),
  burger: icon(`
    <path fill="#D97706" d="M14 28c0-10 8-14 18-14s18 4 18 14H14z"/>
    <rect x="14" y="30" width="36" height="5" rx="2" fill="#16A34A"/>
    <rect x="14" y="36" width="36" height="7" rx="2" fill="#7C2D12"/>
    <path fill="#F59E0B" d="M14 44h36c0 8-8 12-18 12s-18-4-18-12z"/>
  `),
  donut: icon(`
    <circle cx="32" cy="32" r="22" fill="#F472B6"/>
    <circle cx="32" cy="32" r="8" fill="#FEF3C7"/>
    <circle cx="22" cy="22" r="2" fill="#fff"/>
    <circle cx="40" cy="20" r="2" fill="#FDE047"/>
    <circle cx="44" cy="34" r="2" fill="#22D3EE"/>
  `),
  taco: icon(`
    <path fill="#F59E0B" d="M10 40c0-16 10-26 22-26s22 10 22 26H10z"/>
    <path fill="#16A34A" d="M16 36c4-8 10-12 16-12s12 4 16 12H16z"/>
    <path fill="#B91C1C" d="M20 38c3-5 7-8 12-8s9 3 12 8H20z"/>
  `),
  avocado: icon(`
    <path fill="#65A30D" d="M32 8c12 0 20 12 20 26S42 58 32 58 12 48 12 34 20 8 32 8z"/>
    <path fill="#A3E635" d="M32 14c8 0 14 9 14 20s-6 18-14 18-14-7-14-18 6-20 14-20z"/>
    <circle cx="32" cy="34" r="7" fill="#78350F"/>
  `),
  cupcake: icon(`
    <path fill="#F472B6" d="M18 28c0-10 6-16 14-16s14 6 14 16H18z"/>
    <circle cx="32" cy="14" r="4" fill="#EF4444"/>
    <path fill="#FDE68A" d="M16 30h32l-4 22H20z"/>
    <path stroke="#D97706" stroke-width="2" d="M20 38h24M22 46h20"/>
  `),
  popcorn: icon(`
    <path fill="#DC2626" d="M20 28h24l-3 28H23z"/>
    <path fill="#fff" d="M22 34h20v6H22z"/>
    <circle cx="24" cy="22" r="6" fill="#FEF3C7"/>
    <circle cx="34" cy="18" r="7" fill="#FEF9C3"/>
    <circle cx="42" cy="24" r="6" fill="#FEF3C7"/>
  `),
  strawberry: icon(`
    <path fill="#EF4444" d="M32 14c14 4 18 18 14 30-4 8-10 12-14 12s-10-4-14-12c-4-12 0-26 14-30z"/>
    <path fill="#16A34A" d="M24 14c4-6 8-8 8-8s4 2 8 8c-5-2-11-2-16 0z"/>
    <circle cx="26" cy="28" r="1.5" fill="#FEF2F2"/>
    <circle cx="36" cy="34" r="1.5" fill="#FEF2F2"/>
    <circle cx="30" cy="40" r="1.5" fill="#FEF2F2"/>
  `),
  watermelon: icon(`
    <path fill="#F87171" d="M10 40a22 22 0 0144 0H10z"/>
    <path fill="#4ADE80" d="M12 40a20 20 0 0040 0H12z"/>
    <path fill="#F8FAFC" d="M16 40a16 16 0 0032 0H16z"/>
    <circle cx="26" cy="36" r="1.5" fill="#111"/>
    <circle cx="34" cy="34" r="1.5" fill="#111"/>
    <circle cx="38" cy="38" r="1.5" fill="#111"/>
  `),
  cheese: icon(`
    <path fill="#FBBF24" d="M8 40L32 12l24 28H8z"/>
    <path fill="#F59E0B" d="M8 40h48v10H8z"/>
    <circle cx="28" cy="30" r="3" fill="#D97706"/>
    <circle cx="40" cy="34" r="2.5" fill="#D97706"/>
  `),
  cookie: icon(`
    <circle cx="32" cy="32" r="22" fill="#D97706"/>
    <circle cx="24" cy="24" r="3" fill="#78350F"/>
    <circle cx="38" cy="22" r="2.5" fill="#78350F"/>
    <circle cx="30" cy="34" r="3" fill="#78350F"/>
    <circle cx="42" cy="36" r="2.5" fill="#78350F"/>
    <circle cx="24" cy="40" r="2" fill="#78350F"/>
  `),
  heart: icon(`
    <path fill="#EF4444" d="M32 52S10 38 10 24a10 10 0 0118-6 10 10 0 0118 6c0 14-22 28-22 28z"/>
  `),
  kart: icon(`
    <rect x="12" y="28" width="40" height="14" rx="4" fill="#3B82F6"/>
    <path fill="#EF4444" d="M20 20h18l8 8H28z"/>
    <circle cx="20" cy="44" r="6" fill="#111"/>
    <circle cx="44" cy="44" r="6" fill="#111"/>
    <circle cx="20" cy="44" r="2.5" fill="#94A3B8"/>
    <circle cx="44" cy="44" r="2.5" fill="#94A3B8"/>
  `),
};

/**
 * Renders a motif value: SVG logo key or plain emoji/text.
 */
export function renderMotif(motif: string): string {
  const svg = MOTIF_SVGS[motif];
  if (svg) {
    return svg;
  }

  return motif
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
