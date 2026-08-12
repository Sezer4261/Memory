/**
 * Synchronizes settings draft state with controls, summaries, and markers.
 * @module views/settings/sync
 */
import { GRID_LABELS, THEMES } from '../../data/themes';
import type { SettingsSession } from './model';

/**
 * Returns whether every required setting has been selected.
 * @param session - Settings session whose draft is inspected.
 * @returns Whether theme, player, and board size are all selected.
 */
export function isSettingsReady(session: SettingsSession): boolean {
  const { themeId, playerColor, gridSize } = session.draft;
  return themeId !== null && playerColor !== null && gridSize !== null;
}

/**
 * Resets restored controls and initializes selection-dependent UI.
 * @param session - Settings session to initialize.
 * @returns Nothing.
 */
export function initializeSettingsUi(session: SettingsSession): void {
  clearSelections(session);
  syncSummary(session);
  syncStartButton(session);
  syncMarkers(session);
}

/**
 * Clears browser-restored radio, selection, hover, and marker state.
 * @param session - Settings session containing controls to reset.
 * @returns Nothing.
 */
function clearSelections(session: SettingsSession): void {
  const controls = '.settings-options input[type="radio"]';
  session.root.querySelectorAll<HTMLInputElement>(controls).forEach((input) => {
    input.checked = false;
  });
  session.root.querySelectorAll<HTMLElement>('.settings-options .radio-option').forEach((option) => {
    option.classList.remove('is-selected', 'is-hovered', 'show-marker');
  });
}

/**
 * Reflects the draft in the start button.
 * @param session - Settings session containing draft and start button.
 * @returns Nothing.
 */
export function syncStartButton(session: SettingsSession): void {
  const button = session.elements.playButton;
  if (!button) return;
  const ready = isSettingsReady(session);
  button.disabled = !ready;
  button.setAttribute('aria-disabled', ready ? 'false' : 'true');
  button.classList.toggle('is-ready', ready);
}

/**
 * Reflects the draft in all three summary values.
 * @param session - Settings session containing draft and summary elements.
 * @returns Nothing.
 */
export function syncSummary(session: SettingsSession): void {
  syncThemeSummary(session);
  syncPlayerSummary(session);
  syncBoardSummary(session);
}

/**
 * Updates the theme summary or its placeholder.
 * @param session - Settings session containing theme draft state.
 * @returns Nothing.
 */
function syncThemeSummary(session: SettingsSession): void {
  const target = session.root.querySelector<HTMLElement>('[data-summary-theme]');
  if (!target) return;
  const themeId = session.draft.themeId;
  target.textContent = themeId ? THEMES[themeId].shortLabel : 'Game theme';
  target.classList.toggle('is-placeholder', !themeId);
}

/**
 * Updates the player summary or its placeholder.
 * @param session - Settings session containing player draft state.
 * @returns Nothing.
 */
function syncPlayerSummary(session: SettingsSession): void {
  const target = session.root.querySelector<HTMLElement>('[data-summary-player]');
  if (!target) return;
  const color = session.draft.playerColor;
  target.textContent = color ? (color === 'blue' ? 'Blue' : 'Orange') : 'Player';
  target.classList.toggle('is-placeholder', !color);
}

/**
 * Updates the board-size summary or its placeholder.
 * @param session - Settings session containing grid draft state.
 * @returns Nothing.
 */
function syncBoardSummary(session: SettingsSession): void {
  const target = session.root.querySelector<HTMLElement>('[data-summary-board]');
  if (!target) return;
  const size = session.draft.gridSize;
  target.textContent = size ? GRID_LABELS[size] : 'Board size';
  target.classList.toggle('is-placeholder', !size);
}

/**
 * Reflects one selected radio value in its group.
 * @param session - Settings session containing the radio group.
 * @param group - Group data attribute to synchronize.
 * @param value - Input value that should be selected.
 * @returns Nothing.
 */
export function syncSelection(session: SettingsSession, group: string, value: string): void {
  const selector = `[data-group="${group}"] .radio-option`;
  session.root.querySelectorAll<HTMLLabelElement>(selector).forEach((option) => {
    const input = option.querySelector<HTMLInputElement>('input');
    const selected = input?.value === value;
    option.classList.toggle('is-selected', Boolean(selected));
    if (input) input.checked = Boolean(selected);
  });
  syncMarkers(session, group);
}

/**
 * Shows markers for hovered options, falling back to selection.
 * @param session - Settings session containing option groups.
 * @param group - Optional group data attribute to limit synchronization.
 * @returns Nothing.
 */
export function syncMarkers(session: SettingsSession, group?: string): void {
  const selector = group ? `[data-group="${group}"]` : '[data-group]';
  session.root.querySelectorAll<HTMLElement>(selector).forEach(syncGroupMarkers);
}

/**
 * Gives hover precedence over selection when displaying one group marker.
 * @param list - Option group whose marker classes are reconciled.
 * @returns Nothing.
 */
function syncGroupMarkers(list: HTMLElement): void {
  const hovered = list.querySelector<HTMLElement>('.radio-option.is-hovered, .radio-option:hover');
  list.querySelectorAll<HTMLElement>('.radio-option').forEach((option) => {
    const selected = option.classList.contains('is-selected');
    const explicitHover = option.classList.contains('is-hovered');
    const show = hovered ? option === hovered || explicitHover : selected;
    option.classList.toggle('show-marker', show);
  });
}
