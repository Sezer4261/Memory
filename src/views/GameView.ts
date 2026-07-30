import { exitIcon, pawnIcon } from '../components/icons';
import { THEMES } from '../data/themes';
import type { GameSettings, GameSnapshot } from '../types';
import { escapeHtml } from '../utils/escapeHtml';
import { soundEffects } from '../utils/sound';

export interface GameViewCallbacks {
  onExitRequest: () => void;
  onExitConfirm: () => void;
  onExitCancel: () => void;
  onCardClick: (cardId: number) => void;
  onFinished: (snapshot: GameSnapshot) => void;
}

/**
 * Playfield with scoreboard, current player, exit confirm and flip cards.
 */
export function renderGameView(
  root: HTMLElement,
  settings: GameSettings,
  snapshot: GameSnapshot,
  callbacks: GameViewCallbacks,
  showExitDialog = false,
): void {
  const theme = THEMES[settings.themeId];
  const currentPlayer = snapshot.players[snapshot.currentPlayerIndex];
  const isLightBoard =
    theme.boardBackground.startsWith('#e') ||
    theme.boardBackground.startsWith('#f');

  root.innerHTML = `
    <section
      class="screen screen--game ${isLightBoard ? 'screen--game-light' : ''}"
      aria-label="Spielfeld"
      style="
        --board-bg: ${theme.boardBackground};
        --shell-bg: ${theme.shellBackground};
        --header-bg: ${theme.headerBackground};
        --card-back: ${theme.cardBackGradient};
        --theme-accent: ${theme.accent};
        --board-text: ${theme.textOnBoard};
      "
    >
      <div class="content-frame">
        <div class="game-shell">
          <header class="game-header">
            <div class="scoreboard" aria-label="Punktestand">
              ${snapshot.players
                .map(
                  (player) => `
                    <div class="scoreboard__item">
                      ${pawnIcon(player.color, 30)}
                      <span class="scoreboard__score">${player.score}</span>
                    </div>
                  `,
                )
                .join('')}
            </div>

            <div class="current-player" aria-live="polite">
              <span>Current player:</span>
              <span class="current-player__badge">
                ${pawnIcon(currentPlayer.color, 26)}
              </span>
            </div>

            <button type="button" class="btn btn--exit" data-action="exit">
              ${exitIcon()}
              <span class="btn--exit__label">Exit game</span>
            </button>
          </header>

          <div
            class="card-grid"
            style="--columns: ${snapshot.columns}; --rows: ${snapshot.rows}"
            role="grid"
            aria-label="Memory-Karten"
          >
            ${snapshot.cards
              .map((card) => {
                const isOpen = card.isFlipped || card.isMatched;
                return `
                  <button
                    type="button"
                    class="memory-card ${isOpen ? 'is-flipped' : ''} ${card.isMatched ? 'is-matched' : ''}"
                    data-card-id="${card.id}"
                    ${card.isMatched || snapshot.isLocked ? 'disabled' : ''}
                    aria-label="Karte ${card.id + 1}"
                  >
                    <span class="memory-card__inner">
                      <span class="memory-card__face memory-card__face--back"></span>
                      <span class="memory-card__face memory-card__face--front">
                        <span class="memory-card__motif">${escapeHtml(card.motif)}</span>
                      </span>
                    </span>
                  </button>
                `;
              })
              .join('')}
          </div>
        </div>
      </div>

      ${
        showExitDialog
          ? `
            <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="exit-title">
              <div class="confirm-modal">
                <h2 id="exit-title">Are you sure you want to exit the game?</h2>
                <div class="confirm-modal__actions">
                  <button type="button" class="btn btn--danger" data-action="exit-confirm">Yes, Exit</button>
                  <button type="button" class="btn btn--ghost-light" data-action="exit-cancel">Cancel</button>
                </div>
              </div>
            </div>
          `
          : ''
      }
    </section>
  `;

  root.querySelector('[data-action="exit"]')?.addEventListener('click', () => {
    callbacks.onExitRequest();
  });

  root.querySelector('[data-action="exit-confirm"]')?.addEventListener('click', () => {
    callbacks.onExitConfirm();
  });

  root.querySelector('[data-action="exit-cancel"]')?.addEventListener('click', () => {
    callbacks.onExitCancel();
  });

  root.querySelectorAll<HTMLButtonElement>('[data-card-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const cardId = Number(button.dataset.cardId);
      soundEffects.playFlip();
      callbacks.onCardClick(cardId);
    });
  });

  if (snapshot.isFinished && !showExitDialog) {
    window.setTimeout(() => {
      callbacks.onFinished(snapshot);
    }, 450);
  }
}
