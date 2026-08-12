/**
 * Composes the settings template, session state, preview, and event bindings.
 * @module views/SettingsView
 */
import type { GameSettings } from '../types';
import { bindSettingsEvents } from './settings/events';
import { createSettingsSession } from './settings/model';
import { applyThemePreview, PREVIEW_FALLBACK_THEME, syncCurrentPlayerBadge } from './settings/preview';
import { initializeSettingsUi } from './settings/sync';
import { renderSettingsTemplate } from './settings/template';

/** Navigation and completed-selection actions emitted by settings. */
export interface SettingsViewCallbacks {
  /** Returns to the preceding screen without starting a game. */
  onBack: () => void;
  /** Starts a game with the completed settings selection. */
  onPlay: (settings: GameSettings) => void;
}

/**
 * Mounts the settings flow with an empty draft and live theme preview.
 * @param root - Host element that receives the settings screen.
 * @param _initialSettings - Reserved initial settings supplied by the caller.
 * @param callbacks - Navigation and start actions for the settings flow.
 * @returns Nothing.
 */
export function renderSettingsView(
  root: HTMLElement,
  _initialSettings: GameSettings,
  callbacks: SettingsViewCallbacks,
): void {
  const names = renderSettingsTemplate(root);
  const session = createSettingsSession(root, callbacks, names);
  initializeSettingsUi(session);
  applyThemePreview(session, PREVIEW_FALLBACK_THEME);
  syncCurrentPlayerBadge(session);
  bindSettingsEvents(session);
}
