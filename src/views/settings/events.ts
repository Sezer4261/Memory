/**
 * Connects settings controls, hover previews, and draft-state updates.
 * @module views/settings/events
 */
import type { GridSize, PlayerColor, ThemeId } from '../../types';
import type { SettingsSession } from './model';
import { applyThemePreview, PREVIEW_FALLBACK_THEME, syncCurrentPlayerBadge } from './preview';
import { isSettingsReady, syncMarkers, syncSelection, syncStartButton, syncSummary } from './sync';

/**
 * Binds settings controls to the draft and public callbacks.
 * @param session - Mutable settings state and cached DOM references.
 * @returns Nothing.
 */
export function bindSettingsEvents(session: SettingsSession): void {
  bindFormEvents(session);
  bindPlayerEvents(session);
  bindGridEvents(session);
  bindThemeEvents(session);
  bindOptionHoverEvents(session);
}

/**
 * Binds form suppression and primary navigation actions.
 * @param session - Settings session containing controls and callbacks.
 * @returns Nothing.
 */
function bindFormEvents(session: SettingsSession): void {
  session.root.querySelector('.settings-options')?.addEventListener('submit', preventSubmit);
  session.root.querySelector('[data-action="back"]')?.addEventListener('click', () => {
    session.callbacks.onBack();
  });
  session.elements.playButton?.addEventListener('click', () => play(session));
}

/**
 * Prevents the settings form from navigating on submission.
 * @param event - Form submission event to cancel.
 * @returns Nothing.
 */
function preventSubmit(event: Event): void {
  event.preventDefault();
}

/**
 * Emits completed settings only when every draft field is selected.
 * @param session - Settings session containing draft and callbacks.
 * @returns Nothing.
 */
function play(session: SettingsSession): void {
  const { themeId, playerColor, gridSize } = session.draft;
  if (!isSettingsReady(session) || !themeId || !playerColor || !gridSize) return;
  session.callbacks.onPlay({ themeId, playerColor, gridSize });
}

/**
 * Binds player radio changes to draft selection.
 * @param session - Settings session containing player controls.
 * @returns Nothing.
 */
function bindPlayerEvents(session: SettingsSession): void {
  const selector = `input[name="${session.names.player}"]`;
  session.root.querySelectorAll<HTMLInputElement>(selector).forEach((input) => {
    input.addEventListener('change', () => selectPlayer(session, input.value as PlayerColor));
  });
}

/**
 * Commits a player color and synchronizes dependent UI.
 * @param session - Settings session to update.
 * @param playerColor - Selected player color.
 * @returns Nothing.
 */
function selectPlayer(session: SettingsSession, playerColor: PlayerColor): void {
  session.draft = { ...session.draft, playerColor };
  syncSelection(session, 'player', playerColor);
  syncCurrentPlayerBadge(session);
  syncSummary(session);
  syncStartButton(session);
}

/**
 * Binds board-size radio changes to draft selection.
 * @param session - Settings session containing grid controls.
 * @returns Nothing.
 */
function bindGridEvents(session: SettingsSession): void {
  const selector = `input[name="${session.names.grid}"]`;
  session.root.querySelectorAll<HTMLInputElement>(selector).forEach((input) => {
    input.addEventListener('change', () => selectGrid(session, input.value as GridSize));
  });
}

/**
 * Commits a grid size and synchronizes dependent UI.
 * @param session - Settings session to update.
 * @param gridSize - Selected board dimensions.
 * @returns Nothing.
 */
function selectGrid(session: SettingsSession, gridSize: GridSize): void {
  session.draft = { ...session.draft, gridSize };
  syncSelection(session, 'grid', gridSize);
  syncSummary(session);
  syncStartButton(session);
}

/**
 * Binds theme changes and temporary theme hover previews.
 * @param session - Settings session containing theme controls.
 * @returns Nothing.
 */
function bindThemeEvents(session: SettingsSession): void {
  const selector = `input[name="${session.names.theme}"]`;
  session.root.querySelectorAll<HTMLInputElement>(selector).forEach((input) => {
    input.addEventListener('change', () => selectTheme(session, input.value as ThemeId));
  });
  bindThemeHoverEvents(session);
}

/**
 * Commits a theme and synchronizes preview and summary state.
 * @param session - Settings session to update.
 * @param themeId - Selected theme identifier.
 * @returns Nothing.
 */
function selectTheme(session: SettingsSession, themeId: ThemeId): void {
  session.draft = { ...session.draft, themeId };
  syncSelection(session, 'theme', themeId);
  applyThemePreview(session, themeId);
  syncSummary(session);
  syncStartButton(session);
}

/**
 * Previews hovered themes and restores the committed theme on list exit.
 * @param session - Settings session containing theme options.
 * @returns Nothing.
 */
function bindThemeHoverEvents(session: SettingsSession): void {
  session.elements.themeList?.querySelectorAll<HTMLElement>('[data-theme-option]').forEach((option) => {
    option.addEventListener('mouseenter', () => previewThemeOption(session, option));
  });
  session.elements.themeList?.addEventListener('mouseleave', () => {
    applyThemePreview(session, session.draft.themeId ?? PREVIEW_FALLBACK_THEME);
  });
}

/**
 * Applies a temporary preview for one hovered theme option.
 * @param session - Settings session to preview.
 * @param option - Theme option carrying its theme data attribute.
 * @returns Nothing.
 */
function previewThemeOption(session: SettingsSession, option: HTMLElement): void {
  const themeId = option.dataset.themeOption as ThemeId | undefined;
  if (themeId) applyThemePreview(session, themeId, true);
}

/**
 * Binds explicit hover state for player and grid options.
 * @param session - Settings session containing radio options.
 * @returns Nothing.
 */
function bindOptionHoverEvents(session: SettingsSession): void {
  const selector = '[data-group="player"] .radio-option, [data-group="grid"] .radio-option';
  session.root.querySelectorAll<HTMLElement>(selector).forEach((option) => {
    option.addEventListener('mouseenter', () => setOptionHover(session, option, true));
    option.addEventListener('mouseleave', () => setOptionHover(session, option, false));
  });
}

/**
 * Isolates hover styling to one option and refreshes group markers.
 * @param session - Settings session containing the option group.
 * @param option - Option whose hover state changed.
 * @param active - Whether the option is entering or leaving hover.
 * @returns Nothing.
 */
function setOptionHover(session: SettingsSession, option: HTMLElement, active: boolean): void {
  const list = option.closest<HTMLElement>('[data-group]');
  list?.querySelectorAll('.radio-option').forEach((entry) => {
    entry.classList.toggle('is-hovered', active && entry === option);
  });
  syncMarkers(session, list?.dataset.group);
}
