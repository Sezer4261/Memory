/**
 * Binds navigation controls on the game-over result screen.
 * @module views/gameover/events
 */
import type { GameOverViewCallbacks } from '../GameOverView';

/**
 * Binds result actions exposed by the game-over view.
 * @param root - Host containing result-screen controls.
 * @param callbacks - Navigation actions invoked by those controls.
 * @returns Nothing.
 */
export function bindGameOverEvents(root: HTMLElement, callbacks: GameOverViewCallbacks): void {
  root.querySelector('[data-action="home"]')?.addEventListener('click', () => {
    callbacks.onHome();
  });
  root.querySelector('[data-action="replay"]')?.addEventListener('click', () => {
    callbacks.onReplay();
  });
}
