/**
 * Mounts and incrementally synchronizes the active Memory game view.
 * @module views/GameView
 */
import type { GameSettings, GameSnapshot } from '../types';
import { mountGameView } from './game/mount';
import { findPatchableScreen, syncGameView } from './game/sync';

/** Actions emitted by the playfield and its exit dialog. */
export interface GameViewCallbacks {
  /** Requests that the exit confirmation be shown. */
  onExitRequest: () => void;
  /** Confirms leaving the active game. */
  onExitConfirm: () => void;
  /** Cancels leaving and resumes the active game. */
  onExitCancel: () => void;
  /** Selects a card by its stable game-state identifier. */
  onCardClick: (cardId: number) => void;
  /** Reports the final snapshot after the last flip animation. */
  onFinished: (snapshot: GameSnapshot) => void;
}

/**
 * Renders or incrementally updates the active Memory playfield.
 * Compatible boards are patched to preserve card flip animations.
 * @param root - Host element for the game screen.
 * @param settings - Theme and board settings for the game.
 * @param snapshot - Current game state to mount or patch.
 * @param callbacks - Actions emitted by game controls.
 * @param showExitDialog - Whether the exit confirmation must be visible.
 * @returns Nothing.
 */
export function renderGameView(
  root: HTMLElement,
  settings: GameSettings,
  snapshot: GameSnapshot,
  callbacks: GameViewCallbacks,
  showExitDialog = false,
): void {
  const screen = findPatchableScreen(root, settings, snapshot);
  if (screen) {
    syncGameView(root, screen, settings, snapshot, callbacks, showExitDialog);
    return;
  }
  mountGameView(root, settings, snapshot, callbacks, showExitDialog);
}
