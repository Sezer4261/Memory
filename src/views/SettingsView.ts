import {
  exitIcon,
  playIcon,
  settingsSectionIcon,
} from '../components/icons';
import { renderMotif } from '../data/motifs';
import { GRID_LABELS, THEMES } from '../data/themes';
import type { GameSettings, GridSize, PlayerColor, ThemeId } from '../types';

export interface SettingsViewCallbacks {
  onBack: () => void;
  onPlay: (settings: GameSettings) => void;
}

const GRID_OPTIONS: GridSize[] = ['4x4', '4x6', '6x6'];
const PLAYER_OPTIONS: PlayerColor[] = ['blue', 'orange'];
const PREVIEW_FALLBACK_THEME: ThemeId = 'code';

type DraftSelection = {
  themeId: ThemeId | null;
  playerColor: PlayerColor | null;
  gridSize: GridSize | null;
};

/**
 * Settings modal: themes → player → board, with live hover preview.
 */
export function renderSettingsView(
  root: HTMLElement,
  _initialSettings: GameSettings,
  callbacks: SettingsViewCallbacks,
): void {
  // Match screenshot: theme preselected, player & board empty until chosen.
  let draft: DraftSelection = {
    themeId: 'code',
    playerColor: null,
    gridSize: null,
  };

  const previewTheme = THEMES[draft.themeId ?? PREVIEW_FALLBACK_THEME];

  root.innerHTML = `
    <section
      class="screen screen--settings"
      aria-label="Spieleinstellungen"
      style="--preview-back: ${previewTheme.cardBackGradient}; --preview-board: ${previewTheme.boardBackground}; --preview-header: ${previewTheme.headerBackground}; --preview-text: ${previewTheme.textOnBoard}"
    >
      <div class="settings-modal settings-modal--enter" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <header class="settings-modal__header settings-anim settings-anim--1">
          <div class="settings-title-wrap">
            <h1 id="settings-title" class="settings-title">Settings</h1>
            <span class="settings-title__rule" aria-hidden="true"></span>
          </div>
          <button type="button" class="btn btn--text" data-action="back">Startseite</button>
        </header>

        <div class="settings-modal__body">
          <div class="settings-options">
            <fieldset class="settings-group settings-anim settings-anim--2">
              <legend>
                ${settingsSectionIcon('theme')}
                <span>Game themes</span>
              </legend>
              <div class="radio-list" role="radiogroup" aria-label="Theme" data-group="theme">
                ${Object.values(THEMES)
                  .map((entry) => {
                    const selected = draft.themeId === entry.id;
                    return `
                      <label
                        class="radio-option ${selected ? 'is-selected show-marker' : ''}"
                        data-theme-option="${entry.id}"
                      >
                        <input
                          type="radio"
                          name="theme-id"
                          value="${entry.id}"
                          ${selected ? 'checked' : ''}
                        />
                        <span class="radio-option__control" aria-hidden="true"></span>
                        <span class="radio-option__label">${entry.label}</span>
                        <span class="radio-option__marker" aria-hidden="true"></span>
                      </label>
                    `;
                  })
                  .join('')}
              </div>
            </fieldset>

            <fieldset class="settings-group settings-anim settings-anim--3">
              <legend>
                ${settingsSectionIcon('player')}
                <span>Choose player</span>
              </legend>
              <div class="radio-list" role="radiogroup" aria-label="Spielerfarbe" data-group="player">
                ${PLAYER_OPTIONS.map((color) => {
                  const label = color === 'blue' ? 'Blue' : 'Orange';
                  return `
                    <label class="radio-option">
                      <input
                        type="radio"
                        name="player-color"
                        value="${color}"
                      />
                      <span class="radio-option__control" aria-hidden="true"></span>
                      <span class="radio-option__label">${label}</span>
                      <span class="radio-option__marker" aria-hidden="true"></span>
                    </label>
                  `;
                }).join('')}
              </div>
            </fieldset>

            <fieldset class="settings-group settings-anim settings-anim--4">
              <legend>
                ${settingsSectionIcon('board')}
                <span>Board size</span>
              </legend>
              <div class="radio-list" role="radiogroup" aria-label="Spielfeldgröße" data-group="grid">
                ${GRID_OPTIONS.map((size) => {
                  return `
                    <label class="radio-option">
                      <input
                        type="radio"
                        name="grid-size"
                        value="${size}"
                      />
                      <span class="radio-option__control" aria-hidden="true"></span>
                      <span class="radio-option__label">${GRID_LABELS[size]}</span>
                      <span class="radio-option__marker" aria-hidden="true"></span>
                    </label>
                  `;
                }).join('')}
              </div>
            </fieldset>
          </div>

          <aside class="settings-preview settings-anim settings-anim--2" aria-label="Theme-Vorschau">
            <div class="settings-preview__stage" data-preview-stage>
              <div class="preview-game-header">
                <div class="preview-scoreboard">
                  <span class="preview-score preview-score--blue">Blue 0</span>
                  <span class="preview-score preview-score--orange">Orange 0</span>
                </div>
                <div class="preview-current">
                  <span>Current player:</span>
                  <span class="preview-current__swatch preview-current__swatch--blue" data-preview-current></span>
                </div>
                <span class="preview-exit">
                  ${exitIcon()}
                  <span>Exit game</span>
                </span>
              </div>
              <div class="preview-cards">
                <div class="preview-card preview-card--back">
                  <span data-preview-back-motif>${renderMotif(previewTheme.motifs[1] ?? 'typescript')}</span>
                </div>
                <div class="preview-card preview-card--front">
                  <span data-preview-motif>${renderMotif(previewTheme.motifs[0] ?? 'git')}</span>
                </div>
              </div>
            </div>

            <div class="settings-action-bar settings-anim settings-anim--5">
              <nav class="settings-summary" aria-label="Auswahl">
                <span>Game theme</span>
                <span class="settings-summary__slash" aria-hidden="true"></span>
                <span>Player</span>
                <span class="settings-summary__slash" aria-hidden="true"></span>
                <span>Board size</span>
              </nav>
              <button
                type="button"
                class="btn btn--yellow btn--start"
                data-action="play"
                disabled
                aria-disabled="true"
              >
                <span class="btn__icon btn__icon--boxed">${playIcon()}</span>
                <span>Start</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `;

  const screen = root.querySelector<HTMLElement>('.screen--settings');
  const previewMotif = root.querySelector<HTMLElement>('[data-preview-motif]');
  const previewBackMotif = root.querySelector<HTMLElement>('[data-preview-back-motif]');
  const previewCurrent = root.querySelector<HTMLElement>('[data-preview-current]');
  const playButton = root.querySelector<HTMLButtonElement>('[data-action="play"]');
  const themeList = root.querySelector<HTMLElement>('[data-group="theme"]');

  const isReady = (): boolean =>
    draft.themeId !== null && draft.playerColor !== null && draft.gridSize !== null;

  const syncStartButton = (): void => {
    if (!playButton) {
      return;
    }

    const ready = isReady();
    playButton.disabled = !ready;
    playButton.setAttribute('aria-disabled', ready ? 'false' : 'true');
    playButton.classList.toggle('is-ready', ready);
  };

  const syncSelection = (group: string, value: string): void => {
    root.querySelectorAll<HTMLLabelElement>(`[data-group="${group}"] .radio-option`).forEach((option) => {
      const input = option.querySelector<HTMLInputElement>('input');
      const selected = input?.value === value;
      option.classList.toggle('is-selected', Boolean(selected));
      if (input) {
        input.checked = Boolean(selected);
      }
    });
    syncMarkers(group);
  };

  const syncMarkers = (group?: string): void => {
    const groups = group
      ? [root.querySelector<HTMLElement>(`[data-group="${group}"]`)]
      : Array.from(root.querySelectorAll<HTMLElement>('.radio-list'));

    groups.forEach((list) => {
      if (!list) {
        return;
      }

      const hovered = list.querySelector<HTMLElement>('.radio-option.is-hovered, .radio-option:hover');
      list.querySelectorAll<HTMLElement>('.radio-option').forEach((option) => {
        const show = hovered
          ? option === hovered || option.classList.contains('is-hovered')
          : option.classList.contains('is-selected');
        option.classList.toggle('show-marker', show);
      });
    });
  };

  const syncCurrentPlayerSwatch = (): void => {
    if (!previewCurrent) {
      return;
    }

    const color = draft.playerColor ?? 'blue';
    previewCurrent.classList.toggle('preview-current__swatch--blue', color === 'blue');
    previewCurrent.classList.toggle('preview-current__swatch--orange', color === 'orange');
  };

  const applyThemePreview = (themeId: ThemeId, options: { hover?: boolean } = {}): void => {
    const activeTheme = THEMES[themeId];

    if (screen) {
      screen.style.setProperty('--preview-back', activeTheme.cardBackGradient);
      screen.style.setProperty('--preview-board', activeTheme.boardBackground);
      screen.style.setProperty('--preview-header', activeTheme.headerBackground);
      screen.style.setProperty('--preview-text', activeTheme.textOnBoard);
    }

    if (previewBackMotif) {
      previewBackMotif.innerHTML = renderMotif(
        activeTheme.motifs[1] ?? activeTheme.motifs[0] ?? 'typescript',
      );
    }

    if (previewMotif) {
      previewMotif.innerHTML = renderMotif(activeTheme.motifs[0] ?? 'git');
    }

    root.querySelectorAll<HTMLElement>('[data-theme-option]').forEach((option) => {
      const isHoverTarget = Boolean(options.hover) && option.dataset.themeOption === themeId;
      option.classList.toggle('is-hovered', isHoverTarget);
    });

    syncMarkers('theme');
  };

  applyThemePreview(draft.themeId ?? PREVIEW_FALLBACK_THEME);
  syncCurrentPlayerSwatch();
  syncStartButton();
  syncMarkers();

  root.querySelector('[data-action="back"]')?.addEventListener('click', () => {
    callbacks.onBack();
  });

  playButton?.addEventListener('click', () => {
    if (!isReady() || !draft.themeId || !draft.playerColor || !draft.gridSize) {
      return;
    }

    callbacks.onPlay({
      themeId: draft.themeId,
      playerColor: draft.playerColor,
      gridSize: draft.gridSize,
    });
  });

  root.querySelectorAll<HTMLInputElement>('input[name="player-color"]').forEach((input) => {
    input.addEventListener('change', () => {
      const playerColor = input.value as PlayerColor;
      draft = { ...draft, playerColor };
      syncSelection('player', playerColor);
      syncCurrentPlayerSwatch();
      syncStartButton();
    });
  });

  root.querySelectorAll<HTMLInputElement>('input[name="grid-size"]').forEach((input) => {
    input.addEventListener('change', () => {
      const gridSize = input.value as GridSize;
      draft = { ...draft, gridSize };
      syncSelection('grid', gridSize);
      syncStartButton();
    });
  });

  root.querySelectorAll<HTMLInputElement>('input[name="theme-id"]').forEach((input) => {
    input.addEventListener('change', () => {
      const themeId = input.value as ThemeId;
      draft = { ...draft, themeId };
      syncSelection('theme', themeId);
      applyThemePreview(themeId);
      syncStartButton();
    });
  });

  themeList?.querySelectorAll<HTMLElement>('[data-theme-option]').forEach((option) => {
    option.addEventListener('mouseenter', () => {
      const themeId = option.dataset.themeOption as ThemeId | undefined;
      if (themeId) {
        applyThemePreview(themeId, { hover: true });
      }
    });
  });

  themeList?.addEventListener('mouseleave', () => {
    applyThemePreview(draft.themeId ?? PREVIEW_FALLBACK_THEME);
  });

  root.querySelectorAll<HTMLElement>('[data-group="player"] .radio-option, [data-group="grid"] .radio-option').forEach((option) => {
    option.addEventListener('mouseenter', () => {
      const list = option.closest('.radio-list');
      list?.querySelectorAll('.radio-option').forEach((entry) => {
        entry.classList.toggle('is-hovered', entry === option);
      });
      syncMarkers(list?.getAttribute('data-group') ?? undefined);
    });

    option.addEventListener('mouseleave', () => {
      const list = option.closest('.radio-list');
      list?.querySelectorAll('.radio-option').forEach((entry) => {
        entry.classList.remove('is-hovered');
      });
      syncMarkers(list?.getAttribute('data-group') ?? undefined);
    });
  });
}
