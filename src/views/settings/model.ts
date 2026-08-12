/**
 * Defines and constructs the mutable state shared by settings modules.
 * @module views/settings/model
 */
import type { GridSize, PlayerColor, ThemeId } from '../../types';
import type { SettingsViewCallbacks } from '../SettingsView';

/** Uncommitted choices for one settings visit. */
export interface SettingsDraft {
  /** Selected theme, or `null` before a choice is made. */
  themeId: ThemeId | null;
  /** Selected player color, or `null` before a choice is made. */
  playerColor: PlayerColor | null;
  /** Selected board size, or `null` before a choice is made. */
  gridSize: GridSize | null;
}

/** Per-render radio group names. */
export interface SettingsFieldNames {
  /** Unique name for the theme radio group. */
  theme: string;
  /** Unique name for the player radio group. */
  player: string;
  /** Unique name for the board-size radio group. */
  grid: string;
}

/** Cached settings elements used by sync modules. */
export interface SettingsElements {
  /** Mounted settings screen. */
  screen: HTMLElement | null;
  /** Button that starts a configured game. */
  playButton: HTMLButtonElement | null;
  /** Front-card motif in the live preview. */
  previewMotif: HTMLElement | null;
  /** Back-card motif in the live preview. */
  previewBackMotif: HTMLElement | null;
  /** Current-player badge in the live preview. */
  previewCurrent: HTMLElement | null;
  /** Theme option group used for hover handling. */
  themeList: HTMLElement | null;
}

/** Shared state passed through settings modules. */
export interface SettingsSession {
  /** Host element containing the settings screen. */
  root: HTMLElement;
  /** Navigation and play actions owned by the parent view. */
  callbacks: SettingsViewCallbacks;
  /** Unique field names generated for this render. */
  names: SettingsFieldNames;
  /** Mutable, uncommitted settings choices. */
  draft: SettingsDraft;
  /** Cached elements used by preview and sync helpers. */
  elements: SettingsElements;
}

/**
 * Creates the mutable state for a settings render.
 * @param root - Host containing the mounted settings template.
 * @param callbacks - Navigation and completed-selection actions.
 * @param names - Unique field names generated for this render.
 * @returns A new settings session with an empty draft and cached elements.
 */
export function createSettingsSession(
  root: HTMLElement,
  callbacks: SettingsViewCallbacks,
  names: SettingsFieldNames,
): SettingsSession {
  return { root, callbacks, names, draft: emptyDraft(), elements: queryElements(root) };
}

/**
 * Creates a draft in which no required option is selected.
 * @returns Empty settings draft.
 */
function emptyDraft(): SettingsDraft {
  return { themeId: null, playerColor: null, gridSize: null };
}

/**
 * Caches elements shared by settings synchronization modules.
 * @param root - Host containing the mounted settings template.
 * @returns Nullable references to settings UI elements.
 */
function queryElements(root: HTMLElement): SettingsElements {
  return {
    screen: root.querySelector('.screen--settings'),
    playButton: root.querySelector('[data-action="play"]'),
    previewMotif: root.querySelector('[data-preview-motif]'),
    previewBackMotif: root.querySelector('[data-preview-back-motif]'),
    previewCurrent: root.querySelector('[data-preview-current]'),
    themeList: root.querySelector('[data-group="theme"]'),
  };
}
