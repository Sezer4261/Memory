import type { PlayerColor } from '../types';

/** Player pawn icon used in scoreboard and turn indicator. */
export function pawnIcon(color: PlayerColor | 'white', size = 28): string {
  const fill =
    color === 'white' ? '#ffffff' : color === 'orange' ? '#ff9800' : '#4fc3f7';

  return `
    <svg class="pawn-icon" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="18" r="12" fill="${fill}"/>
      <path d="M14 56c2-14 10-22 18-22s16 8 18 22z" fill="${fill}"/>
    </svg>
  `;
}

/** Large winner pawn for the game-over screen. */
export function largePawnIcon(color: PlayerColor): string {
  const fill = color === 'orange' ? '#ff9800' : '#4fc3f7';

  return `
    <svg class="winner-pawn" viewBox="0 0 120 160" aria-hidden="true">
      <circle cx="60" cy="36" r="28" fill="${fill}"/>
      <path d="M24 148c6-40 22-62 36-62s30 22 36 62z" fill="${fill}"/>
    </svg>
  `;
}

/** Decorative game-controller icon (legacy / preview). */
export function controllerIcon(className = 'controller-icon'): string {
  return `
    <svg class="${className}" viewBox="0 0 120 80" aria-hidden="true">
      <defs>
        <linearGradient id="controllerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e91e8c"/>
          <stop offset="100%" stop-color="#7e57c2"/>
        </linearGradient>
      </defs>
      <path
        class="controller-body"
        d="M20 28c0-10 8-18 18-18h44c10 0 18 8 18 18v8c0 14-8 26-20 30l-8 6H48l-8-6C28 62 20 50 20 36v-8z"
        fill="url(#controllerGlow)"
      />
      <circle class="controller-btn controller-btn--a" cx="78" cy="34" r="5" fill="#ffeb3b"/>
      <circle class="controller-btn controller-btn--b" cx="90" cy="42" r="5" fill="#4fc3f7"/>
      <circle class="controller-btn controller-btn--x" cx="66" cy="42" r="5" fill="#81c784"/>
      <circle class="controller-btn controller-btn--y" cx="78" cy="50" r="5" fill="#ff8a65"/>
      <rect class="controller-dpad" x="32" y="30" width="8" height="24" rx="2" fill="#243b4a"/>
      <rect class="controller-dpad" x="24" y="38" width="24" height="8" rx="2" fill="#243b4a"/>
    </svg>
  `;
}

/** Large Stadia controller watermark (Material Symbol: stadia_controller outlined). */
export function watermarkControllerIcon(): string {
  return `
    <svg class="home-watermark__svg" viewBox="0 -960 960 960" aria-hidden="true">
      <path
        fill="currentColor"
        d="M189-160q-60 0-102.5-43T42-307q0-9 1-18t3-18l84-336q14-54 57-87.5t98-33.5h390q55 0 98 33.5t57 87.5l84 336q2 9 3.5 18.5T919-306q0 61-43.5 103.5T771-160q-42 0-78-22t-54-60l-28-58q-5-10-15-15t-21-5H385q-11 0-21 5t-15 15l-28 58q-18 38-54 60t-78 22Zm2.66-60q24.34 0 45.01-12.97Q257.33-245.95 268-268l28-57q13-26 36.5-40.5T385-380h190q29 0 52.5 15t37.5 40l28 57q10.67 22.05 31.33 35.03Q745-220 769.26-220 805-220 831-244.5t27-60.5q0-4-3-24l-84-335q-8-33-34.4-54.5T675-740H285q-34.7 0-61.35 21T189-664l-84 335q-1 4-3 23 0 36.48 26.26 61.24Q154.52-220 191.66-220ZM561.5-538.68q8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5 12.82 0 21.32-8.68Zm80-80q8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5 12.82 0 21.32-8.68Zm0 160q8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5 12.82 0 21.32-8.68Zm80-80q8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5 12.82 0 21.32-8.68ZM358-472.08q7-7.09 7-17.92v-45h45q10.83 0 17.92-7.12 7.08-7.11 7.08-18 0-10.88-7.08-17.88-7.09-7-17.92-7h-45v-45q0-10.83-7.12-17.92-7.11-7.08-18-7.08-10.88 0-17.88 7.08-7 7.09-7 17.92v45h-45q-10.83 0-17.92 7.12-7.08 7.11-7.08 18 0 10.88 7.08 17.88 7.09 7 17.92 7h45v45q0 10.83 7.12 17.92 7.11 7.08 18 7.08 10.88 0 17.88-7.08ZM480-480Z"
      />
    </svg>
  `;
}

/** Small Stadia controller for the Play button (Material outline, matches screenshot). */
export function controllerLineIcon(): string {
  return `
    <svg width="28" height="20" viewBox="0 -960 960 960" aria-hidden="true">
      <path
        fill="currentColor"
        d="M189-160q-60 0-102.5-43T42-307q0-9 1-18t3-18l84-336q14-54 57-87.5t98-33.5h390q55 0 98 33.5t57 87.5l84 336q2 9 3.5 18.5T919-306q0 61-43.5 103.5T771-160q-42 0-78-22t-54-60l-28-58q-5-10-15-15t-21-5H385q-11 0-21 5t-15 15l-28 58q-18 38-54 60t-78 22Zm2.66-60q24.34 0 45.01-12.97Q257.33-245.95 268-268l28-57q13-26 36.5-40.5T385-380h190q29 0 52.5 15t37.5 40l28 57q10.67 22.05 31.33 35.03Q745-220 769.26-220 805-220 831-244.5t27-60.5q0-4-3-24l-84-335q-8-33-34.4-54.5T675-740H285q-34.7 0-61.35 21T189-664l-84 335q-1 4-3 23 0 36.48 26.26 61.24Q154.52-220 191.66-220ZM561.5-538.68q8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5 12.82 0 21.32-8.68Zm80-80q8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5 12.82 0 21.32-8.68Zm0 160q8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5 12.82 0 21.32-8.68Zm80-80q8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5 12.82 0 21.32-8.68ZM358-472.08q7-7.09 7-17.92v-45h45q10.83 0 17.92-7.12 7.08-7.11 7.08-18 0-10.88-7.08-17.88-7.09-7-17.92-7h-45v-45q0-10.83-7.12-17.92-7.11-7.08-18-7.08-10.88 0-17.88 7.08-7 7.09-7 17.92v45h-45q-10.83 0-17.92 7.12-7.08 7.11-7.08 18 0 10.88 7.08 17.88 7.09 7 17.92 7h45v45q0 10.83 7.12 17.92 7.11 7.08 18 7.08 10.88 0 17.88-7.08ZM480-480Z"
      />
    </svg>
  `;
}

/** Right arrow for the Play button. */
export function arrowRightIcon(): string {
  return `
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
      <path d="M1 7h14M10 2l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}

/** Small play triangle for Start buttons elsewhere. */
export function playIcon(): string {
  return `
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l13-7z" fill="currentColor"/>
    </svg>
  `;
}

/** Exit / leave icon for the game header button. */
export function exitIcon(): string {
  return `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M14 16l4-4-4-4M18 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}

/** Balance scales for draw results. */
export function scalesIcon(): string {
  return `
    <svg class="draw-scales" viewBox="0 0 120 100" aria-hidden="true">
      <path d="M60 12v70M40 82h40" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
      <path d="M20 28h80" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
      <path d="M28 28l-14 28h28zM92 28l-14 28h28z" fill="currentColor" opacity="0.85"/>
    </svg>
  `;
}

/** Small section icons for the settings modal. */
export function settingsSectionIcon(kind: 'player' | 'board' | 'theme'): string {
  if (kind === 'player') {
    return `
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="4" fill="#14b8a6"/>
        <path d="M4 20c1.5-4 4-6 8-6s6.5 2 8 6" fill="#14b8a6"/>
      </svg>
    `;
  }

  if (kind === 'board') {
    return `
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="10" height="14" rx="2" fill="#3b82f6"/>
        <rect x="11" y="3" width="10" height="14" rx="2" fill="#60a5fa"/>
      </svg>
    `;
  }

  return `
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="#a855f7"/>
      <circle cx="8" cy="10" r="2" fill="#f9a8d4"/>
      <circle cx="14" cy="8" r="2" fill="#c4b5fd"/>
      <circle cx="15" cy="14" r="2" fill="#ddd6fe"/>
    </svg>
  `;
}

/** Confetti strip decoration for winner / home screens. */
export function confettiStrip(): string {
  const pieces = Array.from({ length: 28 }, (_, index) => {
    const colors = ['#ef4444', '#fbbf24', '#22d3ee', '#3b82f6', '#a3e635', '#f472b6'];
    const color = colors[index % colors.length];
    const left = (index / 28) * 100;
    const rotate = (index * 37) % 90;
    const top = (index % 3) * 8;
    return `<span class="confetti-piece" style="left:${left}%;top:${top}px;background:${color};transform:rotate(${rotate}deg)"></span>`;
  }).join('');

  return `<div class="confetti-strip" aria-hidden="true">${pieces}</div>`;
}
