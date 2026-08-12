/**
 * Binds user input from a freshly mounted game board.
 * @module views/game/events
 */
import { soundEffects } from '../../utils/sound';
import type { GameViewCallbacks } from '../GameView';
import { bindExitDialogEvents } from './exitDialog';

/**
 * Binds playfield actions after a full board mount.
 * @param root - Host containing the mounted game controls.
 * @param callbacks - Actions to invoke for exit and card input.
 * @returns Nothing.
 */
export function bindGameEvents(root: HTMLElement, callbacks: GameViewCallbacks): void {
  root.querySelector('[data-action="exit"]')?.addEventListener('click', () => {
    callbacks.onExitRequest();
  });
  bindExitDialogEvents(root, callbacks);
  root.querySelectorAll<HTMLButtonElement>('[data-card-id]').forEach((button) => {
    button.addEventListener('click', () => handleCardClick(button, callbacks));
  });
}

/**
 * Plays the flip sound before forwarding a card selection.
 * @param button - Card button carrying the numeric card identifier.
 * @param callbacks - Game actions receiving the selection.
 * @returns Nothing.
 */
function handleCardClick(button: HTMLButtonElement, callbacks: GameViewCallbacks): void {
  const cardId = Number(button.dataset.cardId);
  soundEffects.playFlip();
  callbacks.onCardClick(cardId);
}
