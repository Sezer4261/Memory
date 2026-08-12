/**
 * Defers the finished-game callback until the final card animation completes.
 * @module views/game/finish
 */
import type { GameSnapshot } from '../../types';
import type { GameViewCallbacks } from '../GameView';

/**
 * Schedules the result transition once the final card animation can finish.
 * @param root - Host containing the active game screen.
 * @param snapshot - Current state forwarded unchanged on completion.
 * @param callbacks - Game callbacks receiving the finished state.
 * @param showExitDialog - Whether an exit dialog currently blocks completion.
 * @returns Nothing.
 */
export function scheduleFinished(
  root: HTMLElement,
  snapshot: GameSnapshot,
  callbacks: GameViewCallbacks,
  showExitDialog: boolean,
): void {
  const screen = root.querySelector<HTMLElement>('.screen--game');
  if (!canSchedule(screen, snapshot, showExitDialog)) return;
  screen.dataset.finishedScheduled = '1';
  // Keep the result timer behind the final 450 ms card transition.
  window.setTimeout(() => callbacks.onFinished(snapshot), 450);
}

/**
 * Checks whether completion is eligible and has not already been scheduled.
 * @param screen - Active game screen, if mounted.
 * @param snapshot - Current game state.
 * @param showExitDialog - Whether exit confirmation is visible.
 * @returns Whether `screen` can safely own a new completion timer.
 */
function canSchedule(
  screen: HTMLElement | null,
  snapshot: GameSnapshot,
  showExitDialog: boolean,
): screen is HTMLElement {
  if (!screen || !snapshot.isFinished || showExitDialog) return false;
  return screen.dataset.finishedScheduled !== '1';
}
