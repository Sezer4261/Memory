/**
 * Patches a compatible game screen while preserving card DOM and transitions.
 * @module views/game/sync
 */
import { THEMES } from '../../data/themes';
import type { CardData, GameSettings, GameSnapshot, ThemeDefinition } from '../../types';
import type { GameViewCallbacks } from '../GameView';
import { closeExitDialog, openExitDialog } from './exitDialog';
import { scheduleFinished } from './finish';
import { renderCurrentPlayer, renderScoreboard } from './template';

/**
 * Finds a compatible board that can be patched in place.
 * @param root - Host containing a possible game screen.
 * @param settings - Settings whose theme must match the mounted screen.
 * @param snapshot - State whose grid dimensions must match the mounted board.
 * @returns The compatible game screen, or `null` when a remount is required.
 */
export function findPatchableScreen(
  root: HTMLElement,
  settings: GameSettings,
  snapshot: GameSnapshot,
): HTMLElement | null {
  const screen = root.querySelector<HTMLElement>('.screen--game');
  if (!screen || screen.dataset.themeId !== settings.themeId) return null;
  return screen.dataset.grid === `${snapshot.columns}x${snapshot.rows}` ? screen : null;
}

/**
 * Patches state without remounting card nodes, preserving flip transitions.
 * @param root - Host containing the mounted game screen.
 * @param screen - Compatible screen to patch in place.
 * @param settings - Current theme and board settings.
 * @param snapshot - Latest game state.
 * @param callbacks - Actions needed by dialog and finish synchronization.
 * @param showExitDialog - Whether exit confirmation should be visible.
 * @returns Nothing.
 */
export function syncGameView(
  root: HTMLElement,
  screen: HTMLElement,
  settings: GameSettings,
  snapshot: GameSnapshot,
  callbacks: GameViewCallbacks,
  showExitDialog: boolean,
): void {
  syncTheme(screen, THEMES[settings.themeId]);
  syncHeader(screen, snapshot);
  snapshot.cards.forEach((card) => syncCard(screen, card, snapshot.isLocked));
  syncDialog(root, screen, callbacks, showExitDialog);
  scheduleFinished(root, snapshot, callbacks, showExitDialog);
}

/**
 * Applies theme variables and light-mode classes to the mounted screen.
 * @param screen - Game screen receiving theme state.
 * @param theme - Theme definition to apply.
 * @returns Nothing.
 */
function syncTheme(screen: HTMLElement, theme: ThemeDefinition): void {
  syncBoardStyles(screen, theme);
  syncCardStyles(screen, theme);
  const exitBackground = theme.id !== 'code' ? theme.accent : '#2f2f2f';
  screen.style.setProperty('--exit-bg', exitBackground);
  screen.style.setProperty('--exit-fg', '#ffffff');
  screen.classList.toggle('screen--game-light', theme.id === 'da' || theme.id === 'food');
}

/**
 * Updates board, shell, header, accent, and text variables.
 * @param screen - Game screen receiving board variables.
 * @param theme - Source theme definition.
 * @returns Nothing.
 */
function syncBoardStyles(screen: HTMLElement, theme: ThemeDefinition): void {
  screen.style.setProperty('--board-bg', theme.boardBackground);
  screen.style.setProperty('--shell-bg', theme.shellBackground);
  screen.style.setProperty('--header-bg', theme.headerBackground);
  screen.style.setProperty('--theme-accent', theme.accent);
  screen.style.setProperty('--board-text', theme.textOnBoard);
}

/**
 * Updates card face, back, and radius variables.
 * @param screen - Game screen receiving card variables.
 * @param theme - Source theme definition.
 * @returns Nothing.
 */
function syncCardStyles(screen: HTMLElement, theme: ThemeDefinition): void {
  screen.style.setProperty('--card-back', theme.cardBackGradient);
  screen.style.setProperty('--card-front', theme.cardFront ?? '#ffffff');
  screen.style.setProperty('--card-radius', theme.cardRadius ?? '10px');
}

/**
 * Replaces score and current-player content without rebuilding the header.
 * @param screen - Mounted game screen.
 * @param snapshot - State supplying scores and current player.
 * @returns Nothing.
 */
function syncHeader(screen: HTMLElement, snapshot: GameSnapshot): void {
  const scoreboard = screen.querySelector<HTMLElement>('[data-scoreboard]');
  if (scoreboard) scoreboard.innerHTML = renderScoreboard(snapshot);
  const current = screen.querySelector<HTMLElement>('[data-current-player]');
  const player = snapshot.players[snapshot.currentPlayerIndex];
  if (current) current.innerHTML = renderCurrentPlayer(player.color);
}

/**
 * Patches one existing card's visual and disabled state.
 * @param screen - Mounted game screen containing the card.
 * @param card - Latest state for the card.
 * @param locked - Whether all unmatched cards must reject input.
 * @returns Nothing.
 */
function syncCard(screen: HTMLElement, card: CardData, locked: boolean): void {
  const button = screen.querySelector<HTMLButtonElement>(`[data-card-id="${card.id}"]`);
  if (!button) return;
  const shouldOpen = card.isFlipped || card.isMatched;
  button.classList.toggle('is-flipped', shouldOpen);
  button.classList.toggle('is-matched', card.isMatched);
  button.disabled = card.isMatched || locked;
}

/**
 * Reconciles exit-dialog presence with application state.
 * @param root - Host used when opening a new dialog.
 * @param screen - Game screen containing an existing dialog, if any.
 * @param callbacks - Exit actions bound when opening.
 * @param show - Whether the dialog should exist.
 * @returns Nothing.
 */
function syncDialog(
  root: HTMLElement,
  screen: HTMLElement,
  callbacks: GameViewCallbacks,
  show: boolean,
): void {
  const dialog = screen.querySelector<HTMLDialogElement>('dialog.confirm-modal');
  if (show && !dialog) openExitDialog(root, callbacks);
  if (!show && dialog) closeExitDialog(dialog);
}
