/**
 * Produces settings controls, preview, summary, and action-bar markup.
 * @module views/settings/template
 */
import { exitIcon, pawnIcon, playIcon, settingsSectionIcon } from '../../components/icons';
import { renderMotif } from '../../data/motifs';
import { GRID_LABELS, THEMES } from '../../data/themes';
import type { GridSize, PlayerColor } from '../../types';
import type { SettingsFieldNames } from './model';
import { PREVIEW_FALLBACK_THEME } from './preview';

/** Board sizes shown in settings display order. */
const GRID_OPTIONS: GridSize[] = ['4x4', '4x6', '6x6'];
/** Player colors shown in settings display order. */
const PLAYER_OPTIONS: PlayerColor[] = ['blue', 'orange'];
/** Theme definition used to seed preview markup and styles. */
const previewTheme = THEMES[PREVIEW_FALLBACK_THEME];

/**
 * Mounts the settings DOM and returns this visit's field names.
 * @param root - Host element that receives the settings screen.
 * @returns Unique radio-group names used by this render.
 */
export function renderSettingsTemplate(root: HTMLElement): SettingsFieldNames {
  const names = createFieldNames();
  root.innerHTML = renderScreen(names);
  return names;
}

/**
 * Generates radio names unique to the current settings visit.
 * @returns Names for theme, player, and grid radio groups.
 */
function createFieldNames(): SettingsFieldNames {
  // Unique radio names prevent browsers restoring choices from a previous visit.
  const fieldId = `settings-${Date.now().toString(36)}`;
  return {
    theme: `${fieldId}-theme`,
    player: `${fieldId}-player`,
    grid: `${fieldId}-grid`,
  };
}

/**
 * Composes the complete settings screen.
 * @param names - Unique radio-group names for this render.
 * @returns Settings-screen markup.
 */
function renderScreen(names: SettingsFieldNames): string {
  return `<section class="screen screen--settings" aria-label="Spieleinstellungen" style="${previewStyle()}">
    <article class="settings-modal settings-modal--enter" role="dialog" aria-modal="true" aria-labelledby="settings-title">
      ${renderModalHeader()}${renderOptions(names)}${renderPreview()}
    </article>
  </section>`;
}

/**
 * Serializes fallback theme values as preview CSS properties.
 * @returns Initial inline style declaration for the preview.
 */
function previewStyle(): string {
  return `--preview-back: ${previewTheme.cardBackGradient}; --preview-front: ${previewTheme.cardFront ?? '#ffffff'}; --preview-board: ${previewTheme.boardBackground}; --preview-header: ${previewTheme.headerBackground}; --preview-text: ${previewTheme.textOnBoard}; --preview-accent: ${previewTheme.accent}; --preview-motif-size: ${previewTheme.motifSize ?? '58%'}; --preview-card-radius: ${previewTheme.cardRadius ?? '10px'}; --preview-card-aspect: ${previewTheme.cardAspect ?? '1 / 1'}`;
}

/**
 * Renders the settings title and back action.
 * @returns Settings modal-header markup.
 */
function renderModalHeader(): string {
  return `<header class="settings-modal__header settings-anim settings-anim--1">
    <h1 id="settings-title" class="settings-title">Settings</h1>
    <button type="button" class="btn btn--text" data-action="back">Startseite</button>
  </header>`;
}

/**
 * Renders all settings option groups.
 * @param names - Unique names assigned to each radio group.
 * @returns Settings form markup.
 */
function renderOptions(names: SettingsFieldNames): string {
  return `<form class="settings-options settings-anim settings-anim--2" aria-label="Spieleinstellungen" autocomplete="off">
    ${renderThemeGroup(names.theme)}
    ${renderPlayerGroup(names.player)}
    ${renderGridGroup(names.grid)}
  </form>`;
}

/**
 * Renders all available theme choices.
 * @param name - Shared radio name for theme inputs.
 * @returns Theme fieldset markup.
 */
function renderThemeGroup(name: string): string {
  return `<fieldset class="settings-group" data-group="theme">
    <legend>${settingsSectionIcon('theme')}<span>Game themes</span></legend>
    ${Object.values(THEMES).map((entry) => renderThemeOption(name, entry.id, entry.label)).join('')}
  </fieldset>`;
}

/**
 * Renders one theme radio option with preview metadata.
 * @param name - Shared radio name for theme inputs.
 * @param value - Theme identifier submitted by the input.
 * @param label - Visible theme label.
 * @returns Theme-option markup.
 */
function renderThemeOption(name: string, value: string, label: string): string {
  return `<label class="radio-option" data-theme-option="${value}">
    <input type="radio" name="${name}" value="${value}" autocomplete="off" />
    <span class="radio-option__control" aria-hidden="true"></span>
    <span class="radio-option__label">${label}</span>
    <span class="radio-option__marker" aria-hidden="true"></span>
  </label>`;
}

/**
 * Renders all available player-color choices.
 * @param name - Shared radio name for player inputs.
 * @returns Player fieldset markup.
 */
function renderPlayerGroup(name: string): string {
  return `<fieldset class="settings-group settings-anim settings-anim--3" data-group="player">
    <legend>${settingsSectionIcon('player')}<span>Choose player</span></legend>
    ${PLAYER_OPTIONS.map((color) => renderPlayerOption(name, color)).join('')}
  </fieldset>`;
}

/**
 * Renders one player-color radio option.
 * @param name - Shared radio name for player inputs.
 * @param color - Player color represented by the option.
 * @returns Player-option markup.
 */
function renderPlayerOption(name: string, color: PlayerColor): string {
  const label = color === 'blue' ? 'Blue' : 'Orange';
  return `<label class="radio-option">
    <input type="radio" name="${name}" value="${color}" autocomplete="off" />
    <span class="radio-option__control" aria-hidden="true"></span>
    <span class="radio-option__label">${label}</span>
    <span class="radio-option__marker" aria-hidden="true"></span>
  </label>`;
}

/**
 * Renders all available board-size choices.
 * @param name - Shared radio name for board-size inputs.
 * @returns Board-size fieldset markup.
 */
function renderGridGroup(name: string): string {
  return `<fieldset class="settings-group settings-anim settings-anim--4" data-group="grid">
    <legend>${settingsSectionIcon('board')}<span>Board size</span></legend>
    ${GRID_OPTIONS.map((size) => renderGridOption(name, size)).join('')}
  </fieldset>`;
}

/**
 * Renders one board-size radio option.
 * @param name - Shared radio name for board-size inputs.
 * @param size - Grid dimensions represented by the option.
 * @returns Board-size option markup.
 */
function renderGridOption(name: string, size: GridSize): string {
  return `<label class="radio-option">
    <input type="radio" name="${name}" value="${size}" autocomplete="off" />
    <span class="radio-option__control" aria-hidden="true"></span>
    <span class="radio-option__label">${GRID_LABELS[size]}</span>
    <span class="radio-option__marker" aria-hidden="true"></span>
  </label>`;
}

/**
 * Renders the static game preview and settings action bar.
 * @returns Settings-preview markup.
 */
function renderPreview(): string {
  return `<aside class="settings-preview settings-anim settings-anim--2" aria-label="Theme-Vorschau">
    <figure class="settings-preview__stage" data-preview-stage data-preview-theme="${PREVIEW_FALLBACK_THEME}">
      ${renderPreviewHeader()}${renderPreviewCards()}
    </figure>
    ${renderActionBar()}
  </aside>`;
}

/**
 * Renders the preview scoreboard, active-player badge, and exit control.
 * @returns Preview-header markup.
 */
function renderPreviewHeader(): string {
  return `<header class="preview-game-header">
    ${renderPreviewScoreboard()}
    <p class="preview-current"><span>Current player:</span><span class="preview-current__badge preview-current__badge--blue" data-preview-current>${pawnIcon('white', 14)}</span></p>
    <button type="button" class="preview-exit" tabindex="-1">${exitIcon()}<span>Exit game</span></button>
  </header>`;
}

/**
 * Renders representative preview scores.
 * @returns Preview-scoreboard markup.
 */
function renderPreviewScoreboard(): string {
  return `<ul class="preview-scoreboard">
    <li class="preview-score-item preview-score-item--orange">${pawnIcon('orange', 16)}<span>6</span></li>
    <li class="preview-score-item preview-score-item--blue">${pawnIcon('blue', 16)}<span>2</span></li>
  </ul>`;
}

/**
 * Renders representative back and front cards for live theme updates.
 * @returns Preview-card markup with synchronization targets.
 */
function renderPreviewCards(): string {
  const backMotif = previewTheme.cardBackMotif ? renderMotif(previewTheme.cardBackMotif) : '';
  return `<section class="preview-cards" aria-hidden="true" data-preview-cards>
    <div class="preview-cards__pair" data-preview-pair>
      <article class="preview-card preview-card--back"><span class="preview-card__motif" data-preview-back-motif>${backMotif}</span></article>
      <article class="preview-card preview-card--front"><span class="preview-card__motif" data-preview-motif>${renderMotif('git')}</span></article>
    </div>
  </section>`;
}

/**
 * Renders the selection summary and disabled-by-default start action.
 * @returns Settings action-bar markup.
 */
function renderActionBar(): string {
  return `<footer class="settings-action-bar settings-anim settings-anim--5">
    ${renderSummary()}
    <button type="button" class="btn btn--yellow btn--start" data-action="play" disabled aria-disabled="true">
      <span class="btn__icon btn__icon--boxed">${playIcon()}</span><span>Start</span>
    </button>
  </footer>`;
}

/**
 * Renders placeholder values for the three required selections.
 * @returns Settings-summary markup.
 */
function renderSummary(): string {
  return `<p class="settings-summary" aria-label="Auswahl">
    <span data-summary-theme class="settings-summary__value is-placeholder">Game theme</span>
    <span class="settings-summary__slash" aria-hidden="true"></span>
    <span data-summary-player class="settings-summary__value is-placeholder">Player</span>
    <span class="settings-summary__slash" aria-hidden="true"></span>
    <span data-summary-board class="settings-summary__value is-placeholder">Board size</span>
  </p>`;
}
