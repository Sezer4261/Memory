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

/**
 * Game-over flow: final score → winner / draw announcement.
 */
export function renderGameOverView(
  root: HTMLElement,
  settings: GameSettings,
  snapshot: GameSnapshot,
  phase: GameOverPhase,
  callbacks: GameOverViewCallbacks,
): void {
  const theme = THEMES[settings.themeId];
  const winner = resolveWinner(snapshot.players);

  if (phase === 'score') {
    root.innerHTML = `
      <section
        class="screen screen--gameover"
        aria-label="Spielende"
        style="--board-bg: ${theme.boardBackground}; --theme-accent: ${theme.accent}; --board-text: ${theme.textOnBoard}"
      >
        <div class="content-frame">
          <div class="gameover-panel">
            <h1 class="gameover-title">Game over</h1>
            <p class="gameover-subtitle">Final score</p>
            <div class="gameover-scores" aria-label="Endstand">
              ${snapshot.players
                .map(
                  (player) => `
                    <div class="gameover-score gameover-score--${player.color}">
                      ${pawnIcon(player.color, 34)}
                      <span class="gameover-score__value">${String(player.score).padStart(2, '0')}</span>
                    </div>
                  `,
                )
                .join('')}
            </div>
            <button type="button" class="btn btn--yellow" data-action="continue">
              <span>Continue</span>
            </button>
          </div>
        </div>
      </section>
    `;

    root.querySelector('[data-action="continue"]')?.addEventListener('click', () => {
      callbacks.onContinue();
    });
    return;
  }

  if (!winner) {
    root.innerHTML = `
      <section
        class="screen screen--gameover screen--result"
        aria-label="Unentschieden"
        style="--board-bg: ${theme.boardBackground}; --theme-accent: ${theme.accent}; --board-text: ${theme.textOnBoard}"
      >
        <div class="content-frame">
          <div class="result-panel">
            <h1 class="result-title">It's a DRAW</h1>
            <div class="result-icon result-icon--draw">${scalesIcon()}</div>
            <button type="button" class="btn btn--yellow" data-action="replay">
              <span class="btn__icon">${playIcon()}</span>
              <span>NEW GAME</span>
            </button>
            <button type="button" class="btn btn--text" data-action="home">Home</button>
          </div>
        </div>
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
        <div class="content-frame">
          <div class="result-panel">
            <p class="result-eyebrow">The winner is</p>
            <h1 class="result-winner">${winnerLabel}</h1>
            <div class="result-icon">${largePawnIcon(winner.color)}</div>
            <button type="button" class="btn btn--yellow" data-action="replay">
              <span class="btn__icon">${playIcon()}</span>
              <span>PLAY AGAIN</span>
            </button>
            <button type="button" class="btn btn--text" data-action="home">Home</button>
          </div>
        </div>
      </section>
    `;
  }

  root.querySelector('[data-action="replay"]')?.addEventListener('click', () => {
    callbacks.onReplay();
  });

  root.querySelector('[data-action="home"]')?.addEventListener('click', () => {
    callbacks.onHome();
  });
}

function resolveWinner(players: [PlayerState, PlayerState]): PlayerState | null {
  if (players[0].score === players[1].score) {
    return null;
  }

  return players[0].score > players[1].score ? players[0] : players[1];
}
