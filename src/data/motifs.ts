/**
 * Static SVG motifs for all themes (safe, curated markup only).
 */
const icon = (body: string): string =>
  `<svg class="motif-svg" viewBox="0 0 64 64" aria-hidden="true">${body}</svg>`;

export const MOTIF_SVGS: Record<string, string> = {
  // ----- Code (design sheet order) -----
  git: icon(`
    <path fill="#F05032" d="M32.9 8.6l22.5 22.5a2.8 2.8 0 010 4L32.9 57.6a2.8 2.8 0 01-4 0L6.4 35.1a2.8 2.8 0 010-4L28.9 8.6a2.8 2.8 0 014 0z"/>
    <path fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" d="M32 18v20M32 38l-9-8"/>
    <circle cx="32" cy="18" r="3.4" fill="#fff"/>
    <circle cx="23" cy="30" r="3.4" fill="#fff"/>
    <circle cx="41" cy="42" r="3.4" fill="#fff"/>
  `),
  typescript: icon(`
    <rect width="64" height="64" rx="8" fill="#3178C6"/>
    <text x="32" y="42" text-anchor="middle" font-size="26" font-family="Arial Black, Arial, sans-serif" font-weight="800" fill="#fff">TS</text>
  `),
  javascript: icon(`
    <rect width="64" height="64" rx="8" fill="#F7DF1E"/>
    <text x="40" y="48" text-anchor="middle" font-size="24" font-family="Arial Black, Arial, sans-serif" font-weight="800" fill="#323330">JS</text>
  `),
  html5: icon(`
    <path fill="#E34F26" d="M10 6h44l-4 45.2L32 58 14 51.2z"/>
    <path fill="#EF652A" d="M32 9.2V54.6l14.6-4.05L50.2 9.2z"/>
    <path fill="#EBEBEB" d="M32 22H20.8l.75 8.4H32zm0 18.4h-5.7l.4 4.5L32 46.5z"/>
    <path fill="#fff" d="M32 22h11.2l-.75 8.4H32zm0 18.4h5.9l-.35 3.9L32 46.5z"/>
  `),
  vscode: icon(`
    <path fill="#0065A9" d="M42.2 8.4l13.2 8.4v30.4L42.2 55.6 14.8 40.4 8.6 45.2V18.8l6.2 4.8z"/>
    <path fill="#007ACC" d="M42.2 8.4L14.8 23.6v16.8l27.4 15.2V8.4z"/>
    <path fill="#1F9CF0" d="M55.4 16.8L42.2 24.4v15.2l13.2 7.6V16.8z"/>
    <path fill="#fff" fill-opacity=".92" d="M42.2 24.4L22 32l20.2 7.6V24.4z"/>
  `),
  css3: icon(`
    <path fill="#264DE4" d="M10 6h44l-4 45.2L32 58 14 51.2z"/>
    <path fill="#2965F1" d="M32 9.2V54.6l14.6-4.05L50.2 9.2z"/>
    <path fill="#EBEBEB" d="M21.2 22h21.4l-.7 7.5H27.8l.45 5h12.9l-1.2 13.4L32 50.4l-7.9-2.2-.55-6.1h6l.25 2.7 2.2.65 2.2-.65.25-3.1H23.5z"/>
    <path fill="#fff" d="M32 22h10.7l-.7 7.5H32zm0 13.5h5.6l-.4 4.5-.25 3.1L32 44.7v5.7l7.9-2.2 1.2-13.4H32z"/>
  `),
  django: icon(`
    <rect width="64" height="64" rx="8" fill="#092E20"/>
    <text x="32" y="42" text-anchor="middle" font-size="28" font-family="Georgia, 'Times New Roman', serif" font-weight="700" fill="#fff">dj</text>
  `),
  angular: icon(`
    <path fill="#DD0031" d="M32 6l24 8.4-3.8 30.6L32 58 11.8 45 8 14.4z"/>
    <path fill="#C3002F" d="M32 6v52l20.2-13L56 14.4z"/>
    <path fill="#fff" d="M32 18.5l-10.2 24.8h5.5l1.85-4.7h11.7l1.85 4.7h5.5L37 18.5zm0 8.6l3.7 9.4H28.3z"/>
  `),
  terminal: icon(`
    <rect width="64" height="64" rx="8" fill="#1F2937"/>
    <path fill="#F9FAFB" d="M16 22l10 10-10 10 4.2 4.2L34.4 32 20.2 17.8z"/>
    <rect x="30" y="40" width="20" height="5" rx="1.5" fill="#F9FAFB"/>
  `),
  python: icon(`
    <path fill="#3776AB" d="M32 9c-8.5 0-8 4-8 4v7.5h16V23c0 5-4 7-8 7h-8.5S15 32.5 15 42s8 13 17 13V45H25v-3c0-5 4-7 8-7h8.5S50 32.5 50 23 42 9 32 9z"/>
    <path fill="#FFD43B" d="M32 55c8.5 0 8-4 8-4v-7.5H24V41c0-5 4-7 8-7h8.5S49 31.5 49 22 41 9 32 9v10H39v3c0 5-4 7-8 7H22.5S14 31.5 14 41s8 14 18 14z"/>
    <circle cx="26.5" cy="16.5" r="2.2" fill="#fff"/>
    <circle cx="37.5" cy="47.5" r="2.2" fill="#3776AB"/>
  `),
  github: icon(`
    <circle cx="32" cy="32" r="26" fill="#181717"/>
    <path fill="#fff" d="M32 16c-8.8 0-16 7.2-16 16 0 7.1 4.6 13.1 11 15.2.8.1 1.1-.3 1.1-.8v-2.8c-4.5 1-5.4-1.9-5.4-1.9-.7-1.8-1.7-2.3-1.7-2.3-1.4-1 .1-1 .1-1 1.6.1 2.4 1.6 2.4 1.6 1.4 2.4 3.7 1.7 4.6 1.3.1-1 .5-1.7 1-2.1-3.5-.4-7.2-1.8-7.2-8 0-1.8.6-3.2 1.6-4.3-.2-.4-.7-2.1.1-4.3 0 0 1.3-.4 4.3 1.6a15 15 0 017.8 0c3-2 4.3-1.6 4.3-1.6.8 2.2.3 3.9.2 4.3 1 .1 1.6 2.5 1.6 4.3 0 6.2-3.7 7.6-7.3 8 .5.5 1.1 1.4 1.1 2.9v4.3c0 .5.3.9 1.1.8C43.4 45.1 48 39.1 48 32c0-8.8-7.2-16-16-16z"/>
  `),
  node: icon(`
    <path fill="#339933" d="M32 6l22 12.7v26.6L32 58 10 45.3V18.7z"/>
    <path fill="#fff" d="M32 17c6.4 0 9.7 2.5 9.7 7.9h-5.7c0-2.1-1.1-3-4-3-2.6 0-3.9.9-3.9 2.4 0 1.7.9 2.3 4.6 3.3l.9.3c5.7 1.5 8.1 3.5 8.1 8.1 0 5.3-3.7 8.4-10.1 8.4-6.8 0-10.5-3.1-10.2-8.8h5.9c0 2.4 1.3 3.6 4.4 3.6 2.5 0 4-1 4-2.6 0-1.7-1.1-2.5-4.6-3.5l-.9-.3c-5.2-1.4-7.9-3.6-7.9-8.1C22.3 19.6 26.2 17 32 17z"/>
  `),
  bootstrap: icon(`
    <rect width="64" height="64" rx="12" fill="#7952B3"/>
    <path fill="#fff" d="M24 16h12.2c6.4 0 10.4 3.2 10.4 8.4 0 3.6-2.1 6.3-5.5 7.3 4.2 1.1 6.7 4.2 6.7 8.6 0 5.8-4.4 9.7-11.5 9.7H24zm6.2 6.4v7.2h5.2c2.8 0 4.4-1.3 4.4-3.6 0-2.2-1.6-3.6-4.3-3.6zm0 13.2v8h6.2c3.1 0 4.9-1.5 4.9-4 0-2.5-1.8-4-5-4z"/>
  `),
  vue: icon(`
    <path fill="#41B883" d="M32 52L8 12h11.5L32 33.5 44.5 12H56z"/>
    <path fill="#34495E" d="M32 52L19.5 30.5 25.8 20 32 30.8 38.2 20l6.3 10.5z"/>
  `),
  react: icon(`
    <circle cx="32" cy="32" r="5" fill="#61DAFB"/>
    <ellipse cx="32" cy="32" rx="24" ry="9" fill="none" stroke="#61DAFB" stroke-width="3"/>
    <ellipse cx="32" cy="32" rx="24" ry="9" fill="none" stroke="#61DAFB" stroke-width="3" transform="rotate(60 32 32)"/>
    <ellipse cx="32" cy="32" rx="24" ry="9" fill="none" stroke="#61DAFB" stroke-width="3" transform="rotate(120 32 32)"/>
  `),
  sass: icon(`
    <text x="32" y="41" text-anchor="middle" font-size="24" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-weight="700" fill="#CF649A">Sass</text>
  `),
  database: icon(`
    <ellipse cx="32" cy="16" rx="18" ry="7" fill="#F59E0B"/>
    <path fill="#FBBF24" d="M14 16v10c0 3.9 8.1 7 18 7s18-3.1 18-7V16"/>
    <ellipse cx="32" cy="26" rx="18" ry="7" fill="#F59E0B"/>
    <path fill="#FBBF24" d="M14 26v10c0 3.9 8.1 7 18 7s18-3.1 18-7V26"/>
    <ellipse cx="32" cy="36" rx="18" ry="7" fill="#F59E0B"/>
    <path fill="#D97706" d="M14 36v10c0 3.9 8.1 7 18 7s18-3.1 18-7V36"/>
    <ellipse cx="32" cy="46" rx="18" ry="7" fill="#B45309"/>
  `),
  firebase: icon(`
    <path fill="#FFA000" d="M14.5 48.5L24 10.5l8.2 15.8z"/>
    <path fill="#F57C00" d="M14.5 48.5l17.7-22.2L40.8 38z"/>
    <path fill="#FFCA28" d="M14.5 48.5L32.2 14l17.3 34.5c1.1 2.1-.3 4.5-2.7 4.5H17.2c-2.4 0-3.8-2.4-2.7-4.5z"/>
    <path fill="#FFA000" d="M32.2 14l8.6 24-4.2-12.8z"/>
  `),
  code_back: icon(`
    <rect x="16" y="18" width="32" height="28" rx="4" fill="none" stroke="#CCFBF1" stroke-width="2.4" opacity="0.55"/>
    <path fill="none" stroke="#CCFBF1" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.7" d="M26 28l-6 6 6 6M38 28l6 6-6 6"/>
  `),

  // ----- Gaming (design sheet) -----
  squid_square: icon(`
    <path fill="#FF4B8B" d="M22 12h20a4 4 0 014 4v28a4 4 0 01-4 4H22a4 4 0 01-4-4V16a4 4 0 014-4z"/>
    <rect x="24" y="50" width="6" height="8" rx="2" fill="#FF4B8B"/>
    <rect x="34" y="50" width="6" height="8" rx="2" fill="#FF4B8B"/>
    <rect x="25" y="24" width="14" height="14" rx="1.5" fill="none" stroke="#1a1a1a" stroke-width="3.2"/>
  `),
  squid_circle: icon(`
    <path fill="#FF4B8B" d="M22 12h20a4 4 0 014 4v28a4 4 0 01-4 4H22a4 4 0 01-4-4V16a4 4 0 014-4z"/>
    <rect x="24" y="50" width="6" height="8" rx="2" fill="#FF4B8B"/>
    <rect x="34" y="50" width="6" height="8" rx="2" fill="#FF4B8B"/>
    <circle cx="32" cy="31" r="7.5" fill="none" stroke="#1a1a1a" stroke-width="3.2"/>
  `),
  squid_triangle: icon(`
    <path fill="#FF4B8B" d="M22 12h20a4 4 0 014 4v28a4 4 0 01-4 4H22a4 4 0 01-4-4V16a4 4 0 014-4z"/>
    <rect x="24" y="50" width="6" height="8" rx="2" fill="#FF4B8B"/>
    <rect x="34" y="50" width="6" height="8" rx="2" fill="#FF4B8B"/>
    <path d="M32 22.5l8.5 15H23.5z" fill="none" stroke="#1a1a1a" stroke-width="3.2" stroke-linejoin="round"/>
  `),
  geo_pattern: icon(`
    <circle cx="32" cy="32" r="22" fill="#7C3AED"/>
    <circle cx="32" cy="32" r="15" fill="none" stroke="#E9D5FF" stroke-width="3.5"/>
    <circle cx="32" cy="32" r="7.5" fill="#E9D5FF"/>
    <path stroke="#C4B5FD" stroke-width="3.5" stroke-linecap="round" d="M32 8v7M32 49v7M8 32h7M49 32h7"/>
    <path stroke="#C4B5FD" stroke-width="2.5" stroke-linecap="round" d="M15 15l5 5M44 15l-5 5M15 49l5-5M44 49l-5-5"/>
  `),
  creeper: icon(`
    <rect width="64" height="64" rx="6" fill="#3B6D2A"/>
    <rect x="12" y="12" width="14" height="14" fill="#0B1A0A"/>
    <rect x="38" y="12" width="14" height="14" fill="#0B1A0A"/>
    <rect x="26" y="28" width="12" height="10" fill="#0B1A0A"/>
    <rect x="18" y="36" width="10" height="16" fill="#0B1A0A"/>
    <rect x="36" y="36" width="10" height="16" fill="#0B1A0A"/>
    <rect x="28" y="36" width="8" height="8" fill="#0B1A0A"/>
  `),
  mushroom: icon(`
    <ellipse cx="32" cy="26" rx="22" ry="16" fill="#E11D48"/>
    <ellipse cx="22" cy="20" rx="6" ry="5" fill="#fff"/>
    <ellipse cx="42" cy="18" rx="7" ry="5.5" fill="#fff"/>
    <ellipse cx="34" cy="30" rx="4.5" ry="3.5" fill="#fff"/>
    <path fill="#F8E7B0" d="M18 30c0 12 6.5 22 14 22s14-10 14-22H18z"/>
    <ellipse cx="26" cy="40" rx="2.2" ry="3" fill="#1a1a1a"/>
    <ellipse cx="38" cy="40" rx="2.2" ry="3" fill="#1a1a1a"/>
  `),
  rubiks: icon(`
    <path fill="#EF4444" d="M32 12l16 9v3L32 15z"/>
    <path fill="#22C55E" d="M32 12L16 21v3l16-9z"/>
    <path fill="#3B82F6" d="M16 24l16 9 16-9-16-9z"/>
    <path fill="#F59E0B" d="M16 24v18l16 9V33z"/>
    <path fill="#F8FAFC" d="M48 24v18L32 51V33z"/>
    <path stroke="#111" stroke-width="1.3" fill="none" d="M32 15l16 9v18L32 51 16 42V24zM16 24l16 9 16-9M32 33v18"/>
    <path fill="#A855F7" d="M38 18l8 4.5v3L38 21z"/>
    <path fill="#06B6D4" d="M20 38l8 4.5V48l-8-4.5z"/>
  `),
  cool_banana: icon(`
    <path fill="#FACC15" d="M18 16c2-6 10-8 16-4 10 6 16 20 14 32-1 6-6 10-12 10-4 0-7-2-8-5-4-10-6-22-10-33z"/>
    <path fill="#EAB308" d="M22 20c8 10 12 22 13 32 3 1 7 0 9-3-1-11-7-24-14-32-3-2-6 0-8 3z"/>
    <rect x="26" y="26" width="15" height="6.5" rx="3.2" fill="#111"/>
    <circle cx="30.5" cy="29.2" r="1.5" fill="#fff"/>
    <circle cx="36.5" cy="29.2" r="1.5" fill="#fff"/>
  `),
  controller: icon(`
    <path fill="#22D3EE" d="M14 26c0-6 5-11 12-11h12c7 0 12 5 12 11v5c0 8-5 14-12 16l-4 3h-4l-4-3c-7-2-12-8-12-16v-5z"/>
    <rect x="20" y="28" width="4" height="11" rx="1.2" fill="#0F172A"/>
    <rect x="16.5" y="31.5" width="11" height="4" rx="1.2" fill="#0F172A"/>
    <circle cx="40" cy="30" r="3" fill="#0F172A"/>
    <circle cx="45.5" cy="35.5" r="3" fill="#0F172A"/>
  `),
  pacman_ghost: icon(`
    <path fill="#7C3AED" d="M16 34c0-9 7-16 16-16s16 7 16 16v12l-5.5-4.5-5.5 4.5-5.5-4.5-5.5 4.5-5.5-4.5L16 46V34z"/>
    <circle cx="26" cy="32" r="3.2" fill="#fff"/>
    <circle cx="38" cy="32" r="3.2" fill="#fff"/>
    <circle cx="27" cy="33" r="1.4" fill="#111"/>
    <circle cx="39" cy="33" r="1.4" fill="#111"/>
    <path fill="#FACC15" d="M8 22a9 9 0 0015.5 6L16 28z"/>
  `),
  coin: icon(`
    <circle cx="32" cy="32" r="22" fill="#F59E0B"/>
    <circle cx="32" cy="32" r="17" fill="#FBBF24"/>
    <circle cx="32" cy="32" r="12" fill="none" stroke="#B45309" stroke-width="2.4"/>
    <path fill="#B45309" d="M32 20l2.8 7.2H42l-6 4.6 2.2 7.4L32 34.8l-6.2 4.4 2.2-7.4-6-4.6h7.2z"/>
  `),
  dungeon_map: icon(`
    <rect x="10" y="10" width="44" height="44" rx="4" fill="#E5E7EB"/>
    <path fill="none" stroke="#374151" stroke-width="3.2" stroke-linecap="square" d="M18 18h12v10H18zm16 0h12v6H34zm0 12h8v16h-8zm-16 6h12v10H18z"/>
    <rect x="22" y="22" width="4" height="4" fill="#EF4444"/>
    <rect x="40" y="40" width="4" height="4" fill="#22C55E"/>
  `),
  medal: icon(`
    <path fill="#22C55E" d="M20 8l12 16 12-16h-7l-5 7-5-7z"/>
    <path fill="#4ADE80" d="M24 8l8 16 8-16h-5l-3 5-3-5z"/>
    <circle cx="32" cy="38" r="16" fill="#F59E0B"/>
    <circle cx="32" cy="38" r="12" fill="#FBBF24"/>
    <text x="32" y="44" text-anchor="middle" font-size="16" font-family="Arial Black, Arial, sans-serif" font-weight="800" fill="#B45309">1</text>
  `),
  pacman: icon(`
    <path fill="#FACC15" d="M32 10a22 22 0 1015.5 6.5L32 32z"/>
    <circle cx="38" cy="22" r="2.8" fill="#111"/>
  `),
  gameboy: icon(`
    <rect x="14" y="6" width="36" height="52" rx="6" fill="#FACC15"/>
    <rect x="20" y="12" width="24" height="20" rx="2" fill="#4ADE80"/>
    <rect x="22" y="14" width="20" height="16" rx="1" fill="#166534"/>
    <circle cx="26" cy="42" r="4.5" fill="#EF4444"/>
    <circle cx="38" cy="40" r="3.2" fill="#3B82F6"/>
    <circle cx="42" cy="46" r="3.2" fill="#A855F7"/>
    <rect x="22" y="50" width="10" height="3" rx="1.5" fill="#78716C"/>
  `),
  puzzle: icon(`
    <path fill="#EC4899" d="M12 18h14v6a5 5 0 110 10v6H12V18z"/>
    <path fill="#EC4899" d="M26 18h6a5 5 0 110-10v10z"/>
    <path fill="#3B82F6" d="M30 34h22v18H36v-5a5 5 0 110-10v-3H30z"/>
    <path fill="#3B82F6" d="M30 34v-6a5 5 0 01-10 0v6h10z"/>
  `),
  ace_diamonds: icon(`
    <rect x="14" y="8" width="36" height="48" rx="4" fill="#fff" stroke="#D1D5DB" stroke-width="2"/>
    <path fill="#EF4444" d="M32 20l10 14-10 14L22 34z"/>
    <text x="19" y="20" font-size="11" font-family="Georgia, serif" font-weight="700" fill="#EF4444">A</text>
    <text x="39" y="52" font-size="11" font-family="Georgia, serif" font-weight="700" fill="#EF4444">A</text>
  `),
  play_button: icon(`
    <rect x="6" y="20" width="52" height="24" rx="12" fill="#22C55E"/>
    <text x="32" y="37" text-anchor="middle" font-size="14" font-family="Arial Black, Arial, sans-serif" font-weight="800" fill="#fff">PLAY</text>
  `),
  gaming_back: icon(`
    <circle cx="32" cy="32" r="10" fill="none" stroke="#FCE7F3" stroke-width="2.4" opacity="0.5"/>
    <circle cx="32" cy="32" r="3.2" fill="#FCE7F3" opacity="0.55"/>
  `),

  // ----- DA Projects (design sheet) -----
  da_ramen: icon(`
    <ellipse cx="32" cy="44" rx="22" ry="8" fill="#B91C1C"/>
    <path fill="#DC2626" d="M12 36c2 8 10 14 20 14s18-6 20-14c-4 3-12 5-20 5s-16-2-20-5z"/>
    <path fill="#92400E" d="M16 34c4-2 10-3 16-3s12 1 16 3l-2 4c-4-2-9-3-14-3s-10 1-14 3z"/>
    <path stroke="#1F2937" stroke-width="2.4" stroke-linecap="round" d="M40 14l6 22M46 12l2 24"/>
    <path fill="#F8FAFC" d="M18 32c3-1 8-2 14-2 2 0 5 .3 7 .7l-1.5 3.5c-2-.4-4-.6-5.5-.6-5 0-9 .8-12 1.8z"/>
  `),
  da_soup: icon(`
    <ellipse cx="32" cy="46" rx="22" ry="7" fill="#991B1B"/>
    <path fill="#DC2626" d="M12 34c3 10 10 16 20 16s17-6 20-16c-5 4-12 6-20 6s-15-2-20-6z"/>
    <path fill="#F87171" d="M14 34c4 2 11 4 18 4s14-2 18-4c-3 6-9 10-18 10s-15-4-18-10z"/>
    <path fill="none" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round" d="M22 18c0 4 2 6 2 10M32 14c0 5 2 8 2 12M42 18c0 4-1 7-1 10"/>
  `),
  da_egg: icon(`
    <ellipse cx="32" cy="34" rx="20" ry="22" fill="#F8FAFC" stroke="#E5E7EB" stroke-width="2"/>
    <ellipse cx="32" cy="36" rx="11" ry="12" fill="#FBBF24"/>
    <ellipse cx="28" cy="32" rx="3" ry="4" fill="#FDE68A" opacity=".7"/>
  `),
  da_sakura: icon(`
    <circle cx="32" cy="32" r="5" fill="#F9A8D4"/>
    <ellipse cx="32" cy="18" rx="7" ry="10" fill="#F472B6" transform="rotate(0 32 32)"/>
    <ellipse cx="32" cy="18" rx="7" ry="10" fill="#FB7185" transform="rotate(72 32 32)"/>
    <ellipse cx="32" cy="18" rx="7" ry="10" fill="#F472B6" transform="rotate(144 32 32)"/>
    <ellipse cx="32" cy="18" rx="7" ry="10" fill="#FB7185" transform="rotate(216 32 32)"/>
    <ellipse cx="32" cy="18" rx="7" ry="10" fill="#F472B6" transform="rotate(288 32 32)"/>
    <circle cx="32" cy="32" r="4" fill="#FCE7F3"/>
  `),
  da_j_logo: icon(`
    <path fill="#2563EB" d="M38 12c0-2 1.5-4 4-4s4 2 4 4v28c0 10-8 18-18 18S10 50 10 40h8c0 5 4 10 10 10s10-5 10-10V12z"/>
    <circle cx="42" cy="10" r="4.5" fill="#2563EB"/>
  `),
  da_chef_hat: icon(`
    <path fill="#F8FAFC" stroke="#E5E7EB" stroke-width="1.5" d="M16 34c-4-2-6-7-4-11 1-3 4-5 7-5 1-5 5-9 11-9s10 4 11 9c3 0 6 2 7 5 2 4 0 9-4 11H16z"/>
    <rect x="14" y="34" width="36" height="14" rx="3" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.5"/>
    <path fill="#E2E8F0" d="M18 34h28v4H18z"/>
  `),
  da_leaf: icon(`
    <path fill="#22C55E" d="M32 8c14 8 20 20 18 34-8 2-16 2-24-2C18 28 22 14 32 8z"/>
    <path fill="#16A34A" d="M32 8c-2 10-2 22 2 34 8 2 14 2 18-2C54 28 46 14 32 8z"/>
    <path fill="none" stroke="#BBF7D0" stroke-width="2.2" stroke-linecap="round" d="M28 20c4 8 6 16 6 24"/>
  `),
  da_basket: icon(`
    <path fill="#F97316" d="M14 28h36l-3 22H17z"/>
    <path fill="#EA580C" d="M14 28h36l-2 6H16z"/>
    <path fill="none" stroke="#C2410C" stroke-width="2.5" stroke-linecap="round" d="M20 28V22a12 12 0 0124 0v6"/>
    <circle cx="24" cy="38" r="3" fill="#FDE68A"/>
    <circle cx="32" cy="40" r="3.5" fill="#EF4444"/>
    <circle cx="40" cy="37" r="3" fill="#22C55E"/>
    <rect x="28" y="34" width="8" height="5" rx="1" fill="#A3E635"/>
  `),
  da_pokeball: icon(`
    <circle cx="32" cy="32" r="22" fill="#F8FAFC" stroke="#111" stroke-width="2"/>
    <path fill="#EF4444" d="M10.5 32a21.5 21.5 0 0143 0H10.5z"/>
    <path fill="none" stroke="#111" stroke-width="3" d="M10 32h44"/>
    <circle cx="32" cy="32" r="7" fill="#F8FAFC" stroke="#111" stroke-width="2.5"/>
    <circle cx="32" cy="32" r="3.2" fill="#111"/>
  `),
  da_grid: icon(`
    <rect x="10" y="10" width="14" height="14" rx="2" fill="#93C5FD"/>
    <rect x="25" y="10" width="14" height="14" rx="2" fill="#60A5FA"/>
    <rect x="40" y="10" width="14" height="14" rx="2" fill="#93C5FD"/>
    <rect x="10" y="25" width="14" height="14" rx="2" fill="#60A5FA"/>
    <rect x="25" y="25" width="14" height="14" rx="2" fill="#3B82F6"/>
    <rect x="40" y="25" width="14" height="14" rx="2" fill="#60A5FA"/>
    <rect x="10" y="40" width="14" height="14" rx="2" fill="#93C5FD"/>
    <rect x="25" y="40" width="14" height="14" rx="2" fill="#60A5FA"/>
    <rect x="40" y="40" width="14" height="14" rx="2" fill="#93C5FD"/>
  `),
  da_smile: icon(`
    <circle cx="32" cy="32" r="22" fill="#FACC15"/>
    <circle cx="24" cy="28" r="3.2" fill="#111"/>
    <circle cx="40" cy="28" r="3.2" fill="#111"/>
    <path fill="none" stroke="#111" stroke-width="3" stroke-linecap="round" d="M22 38c3 5 8 7 10 7s7-2 10-7"/>
    <path fill="#EF4444" d="M42 16l4-8 2 8 7 1-6 5 2 8-7-4-7 4 2-8-6-5z"/>
  `),
  da_chevron: icon(`
    <path fill="#7C3AED" d="M18 14l22 18-22 18 8 0 22-18L26 14z"/>
    <path fill="#A78BFA" d="M28 14l22 18-22 18 8 0 22-18L36 14z" opacity=".85"/>
  `),
  da_chat: icon(`
    <path fill="#FBBF24" d="M12 14h24a6 6 0 016 6v12a6 6 0 01-6 6H22l-8 8V20a6 6 0 016-6z"/>
    <path fill="#FB923C" d="M28 24h24a6 6 0 016 6v12a6 6 0 01-6 6H38l-8 8V30a6 6 0 016-6z"/>
    <path fill="#7DD3FC" d="M20 28h16a5 5 0 015 5v8a5 5 0 01-5 5h-6l-6 6V33a5 5 0 015-5z"/>
  `),
  da_sombrero: icon(`
    <ellipse cx="32" cy="42" rx="26" ry="8" fill="#FBBF24"/>
    <ellipse cx="32" cy="40" rx="26" ry="6" fill="#F59E0B"/>
    <path fill="#FDE68A" d="M20 28c0-10 5-16 12-16s12 6 12 16c-4-2-8-3-12-3s-8 1-12 3z"/>
    <path fill="#EF4444" d="M20 30c4-1 8-2 12-2s8 1 12 2l-2 4c-3-1-6-1.5-10-1.5s-7 .5-10 1.5z"/>
    <path fill="#22C55E" d="M22 36c3-.8 6-1.2 10-1.2s7 .4 10 1.2l-1.5 3c-2.5-.6-5-.9-8.5-.9s-6 .3-8.5.9z"/>
  `),
  da_clover: icon(`
    <circle cx="24" cy="28" r="10" fill="#22C55E"/>
    <circle cx="40" cy="28" r="10" fill="#16A34A"/>
    <circle cx="32" cy="40" r="10" fill="#22C55E"/>
    <circle cx="32" cy="30" r="5" fill="#4ADE80"/>
    <path fill="#F8FAFC" d="M36 18l2 4 4 .4-3 3 .8 4.2L36 27l-3.8 2.6.8-4.2-3-3 4-.4z"/>
  `),
  da_user: icon(`
    <circle cx="32" cy="32" r="24" fill="#7C3AED"/>
    <circle cx="32" cy="26" r="8" fill="#F8FAFC"/>
    <path fill="#F8FAFC" d="M16 48c2-8 8-12 16-12s14 4 16 12"/>
    <circle cx="14" cy="20" r="3" fill="#C4B5FD"/>
    <circle cx="50" cy="20" r="3" fill="#C4B5FD"/>
    <circle cx="12" cy="40" r="2.5" fill="#C4B5FD"/>
    <circle cx="52" cy="40" r="2.5" fill="#C4B5FD"/>
    <path stroke="#C4B5FD" stroke-width="1.6" fill="none" d="M17 22l8 4M47 22l-8 4M14 38l8-4M50 38l-8-4"/>
  `),
  da_wave: icon(`
    <path fill="#38BDF8" d="M6 40c8-10 14-10 22 0s14 10 22 0 8-8 14-2v18H6z"/>
    <path fill="#0EA5E9" d="M6 46c8-8 14-8 22 0s14 8 22 0 8-6 14 0v14H6z"/>
    <path fill="#F8FAFC" d="M10 38c4-6 8-6 12 0 2-8 8-10 14-4 3-5 8-5 12 0l-2 4c-3-3-6-2-8 1-4-4-8-3-11 2-3-4-7-4-11 1z"/>
  `),
  da_exchange: icon(`
    <circle cx="24" cy="34" r="12" fill="#FB923C"/>
    <circle cx="40" cy="28" r="12" fill="#F97316"/>
    <text x="24" y="39" text-anchor="middle" font-size="12" font-family="Arial Black, sans-serif" fill="#fff">$</text>
    <text x="40" y="33" text-anchor="middle" font-size="12" font-family="Arial Black, sans-serif" fill="#fff">€</text>
    <path fill="none" stroke="#EA580C" stroke-width="2.8" stroke-linecap="round" d="M16 18c8-6 24-6 32 4"/>
    <path fill="none" stroke="#EA580C" stroke-width="2.8" stroke-linecap="round" d="M48 46c-8 6-24 6-32-4"/>
    <path fill="#EA580C" d="M46 18l6 2-4 5zM18 46l-6-2 4-5z"/>
  `),
  da_back: icon(`
    <path fill="none" stroke="#DBEAFE" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.65" d="M26 24l-8 8 8 8M38 24l8 8-8 8"/>
  `),

  // ----- Food (design sheet) -----
  fries: icon(`
    <path fill="#DC2626" d="M18 32h28l-4 24H22z"/>
    <path fill="#F8FAFC" d="M22 38h20v5H22z"/>
    <path fill="#FBBF24" d="M22 10h5v24h-5zm8-4h5v28h-5zm8 6h5v22h-5zm-22 4h5v20h-5z"/>
    <path fill="#F59E0B" d="M24 12h1.5v20H24zm8-2h1.5v24H32zm8 6h1.5v18H40z"/>
  `),
  pizza: icon(`
    <path fill="#E8A317" d="M32 8l24 46H8z"/>
    <path fill="#EF4444" d="M32 14l18 36H14z"/>
    <circle cx="26" cy="34" r="3.2" fill="#7F1D1D"/>
    <circle cx="36" cy="30" r="2.8" fill="#7F1D1D"/>
    <circle cx="34" cy="42" r="3" fill="#7F1D1D"/>
    <circle cx="28" cy="42" r="2.2" fill="#166534"/>
    <path fill="#FDE68A" d="M32 10l3 6-3 1-3-1z"/>
  `),
  sandwich: icon(`
    <path fill="#D97706" d="M10 22h44l-2 8H12z"/>
    <path fill="#F8FAFC" d="M12 30h40v4H12z"/>
    <path fill="#16A34A" d="M12 34h40v5H12z"/>
    <path fill="#EF4444" d="M14 39h36v4H14z"/>
    <path fill="#FBBF24" d="M12 43h40v4H12z"/>
    <path fill="#B45309" d="M12 47h40l-2 8H14z"/>
  `),
  donut: icon(`
    <circle cx="32" cy="32" r="22" fill="#FDE68A"/>
    <circle cx="32" cy="32" r="22" fill="none" stroke="#FBBF24" stroke-width="2"/>
    <path fill="#7DD3FC" d="M12 28a20 20 0 0140 4c-2 10-10 16-20 16S14 42 12 32z"/>
    <circle cx="32" cy="32" r="7.5" fill="#FEF3C7"/>
    <circle cx="32" cy="32" r="7.5" fill="none" stroke="#FDE68A" stroke-width="2"/>
    <rect x="20" y="22" width="3" height="8" rx="1.5" fill="#EF4444" transform="rotate(-30 21.5 26)"/>
    <rect x="34" y="20" width="3" height="8" rx="1.5" fill="#22C55E" transform="rotate(20 35.5 24)"/>
    <rect x="40" y="30" width="3" height="8" rx="1.5" fill="#F59E0B" transform="rotate(55 41.5 34)"/>
    <rect x="24" y="34" width="3" height="8" rx="1.5" fill="#A855F7" transform="rotate(-10 25.5 38)"/>
  `),
  sushi: icon(`
    <ellipse cx="32" cy="38" rx="20" ry="12" fill="#1F2937"/>
    <ellipse cx="32" cy="36" rx="15" ry="9" fill="#F8FAFC"/>
    <ellipse cx="32" cy="36" rx="7" ry="4.5" fill="#FB923C"/>
    <rect x="29" y="32" width="6" height="8" rx="1" fill="#16A34A"/>
  `),
  corndog: icon(`
    <path fill="#92400E" d="M30 44h4v14h-4z"/>
    <path fill="#F59E0B" d="M24 10c8-4 16 0 18 10 2 12-2 26-10 30-8 2-14-8-12-20 1-10 2-16 4-20z"/>
    <path fill="#EAB308" d="M28 12c4-2 10 0 11 8 2 10-1 22-7 26-5 1-9-6-8-16 1-8 2-14 4-18z"/>
    <path stroke="#FACC15" stroke-width="2.4" stroke-linecap="round" d="M26 20c6 2 10 8 12 14"/>
  `),
  burger: icon(`
    <path fill="#D97706" d="M12 26c0-11 8-16 20-16s20 5 20 16H12z"/>
    <circle cx="22" cy="20" r="1.5" fill="#FDE68A"/>
    <circle cx="32" cy="16" r="1.5" fill="#FDE68A"/>
    <circle cx="42" cy="20" r="1.5" fill="#FDE68A"/>
    <rect x="12" y="28" width="40" height="5" rx="2" fill="#16A34A"/>
    <path fill="#FBBF24" d="M12 34h40l-4 4H16z"/>
    <rect x="12" y="38" width="40" height="7" rx="2" fill="#7C2D12"/>
    <path fill="#B45309" d="M12 46h40c0 9-8 12-20 12S12 55 12 46z"/>
  `),
  pretzel: icon(`
    <path d="M18 38c0-14 8-20 14-20 6 0 8 5 8 9s-3 7-8 7c-6 0-10-1-10 5s6 11 14 11 16-8 16-16" fill="none" stroke="#A16207" stroke-width="8" stroke-linecap="round"/>
    <path d="M18 38c0-14 8-20 14-20 6 0 8 5 8 9s-3 7-8 7c-6 0-10-1-10 5s6 11 14 11 16-8 16-16" fill="none" stroke="#CA8A04" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="24" cy="28" r="1.6" fill="#FDE68A"/>
    <circle cx="36" cy="44" r="1.6" fill="#FDE68A"/>
    <circle cx="42" cy="30" r="1.6" fill="#FDE68A"/>
  `),
  cupcake: icon(`
    <path fill="#60A5FA" d="M18 34h28l-4 20H22z"/>
    <path fill="#3B82F6" d="M20 40h24M22 48h20" stroke="#2563EB" stroke-width="1.5"/>
    <path fill="#F9A8D4" d="M16 32c2-12 8-18 16-18s14 6 16 18H16z"/>
    <circle cx="26" cy="26" r="3" fill="#FBCFE8"/>
    <circle cx="36" cy="24" r="4" fill="#FBCFE8"/>
    <circle cx="32" cy="14" r="4" fill="#EF4444"/>
    <path fill="#FCA5A5" d="M32 10c2 3 0 6 0 6s-3-1.5-3-4.5 1.5-3 3-1.5z"/>
  `),
  cake: icon(`
    <path fill="#7C2D12" d="M14 30c0-8 8-14 18-14s18 6 18 14v8c0 10-8 16-18 16S14 48 14 38z"/>
    <path fill="#5C2E0B" d="M14 30c4 3 11 5 18 5s14-2 18-5v6c-4 3-11 5-18 5s-14-2-18-5z"/>
    <path fill="#3F1A05" d="M18 28c3-2 8-3 14-3s11 1 14 3c-3 2-8 3-14 3s-11-1-14-3z"/>
    <circle cx="32" cy="16" r="4" fill="#EF4444"/>
    <path fill="#FCA5A5" d="M32 12c2 3 0 6 0 6s-3-1.5-3-4.5 1.5-3 3-1.5z"/>
    <path fill="#16A34A" d="M28 14c2-4 4-5 4-5s2 2 4 5c-2.5-1-5.5-1-8 0z"/>
  `),
  flan: icon(`
    <ellipse cx="32" cy="46" rx="22" ry="8" fill="#D97706"/>
    <path fill="#FBBF24" d="M14 28c2 12 8 18 18 18s16-6 18-18c-4 3-11 5-18 5s-14-2-18-5z"/>
    <ellipse cx="32" cy="28" rx="18" ry="8" fill="#FDE68A"/>
    <path fill="#B45309" d="M20 22c4 2 8 3 12 3s8-1 12-3c-2 4-6 6-12 6s-10-2-12-6z"/>
  `),
  chocolate: icon(`
    <rect x="12" y="18" width="40" height="30" rx="4" fill="#5C2E0B"/>
    <path stroke="#3E1F08" stroke-width="2.2" d="M12 33h40M25.5 18v30M38.5 18v30"/>
    <rect x="14" y="20" width="10" height="11" rx="1.5" fill="#7A3F14"/>
    <rect x="27" y="20" width="10" height="11" rx="1.5" fill="#6B3410"/>
    <rect x="40" y="20" width="10" height="11" rx="1.5" fill="#7A3F14"/>
  `),
  chicken: icon(`
    <path fill="#DC2626" d="M16 22h32v32H16z"/>
    <path fill="#F8FAFC" d="M22 14h20v12H22z"/>
    <path fill="#F59E0B" d="M22 30h8v16h-8zm12 2h8v14h-8z"/>
    <path fill="#EAB308" d="M24 28h4v4h-4zm14 2h4v4h-4z"/>
    <path fill="#fff" d="M20 44h24v4H20z"/>
  `),
  wrap: icon(`
    <path fill="#F5D0A9" d="M16 14h32l6 36-6 6H22l-6-6z"/>
    <path fill="#E8B86D" d="M18 16h28l4 20H20z"/>
    <path fill="#16A34A" d="M20 24h24l-2 10H22z"/>
    <path fill="#EF4444" d="M22 30h20l-1.5 8H24z"/>
    <path fill="#F8FAFC" d="M24 36h16l-1 6H25z"/>
  `),
  taco: icon(`
    <path fill="#F59E0B" d="M10 42c0-18 10-28 22-28s22 10 22 28H10z"/>
    <path fill="#EAB308" d="M14 42c0-14 8-22 18-22s18 8 18 22H14z"/>
    <path fill="#16A34A" d="M16 38c4-10 10-14 16-14s12 4 16 14H16z"/>
    <path fill="#B91C1C" d="M20 40c3-6 7-9 12-9s9 3 12 9H20z"/>
    <path fill="#FDE68A" d="M22 42c2-3 5-5 10-5s8 2 10 5H22z"/>
  `),
  icecream: icon(`
    <path fill="#D97706" d="M26 36h12l-2 22h-8z"/>
    <path fill="#B45309" d="M28 40h2v16h-2zm6 0h2v16h-2z"/>
    <path fill="#5EEAD4" d="M18 20a14 14 0 0128 0v16H18z"/>
    <circle cx="26" cy="18" r="7" fill="#2DD4BF"/>
    <circle cx="38" cy="16" r="8" fill="#5EEAD4"/>
    <circle cx="32" cy="12" r="6" fill="#99F6E4"/>
  `),
  salad: icon(`
    <ellipse cx="32" cy="46" rx="22" ry="8" fill="#78716C"/>
    <path fill="#A8A29E" d="M12 38c3 6 10 10 20 10s17-4 20-10c-4 2-11 4-20 4s-16-2-20-4z"/>
    <ellipse cx="24" cy="30" rx="10" ry="8" fill="#22C55E"/>
    <ellipse cx="40" cy="28" rx="9" ry="7" fill="#16A34A"/>
    <ellipse cx="32" cy="34" rx="11" ry="7" fill="#4ADE80"/>
    <circle cx="28" cy="26" r="3.5" fill="#EF4444"/>
    <circle cx="38" cy="32" r="3" fill="#FB923C"/>
    <circle cx="22" cy="34" r="2.5" fill="#FBBF24"/>
  `),
  macarons: icon(`
    <path fill="#F9A8D4" d="M18 40c0-6 6-10 14-10s14 4 14 10v4c0 6-6 10-14 10S18 50 18 44z"/>
    <ellipse cx="32" cy="40" rx="14" ry="4" fill="#FBCFE8"/>
    <path fill="#FDE68A" d="M20 28c0-6 5-9 12-9s12 3 12 9v3c0 5-5 9-12 9s-12-4-12-9z"/>
    <ellipse cx="32" cy="28" rx="12" ry="3.5" fill="#FEF3C7"/>
    <path fill="#7DD3FC" d="M22 16c0-5 4-8 10-8s10 3 10 8v3c0 5-4 8-10 8s-10-3-10-8z"/>
    <ellipse cx="32" cy="16" rx="10" ry="3" fill="#BAE6FD"/>
  `),
  food_back: icon(`
    <rect x="18" y="16" width="28" height="32" rx="4" fill="none" stroke="#FFEDD5" stroke-width="2.4" opacity="0.55"/>
    <path fill="none" stroke="#FFEDD5" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.65" d="M28 26l-6 6 6 6M36 26l6 6-6 6"/>
  `),

  // legacy leftovers
  avocado: icon(`
    <path fill="#65A30D" d="M32 8c12 0 20 12 20 26S42 58 32 58 12 48 12 34 20 8 32 8z"/>
    <path fill="#A3E635" d="M32 14c8 0 14 9 14 20s-6 18-14 18-14-7-14-18 6-20 14-20z"/>
    <circle cx="32" cy="34" r="7" fill="#78350F"/>
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
  `),
  watermelon: icon(`
    <path fill="#F87171" d="M10 40a22 22 0 0144 0H10z"/>
    <path fill="#4ADE80" d="M12 40a20 20 0 0040 0H12z"/>
    <path fill="#F8FAFC" d="M16 40a16 16 0 0032 0H16z"/>
  `),
  cheese: icon(`
    <path fill="#FBBF24" d="M8 40L32 12l24 28H8z"/>
    <path fill="#F59E0B" d="M8 40h48v10H8z"/>
  `),
  cookie: icon(`
    <circle cx="32" cy="32" r="22" fill="#D97706"/>
    <circle cx="24" cy="24" r="3" fill="#78350F"/>
    <circle cx="38" cy="22" r="2.5" fill="#78350F"/>
    <circle cx="30" cy="34" r="3" fill="#78350F"/>
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
