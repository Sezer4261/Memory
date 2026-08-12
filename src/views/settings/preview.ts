/**
 * Applies live theme and player selections to the settings preview.
 * @module views/settings/preview
 */
import { pawnIcon } from '../../components/icons';
import { renderMotif } from '../../data/motifs';
import { THEMES } from '../../data/themes';
import type { ThemeDefinition, ThemeId } from '../../types';
import type { SettingsSession } from './model';
import { syncMarkers } from './sync';

/** Theme shown before the user commits a theme selection. */
export const PREVIEW_FALLBACK_THEME: ThemeId = 'code';

/** Representative front-card motif displayed for each preview theme. */
const PREVIEW_MOTIF: Record<ThemeId, string> = {
  code: 'git',
  gaming: 'rubiks',
  da: 'da_wave',
  food: 'wrap',
};

/**
 * Applies a theme to the centered settings preview.
 * @param session - Settings session containing preview elements.
 * @param themeId - Theme to display.
 * @param hover - Whether the preview is temporary hover feedback.
 * @returns Nothing.
 */
export function applyThemePreview(
  session: SettingsSession,
  themeId: ThemeId,
  hover = false,
): void {
  const theme = THEMES[themeId];
  syncPreviewStyles(session.elements.screen, theme);
  syncPreviewContent(session, themeId, theme);
  // Hover previews are temporary and never replace the committed draft.
  syncHoverTarget(session.root, themeId, hover);
  syncMarkers(session, 'theme');
}

/**
 * Applies theme variables and light-mode state to the preview screen.
 * @param screen - Settings screen receiving preview styles.
 * @param theme - Theme definition to preview.
 * @returns Nothing.
 */
function syncPreviewStyles(screen: HTMLElement | null, theme: ThemeDefinition): void {
  if (!screen) return;
  setPreviewCardStyles(screen, theme);
  setPreviewBoardStyles(screen, theme);
  const exitFilled = theme.id !== 'code';
  screen.style.setProperty('--preview-exit-bg', exitFilled ? theme.accent : '#2f2f2f');
  screen.style.setProperty('--preview-exit-fg', '#ffffff');
  screen.classList.toggle('screen--settings-light', theme.id === 'da' || theme.id === 'food');
}

/**
 * Updates card-specific preview custom properties.
 * @param screen - Settings screen receiving card styles.
 * @param theme - Theme definition to preview.
 * @returns Nothing.
 */
function setPreviewCardStyles(screen: HTMLElement, theme: ThemeDefinition): void {
  screen.style.setProperty('--preview-back', theme.cardBackGradient);
  screen.style.setProperty('--preview-front', theme.cardFront ?? '#ffffff');
  screen.style.setProperty('--preview-motif-size', theme.motifSize ?? '58%');
  screen.style.setProperty('--preview-card-radius', theme.cardRadius ?? '10px');
  screen.style.setProperty('--preview-card-aspect', theme.cardAspect ?? '1 / 1');
}

/**
 * Updates board and header preview custom properties.
 * @param screen - Settings screen receiving board styles.
 * @param theme - Theme definition to preview.
 * @returns Nothing.
 */
function setPreviewBoardStyles(screen: HTMLElement, theme: ThemeDefinition): void {
  screen.style.setProperty('--preview-board', theme.boardBackground);
  screen.style.setProperty('--preview-header', theme.headerBackground);
  screen.style.setProperty('--preview-text', theme.textOnBoard);
  screen.style.setProperty('--preview-accent', theme.accent);
}

/**
 * Synchronizes preview metadata and card motifs.
 * @param session - Settings session containing preview targets.
 * @param themeId - Theme identifier written to preview metadata.
 * @param theme - Theme definition supplying motif information.
 * @returns Nothing.
 */
function syncPreviewContent(
  session: SettingsSession,
  themeId: ThemeId,
  theme: ThemeDefinition,
): void {
  const stage = session.root.querySelector<HTMLElement>('[data-preview-stage]');
  if (stage) stage.dataset.previewTheme = themeId;
  syncBackMotif(session, theme);
  syncFrontMotif(session, themeId, theme);
}

/**
 * Replaces the preview card-back motif for the active theme.
 * @param session - Settings session containing the motif target.
 * @param theme - Theme that may define a card-back motif.
 * @returns Nothing.
 */
function syncBackMotif(session: SettingsSession, theme: ThemeDefinition): void {
  const target = session.elements.previewBackMotif;
  if (!target) return;
  target.innerHTML = theme.cardBackMotif ? renderMotif(theme.cardBackMotif) : '';
}

/**
 * Replaces the preview card-front motif with a representative image.
 * @param session - Settings session containing the motif target.
 * @param themeId - Theme used to choose the representative motif.
 * @param theme - Theme supplying a fallback motif.
 * @returns Nothing.
 */
function syncFrontMotif(
  session: SettingsSession,
  themeId: ThemeId,
  theme: ThemeDefinition,
): void {
  const target = session.elements.previewMotif;
  if (!target) return;
  target.innerHTML = renderMotif(PREVIEW_MOTIF[themeId] ?? theme.motifs[0] ?? 'git');
}

/**
 * Marks only the temporarily previewed theme as hovered.
 * @param root - Host containing theme options.
 * @param themeId - Theme option to mark when hovering.
 * @param hover - Whether temporary hover state is active.
 * @returns Nothing.
 */
function syncHoverTarget(root: HTMLElement, themeId: ThemeId, hover: boolean): void {
  root.querySelectorAll<HTMLElement>('[data-theme-option]').forEach((option) => {
    const isTarget = hover && option.dataset.themeOption === themeId;
    option.classList.toggle('is-hovered', isTarget);
  });
}

/**
 * Keeps the current-player preview badge in sync with the draft.
 * @param session - Settings session containing draft and preview badge.
 * @returns Nothing.
 */
export function syncCurrentPlayerBadge(session: SettingsSession): void {
  const badge = session.elements.previewCurrent;
  if (!badge) return;
  const color = session.draft.playerColor ?? 'blue';
  badge.classList.toggle('preview-current__badge--blue', color === 'blue');
  badge.classList.toggle('preview-current__badge--orange', color === 'orange');
  badge.innerHTML = pawnIcon('white', 14);
}
