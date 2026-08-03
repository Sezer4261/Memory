import {
  confettiStrip,
  largePawnIcon,
  pawnIcon,
  playIcon,
  scalesIcon,
} from '../components/icons';
import { THEMES } from '../data/themes';
import type { GameSettings, GameSnapshot, PlayerState } from '../types';

export type GameOverPhase = 'score' | 'result';

export interface GameOverViewCallbacks {
  onContinue: () => void;
  onReplay: () => void;
  onHome: () => void;
}

const AUTO_CONTINUE_MS = 2200;

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
  const theme = THEMES[settings.themeId];
  const winner = resolveWinner(snapshot.players);
  let autoTimer: number | null = null;

  if (phase === 'score') {
    root.innerHTML = `
      <section
        class="screen screen--gameover"
        aria-label="Spielende"
        style="--board-bg: ${theme.boardBackground}; --theme-accent: ${theme.accent}; --board-text: ${theme.textOnBoard}"
      >
        <main class="gameover-panel gameover-anim">
          <h1 class="gameover-title gameover-anim__item gameover-anim__item--1">Game over</h1>
          <p class="gameover-subtitle gameover-anim__item gameover-anim__item--2">Final score</p>
          <ul class="gameover-scores gameover-anim__item gameover-anim__item--3" aria-label="Endstand">
            ${snapshot.players
              .map(
                (player) => `
                  <li class="gameover-score gameover-score--${player.color}">
                    ${pawnIcon(player.color, 34)}
                    <span class="gameover-score__value">${String(player.score).padStart(2, '0')}</span>
                  </li>
                `,
              )
              .join('')}
          </ul>
          <p class="gameover-hint gameover-anim__item gameover-anim__item--4">Weiter geht's automatisch…</p>
        </main>
      </section>
    `;

    autoTimer = window.setTimeout(() => {
      callbacks.onContinue();
    }, AUTO_CONTINUE_MS);

    return autoTimer;
  }

  if (!winner) {
    root.innerHTML = `
      <section
        class="screen screen--gameover screen--result"
        aria-label="Unentschieden"
        style="--board-bg: ${theme.boardBackground}; --theme-accent: ${theme.accent}; --board-text: ${theme.textOnBoard}"
      >
        <main class="result-panel result-anim">
          <h1 class="result-title result-anim__item result-anim__item--1">It's a DRAW</h1>
          <p class="result-icon result-icon--draw result-anim__item result-anim__item--2">${scalesIcon()}</p>
          <button type="button" class="btn btn--yellow btn--pulse result-anim__item result-anim__item--3" data-action="replay">
            <span class="btn__icon">${playIcon()}</span>
            <span>NEW GAME</span>
          </button>
          <button type="button" class="btn btn--text result-anim__item result-anim__item--4" data-action="home">Home</button>
        </main>
      </section>
    `;
  } else {
    const winnerLabel =
      winner.color === 'orange' ? 'ORANGE PLAYER' : 'BLUE PLAYER';

    root.innerHTML = `
      <section
        class="screen screen--gameover screen--result"
        aria-label="Gewinner"
        style="--board-bg: ${theme.boardBackground}; --theme-accent: ${theme.accent}; --board-text: ${theme.textOnBoard}; --winner-color: ${
          winner.color === 'orange' ? '#ff9800' : '#4fc3f7'
        }"
      >
        ${confettiStrip()}
        <span class="confetti-burst" aria-hidden="true">
          ${Array.from({ length: 24 }, (_, index) => {
            const colors = ['#ef4444', '#fbbf24', '#22d3ee', '#3b82f6', '#a3e635', '#f472b6'];
            const color = colors[index % colors.length];
            const left = 8 + (index * 3.7) % 84;
            const delay = (index % 8) * 0.08;
            const duration = 1.4 + (index % 5) * 0.15;
            return `<span class="confetti-burst__piece" style="left:${left}%;background:${color};animation-delay:${delay}s;animation-duration:${duration}s"></span>`;
          }).join('')}
        </span>
        <main class="result-panel result-anim">
          <p class="result-eyebrow result-anim__item result-anim__item--1">The winner is</p>
          <h1 class="result-winner result-anim__item result-anim__item--2">${winnerLabel}</h1>
          <p class="result-icon result-anim__item result-anim__item--3">${largePawnIcon(winner.color)}</p>
          <button type="button" class="btn btn--yellow btn--pulse result-anim__item result-anim__item--4" data-action="replay">
            <span class="btn__icon">${playIcon()}</span>
            <span>PLAY AGAIN</span>
          </button>
          <button type="button" class="btn btn--text result-anim__item result-anim__item--5" data-action="home">Home</button>
        </main>
      </section>
    `;
  }

  root.querySelector('[data-action="replay"]')?.addEventListener('click', () => {
    callbacks.onReplay();
  });

  root.querySelector('[data-action="home"]')?.addEventListener('click', () => {
    callbacks.onHome();
  });

  return null;
}

function resolveWinner(players: [PlayerState, PlayerState]): PlayerState | null {
  if (players[0].score === players[1].score) {
    return null;
  }

  return players[0].score > players[1].score ? players[0] : players[1];
}
