import { exitIcon, pawnIcon } from '../components/icons';
import { renderMotif } from '../data/motifs';
import { THEMES } from '../data/themes';
import type { GameSettings, GameSnapshot } from '../types';
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
 * Reuses the board DOM on updates so CSS flip transitions can run.
 */
export function renderGameView(
  root: HTMLElement,
  settings: GameSettings,
  snapshot: GameSnapshot,
  callbacks: GameViewCallbacks,
  showExitDialog = false,
): void {
  const screen = root.querySelector<HTMLElement>('.screen--game');
  const canPatch =
    Boolean(screen) &&
    screen?.dataset.themeId === settings.themeId &&
    screen?.dataset.grid === `${snapshot.columns}x${snapshot.rows}`;

  if (canPatch && screen) {
    syncGameView(root, screen, settings, snapshot, callbacks, showExitDialog);
    return;
  }

  mountGameView(root, settings, snapshot, callbacks, showExitDialog);
}

function mountGameView(
  root: HTMLElement,
  settings: GameSettings,
  snapshot: GameSnapshot,
  callbacks: GameViewCallbacks,
  showExitDialog: boolean,
): void {
  const theme = THEMES[settings.themeId];
  const currentPlayer = snapshot.players[snapshot.currentPlayerIndex];
  const isLightBoard = theme.id === 'da' || theme.id === 'food';
  const exitFilled = theme.id !== 'code';

  root.innerHTML = `
    <section
      class="screen screen--game ${isLightBoard ? 'screen--game-light' : ''}"
      aria-label="Spielfeld"
      data-theme-id="${settings.themeId}"
      data-grid="${snapshot.columns}x${snapshot.rows}"
      style="
        --board-bg: ${theme.boardBackground};
        --shell-bg: ${theme.shellBackground};
        --header-bg: ${theme.headerBackground};
        --card-back: ${theme.cardBackGradient};
        --card-front: ${theme.cardFront ?? '#ffffff'};
        --motif-size: ${theme.motifSize ?? '58%'};
        --card-radius: ${theme.cardRadius ?? '10px'};
        --theme-accent: ${theme.accent};
        --board-text: ${theme.textOnBoard};
        --exit-bg: ${exitFilled ? theme.accent : '#2f2f2f'};
        --exit-fg: #ffffff;
      "
    >
      <header class="game-header">
        <ul class="scoreboard" aria-label="Punktestand" data-scoreboard>
          ${renderScoreboard(snapshot)}
        </ul>

        <p class="current-player" aria-live="polite" data-current-player>
          ${renderCurrentPlayer(currentPlayer.color)}
        </p>

        <button type="button" class="btn btn--exit" data-action="exit">
          ${exitIcon()}
          <span class="btn--exit__label">Exit game</span>
        </button>
      </header>

      <main
        class="card-grid"
        style="--columns: ${snapshot.columns}; --rows: ${snapshot.rows}"
        aria-label="Memory-Karten"
        data-card-grid
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
                  <span class="memory-card__face memory-card__face--back">
                    ${
                      theme.cardBackMotif
                        ? `<span class="memory-card__back-motif">${renderMotif(theme.cardBackMotif)}</span>`
                        : ''
                    }
                  </span>
                  <span class="memory-card__face memory-card__face--front">
                    <span class="memory-card__motif">${renderMotif(card.motif)}</span>
                  </span>
                </span>
              </button>
            `;
          })
          .join('')}
      </main>
    </section>
  `;

  if (showExitDialog) {
    openExitDialog(root, callbacks);
  }

  bindGameEvents(root, callbacks);
  scheduleFinished(root, snapshot, callbacks, showExitDialog);
}

function syncGameView(
  root: HTMLElement,
  screen: HTMLElement,
  settings: GameSettings,
  snapshot: GameSnapshot,
  callbacks: GameViewCallbacks,
  showExitDialog: boolean,
): void {
  const theme = THEMES[settings.themeId];
  const currentPlayer = snapshot.players[snapshot.currentPlayerIndex];

  screen.style.setProperty('--board-bg', theme.boardBackground);
  screen.style.setProperty('--shell-bg', theme.shellBackground);
  screen.style.setProperty('--header-bg', theme.headerBackground);
  screen.style.setProperty('--card-back', theme.cardBackGradient);
  screen.style.setProperty('--card-front', theme.cardFront ?? '#ffffff');
  screen.style.setProperty('--motif-size', theme.motifSize ?? '58%');
  screen.style.setProperty('--card-radius', theme.cardRadius ?? '10px');
  screen.style.setProperty('--theme-accent', theme.accent);
  screen.style.setProperty('--board-text', theme.textOnBoard);
  const exitFilled = theme.id !== 'code';
  screen.style.setProperty('--exit-bg', exitFilled ? theme.accent : '#2f2f2f');
  screen.style.setProperty('--exit-fg', '#ffffff');
  screen.classList.toggle('screen--game-light', theme.id === 'da' || theme.id === 'food');

  const scoreboard = screen.querySelector<HTMLElement>('[data-scoreboard]');
  if (scoreboard) {
    scoreboard.innerHTML = renderScoreboard(snapshot);
  }

  const current = screen.querySelector<HTMLElement>('[data-current-player]');
  if (current) {
    current.innerHTML = renderCurrentPlayer(currentPlayer.color);
  }

  snapshot.cards.forEach((card) => {
    const button = screen.querySelector<HTMLButtonElement>(
      `[data-card-id="${card.id}"]`,
    );
    if (!button) {
      return;
    }

    const shouldOpen = card.isFlipped || card.isMatched;
    button.classList.toggle('is-flipped', shouldOpen);
    button.classList.toggle('is-matched', card.isMatched);
    button.disabled = card.isMatched || snapshot.isLocked;
  });

  const existingDialog = screen.querySelector<HTMLDialogElement>('dialog.confirm-modal');
  if (showExitDialog && !existingDialog) {
    openExitDialog(root, callbacks);
  } else if (!showExitDialog && existingDialog) {
    existingDialog.close();
    existingDialog.remove();
  }

  scheduleFinished(root, snapshot, callbacks, showExitDialog);
}

function renderScoreboard(snapshot: GameSnapshot): string {
  return snapshot.players
    .map(
      (player) => `
        <li class="scoreboard__item scoreboard__item--${player.color}">
          ${pawnIcon(player.color, 22)}
          <span class="scoreboard__score">${player.score}</span>
        </li>
      `,
    )
    .join('');
}

function renderCurrentPlayer(color: 'blue' | 'orange'): string {
  return `
    <span>Current player:</span>
    <span class="current-player__badge current-player__badge--${color}">
      ${pawnIcon('white', 16)}
    </span>
  `;
}

function openExitDialog(root: HTMLElement, callbacks: GameViewCallbacks): void {
  const screen = root.querySelector('.screen--game');
  if (!screen || screen.querySelector('dialog.confirm-modal')) {
    return;
  }

  screen.insertAdjacentHTML(
    'beforeend',
    `
      <dialog class="confirm-modal" aria-labelledby="exit-title">
        <h2 id="exit-title">Are you sure you want<br />to quit the game?</h2>
        <menu class="confirm-modal__actions">
          <button type="button" class="btn btn--confirm-fill" data-action="exit-cancel">No, back to game</button>
          <button type="button" class="btn btn--confirm-outline" data-action="exit-confirm">Exit game</button>
        </menu>
      </dialog>
    `,
  );

  const dialog = screen.querySelector<HTMLDialogElement>('dialog.confirm-modal');
  dialog?.showModal();
  bindExitDialogEvents(dialog ?? screen, callbacks);
}

function bindGameEvents(root: HTMLElement, callbacks: GameViewCallbacks): void {
  root.querySelector('[data-action="exit"]')?.addEventListener('click', () => {
    callbacks.onExitRequest();
  });

  bindExitDialogEvents(root, callbacks);

  root.querySelectorAll<HTMLButtonElement>('[data-card-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const cardId = Number(button.dataset.cardId);
      soundEffects.playFlip();
      callbacks.onCardClick(cardId);
    });
  });
}

function bindExitDialogEvents(
  scope: ParentNode,
  callbacks: GameViewCallbacks,
): void {
  scope.querySelector('[data-action="exit-confirm"]')?.addEventListener('click', () => {
    callbacks.onExitConfirm();
  });

  scope.querySelector('[data-action="exit-cancel"]')?.addEventListener('click', () => {
    callbacks.onExitCancel();
  });
}

function scheduleFinished(
  root: HTMLElement,
  snapshot: GameSnapshot,
  callbacks: GameViewCallbacks,
  showExitDialog: boolean,
): void {
  const screen = root.querySelector<HTMLElement>('.screen--game');
  if (!screen || !snapshot.isFinished || showExitDialog) {
    return;
  }

  if (screen.dataset.finishedScheduled === '1') {
    return;
  }

  screen.dataset.finishedScheduled = '1';
  window.setTimeout(() => {
    callbacks.onFinished(snapshot);
  }, 450);
}
