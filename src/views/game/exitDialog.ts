/**
 * Renders, opens, closes, and binds the in-game exit confirmation dialog.
 * @module views/game/exitDialog
 */
import type { GameViewCallbacks } from '../GameView';

/**
 * Opens the exit confirmation once and binds its actions.
 * @param root - Host containing the active game screen.
 * @param callbacks - Exit actions emitted by the dialog controls.
 * @returns Nothing.
 */
export function openExitDialog(root: HTMLElement, callbacks: GameViewCallbacks): void {
  const screen = root.querySelector('.screen--game');
  if (!screen || screen.querySelector('dialog.confirm-modal')) return;
  screen.insertAdjacentHTML('beforeend', renderExitDialog());
  const dialog = screen.querySelector<HTMLDialogElement>('dialog.confirm-modal');
  dialog?.showModal();
  bindExitDialogEvents(dialog ?? screen, callbacks);
}

/**
 * Removes the exit dialog when the state no longer requests it.
 * @param dialog - Open confirmation dialog to close and detach.
 * @returns Nothing.
 */
export function closeExitDialog(dialog: HTMLDialogElement): void {
  dialog.close();
  dialog.remove();
}

/**
 * Binds confirm and cancel controls within a scope.
 * @param scope - Dialog or game subtree containing exit controls.
 * @param callbacks - Exit actions invoked by those controls.
 * @returns Nothing.
 */
export function bindExitDialogEvents(scope: ParentNode, callbacks: GameViewCallbacks): void {
  scope.querySelector('[data-action="exit-confirm"]')?.addEventListener('click', () => {
    callbacks.onExitConfirm();
  });
  scope.querySelector('[data-action="exit-cancel"]')?.addEventListener('click', () => {
    callbacks.onExitCancel();
  });
}

/**
 * Creates the exit confirmation markup.
 * @returns Dialog markup with stable action attributes.
 */
function renderExitDialog(): string {
  return `<dialog class="confirm-modal" aria-labelledby="exit-title">
    <h2 id="exit-title">Are you sure you want<br />to quit the game?</h2>
    <menu class="confirm-modal__actions">
      <button type="button" class="btn btn--confirm-fill" data-action="exit-cancel">No, back to game</button>
      <button type="button" class="btn btn--confirm-outline" data-action="exit-confirm">Exit game</button>
    </menu>
  </dialog>`;
}
