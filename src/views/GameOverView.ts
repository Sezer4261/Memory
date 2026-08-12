/**
 * Coordinates the score and result phases of the game-over view.
 * @module views/GameOverView
 */
import type { GameSettings, GameSnapshot } from '../types';
import { bindGameOverEvents } from './gameover/events';
import { renderResultPhase } from './gameover/result';
import { renderScorePhase } from './gameover/score';

/** Identifies the visible phase of the two-step game-over sequence. */
export type GameOverPhase = 'score' | 'result';

/** Navigation actions emitted by score and result screens. */
export interface GameOverViewCallbacks {
  /** Advances from the score phase to the result phase. */
  onContinue: () => void;
  /** Starts another game with the current settings. */
  onReplay: () => void;
  /** Returns to the home screen. */
  onHome: () => void;
}

/**
 * Orchestrates the final score and winner/draw phases.
 * @param root - Host element that receives the active phase.
 * @param settings - Settings used by the completed game.
 * @param snapshot - Final game state used to render scores and results.
 * @param phase - Phase to display.
 * @param callbacks - Navigation actions for the rendered controls.
 * @returns The score-phase timer ID, or `null` when rendering results.
 */
export function renderGameOverView(
  root: HTMLElement,
  settings: GameSettings,
  snapshot: GameSnapshot,
  phase: GameOverPhase,
  callbacks: GameOverViewCallbacks,
): number | null {
  if (phase === 'score') return renderScorePhase(root, settings, snapshot, callbacks);
  root.innerHTML = renderResultPhase(settings.themeId, snapshot);
  bindGameOverEvents(root, callbacks);
  return null;
}
