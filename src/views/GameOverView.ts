import {
  confettiStrip,
  largePawnIcon,
  pawnIcon,
  scalesIcon,
  trophyIcon,
} from '../components/icons';
import { THEMES } from '../data/themes';
import type { GameSettings, GameSnapshot, PlayerState, ThemeId } from '../types';

export type GameOverPhase = 'score' | 'result';

export interface GameOverViewCallbacks {
  onContinue: () => void;
  onReplay: () => void;
  onHome: () => void;
}

const AUTO_CONTINUE_MS = 2200;

type EndPalette = {
  scoreBg: string;
  resultBg: string;
  titleColor: string;
  subtitleColor: string;
};

const END_PALETTE: Record<ThemeId, EndPalette> = {
  code: {
    scoreBg: '#2b2b2b',
    resultBg: '#2b2b2b',
    titleColor: '#14b8a6',
    subtitleColor: '#ffffff',
  },
  gaming: {
    scoreBg: '#4a6d82',
    resultBg: '#4a6d82',
    titleColor: '#ec4899',
    subtitleColor: '#ffffff',
  },
  da: {
    scoreBg: '#2f8f9d',
    resultBg: '#2f8f9d',
    titleColor: '#ff8a1f',
    subtitleColor: '#ffffff',
  },
  food: {
    scoreBg: '#ff8c32',
    resultBg: '#f4f2ef',
    titleColor: '#ffffff',
    subtitleColor: '#ffffff',
  },
};

/**
 * Game-over flow: final score → winner / draw announcement.
 */
export function renderGameOverView(
  root: HTMLElement,
  settings: GameSettings,
  snapshot: GameSnapshot,
  phase: GameOverPhase,
  callbacks: GameOverViewCallbacks,
): number | null {
  const themeId = settings.themeId;
  const palette = END_PALETTE[themeId];
  const winner = resolveWinner(snapshot.players);
  let autoTimer: number | null = null;

  if (phase === 'score') {
    const title = themeId === 'code' ? 'Game over' : 'GAME OVER';

    root.innerHTML = `
      <section
        class="screen screen--gameover screen--gameover-score theme-${themeId}"
        aria-label="Spielende"
        style="--end-bg: ${palette.scoreBg}; --end-title: ${palette.titleColor}; --end-sub: ${palette.subtitleColor}; --theme-accent: ${THEMES[themeId].accent}"
      >
        <main class="gameover-panel gameover-anim">
          <h1 class="gameover-title gameover-anim__item gameover-anim__item--1">${title}</h1>
          <p class="gameover-subtitle gameover-anim__item gameover-anim__item--2">Final score</p>
          <ul class="gameover-scores gameover-anim__item gameover-anim__item--3" aria-label="Endstand">
            ${snapshot.players
              .map(
                (player) => `
                  <li class="gameover-score gameover-score--${player.color}">
                    ${pawnIcon('white', 22)}
                    <span class="gameover-score__value">${player.score}</span>
                  </li>
                `,
              )
              .join('')}
          </ul>
        </main>
      </section>
    `;

    autoTimer = window.setTimeout(() => {
      callbacks.onContinue();
    }, AUTO_CONTINUE_MS);

    return autoTimer;
  }

  if (!winner) {
    root.innerHTML = renderDrawScreen(themeId, palette);
  } else {
    root.innerHTML = renderWinnerScreen(themeId, palette, winner);
  }

  root.querySelector('[data-action="home"]')?.addEventListener('click', () => {
    callbacks.onHome();
  });

  root.querySelector('[data-action="replay"]')?.addEventListener('click', () => {
    callbacks.onReplay();
  });

  return null;
}

function renderWinnerScreen(
  themeId: ThemeId,
  palette: EndPalette,
  winner: PlayerState,
): string {
  const winnerColor = winner.color === 'orange' ? '#ff9800' : '#4fc3f7';
  const winnerLabel =
    themeId === 'code'
      ? winner.color === 'orange'
        ? 'ORANGE PLAYER'
        : 'BLUE PLAYER'
      : winner.color === 'orange'
        ? 'Orange Player'
        : 'Blue Player';

  const outlined = themeId === 'da' || themeId === 'food';
  const icon =
    themeId === 'gaming'
      ? trophyIcon()
      : largePawnIcon(winner.color, outlined);

  const confetti =
    themeId === 'code'
      ? `${confettiStrip()}
        <span class="confetti-burst" aria-hidden="true">
          ${Array.from({ length: 22 }, (_, index) => {
            const colors = ['#ef4444', '#fbbf24', '#22d3ee', '#3b82f6', '#a3e635', '#f472b6'];
            const color = colors[index % colors.length];
            const left = 6 + (index * 4.1) % 88;
            const delay = (index % 8) * 0.07;
            const duration = 1.35 + (index % 5) * 0.12;
            return `<span class="confetti-burst__piece" style="left:${left}%;background:${color};animation-delay:${delay}s;animation-duration:${duration}s"></span>`;
          }).join('')}
        </span>`
      : '';

  const iconBlock =
    themeId === 'food'
      ? `<div class="result-icon-card result-anim__item result-anim__item--3"><p class="result-icon">${icon}</p></div>`
      : `<p class="result-icon result-anim__item result-anim__item--3">${icon}</p>`;

  const homeButton = renderHomeButton(themeId, winner.color);

  return `
    <section
      class="screen screen--gameover screen--result screen--winner theme-${themeId}"
      aria-label="Gewinner"
      style="--end-bg: ${palette.resultBg}; --end-title: ${palette.titleColor}; --end-sub: ${
        themeId === 'food' ? '#c4783f' : '#ffffff'
      }; --theme-accent: ${THEMES[themeId].accent}; --winner-color: ${winnerColor}"
    >
      ${confetti}
      <main class="result-panel result-anim">
        <p class="result-eyebrow result-anim__item result-anim__item--1">The winner is</p>
        <h1 class="result-winner result-anim__item result-anim__item--2">${winnerLabel}</h1>
        ${iconBlock}
        ${homeButton}
      </main>
    </section>
  `;
}

function renderDrawScreen(themeId: ThemeId, palette: EndPalette): string {
  const outlined = themeId === 'da' || themeId === 'food';
  const title = themeId === 'code' || themeId === 'gaming' ? "It's a DRAW" : "It's a DRAW";
  const drawTitleColor =
    themeId === 'food' ? '#ff8c32' : themeId === 'da' ? '#ff8a1f' : palette.titleColor;

  const iconBlock =
    themeId === 'food'
      ? `<div class="result-icon-card result-anim__item result-anim__item--2"><p class="result-icon result-icon--draw">${scalesIcon(outlined)}</p></div>`
      : `<p class="result-icon result-icon--draw result-anim__item result-anim__item--2">${scalesIcon(outlined)}</p>`;

  return `
    <section
      class="screen screen--gameover screen--result screen--draw theme-${themeId}"
      aria-label="Unentschieden"
      style="--end-bg: ${palette.resultBg}; --end-title: ${drawTitleColor}; --end-sub: ${
        themeId === 'food' ? '#ff8c32' : '#ffffff'
      }; --theme-accent: ${THEMES[themeId].accent}"
    >
      <main class="result-panel result-anim">
        <h1 class="result-title result-anim__item result-anim__item--1">${title}</h1>
        ${iconBlock}
        ${renderHomeButton(themeId, 'orange')}
      </main>
    </section>
  `;
}

function renderHomeButton(themeId: ThemeId, accentPlayer: 'orange' | 'blue'): string {
  if (themeId === 'code') {
    return `
      <button type="button" class="btn btn--end-link result-anim__item result-anim__item--4" data-action="home">
        Back to start
      </button>
    `;
  }

  if (themeId === 'gaming') {
    return `
      <button type="button" class="btn btn--end-fill result-anim__item result-anim__item--4" data-action="home">
        Home
      </button>
    `;
  }

  if (themeId === 'da') {
    return `
      <button type="button" class="btn btn--end-light result-anim__item result-anim__item--4" data-action="home">
        Home
      </button>
    `;
  }

  const fill = accentPlayer === 'blue' ? '#4fc3f7' : '#ff8c32';
  return `
    <button
      type="button"
      class="btn btn--end-fill result-anim__item result-anim__item--4"
      data-action="home"
      style="--end-btn-bg: ${fill}"
    >
      Home
    </button>
  `;
}

function resolveWinner(players: [PlayerState, PlayerState]): PlayerState | null {
  if (players[0].score === players[1].score) {
    return null;
  }

  return players[0].score > players[1].score ? players[0] : players[1];
}
