/**
 * Performs a full mount of the active game screen and its behavior.
 * @module views/game/mount
 */
import type { GameSettings, GameSnapshot } from '../../types';
import type { GameViewCallbacks } from '../GameView';
import { bindGameEvents } from './events';
import { openExitDialog } from './exitDialog';
import { scheduleFinished } from './finish';
import { renderGameTemplate } from './template';

/**
 * Mounts a fresh board and installs its event handlers.
 * @param root - Host element that receives the game template.
 * @param settings - Theme and board settings for this game.
 * @param snapshot - State used to construct the initial board.
 * @param callbacks - Actions emitted by mounted controls.
 * @param showExitDialog - Whether to open exit confirmation immediately.
 * @returns Nothing.
 */
export function mountGameView(
  root: HTMLElement,
  settings: GameSettings,
  snapshot: GameSnapshot,
  callbacks: GameViewCallbacks,
  showExitDialog: boolean,
): void {
  root.innerHTML = renderGameTemplate(settings, snapshot);
  if (showExitDialog) openExitDialog(root, callbacks);
  bindGameEvents(root, callbacks);
  scheduleFinished(root, snapshot, callbacks, showExitDialog);
}
