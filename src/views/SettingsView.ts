import {
  exitIcon,
  pawnIcon,
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

/**
 * Settings modal: themes → player → board, with live hover preview.
 */
export function renderSettingsView(
  root: HTMLElement,
  initialSettings: GameSettings,
  callbacks: SettingsViewCallbacks,
): void {
  let draft: GameSettings = { ...initialSettings };

  const initialTheme = THEMES[draft.themeId];

  root.innerHTML = `
    <section
      class="screen screen--settings"
      aria-label="Spieleinstellungen"
      style="--preview-back: ${initialTheme.cardBackGradient}; --preview-board: ${initialTheme.boardBackground}; --preview-header: ${initialTheme.headerBackground}; --preview-text: ${initialTheme.textOnBoard}"
    >
      <div class="settings-modal settings-modal--enter" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <header class="settings-modal__header settings-anim settings-anim--1">
          <h1 id="settings-title" class="settings-title">Settings</h1>
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
                        class="radio-option ${selected ? 'is-selected' : ''}"
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
                  const selected = draft.playerColor === color;
                  const label = color === 'blue' ? 'Blue' : 'Orange';
                  return `
                    <label class="radio-option ${selected ? 'is-selected' : ''}">
                      <input
                        type="radio"
                        name="player-color"
                        value="${color}"
                        ${selected ? 'checked' : ''}
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
                  const selected = draft.gridSize === size;
                  return `
                    <label class="radio-option ${selected ? 'is-selected' : ''}">
                      <input
                        type="radio"
                        name="grid-size"
                        value="${size}"
                        ${selected ? 'checked' : ''}
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
                  ${pawnIcon('orange', 18)}
                  <span>6</span>
                  ${pawnIcon('blue', 18)}
                  <span>2</span>
                </div>
                <div class="preview-current">
                  <span>Current player:</span>
                  <span class="preview-current__badge" data-preview-current>
                    ${pawnIcon(draft.playerColor, 16)}
                  </span>
                </div>
                <span class="preview-exit">
                  ${exitIcon()}
                  <span>Exit game</span>
                </span>
              </div>
              <div class="preview-cards">
                <div class="preview-card preview-card--back">
                  <span data-preview-back-motif>${renderMotif(initialTheme.motifs[1] ?? 'git')}</span>
                </div>
                <div class="preview-card preview-card--front">
                  <span data-preview-motif>${renderMotif(initialTheme.motifs[0] ?? 'typescript')}</span>
                </div>
              </div>
            </div>
            <p class="settings-preview__caption" data-preview-caption>${initialTheme.description}</p>
            <nav class="settings-summary" aria-label="Auswahl">
              <span data-summary-theme>${initialTheme.shortLabel}</span>
              <span class="settings-summary__slash" aria-hidden="true"></span>
              <span data-summary-player>${draft.playerColor === 'blue' ? 'Blue' : 'Orange'}</span>
              <span class="settings-summary__slash" aria-hidden="true"></span>
              <span data-summary-board>${GRID_LABELS[draft.gridSize]}</span>
            </nav>
          </aside>
        </div>

        <footer class="settings-modal__footer settings-anim settings-anim--5">
          <button type="button" class="btn btn--yellow btn--pulse" data-action="play">
            <span class="btn__icon btn__icon--boxed">${playIcon()}</span>
            <span>Start</span>
          </button>
        </footer>
      </div>
    </section>
  `;

  const screen = root.querySelector<HTMLElement>('.screen--settings');
  const previewMotif = root.querySelector<HTMLElement>('[data-preview-motif]');
  const previewBackMotif = root.querySelector<HTMLElement>('[data-preview-back-motif]');
  const previewCaption = root.querySelector<HTMLElement>('[data-preview-caption]');
  const previewCurrent = root.querySelector<HTMLElement>('[data-preview-current]');
  const summaryTheme = root.querySelector<HTMLElement>('[data-summary-theme]');
  const summaryPlayer = root.querySelector<HTMLElement>('[data-summary-player]');
  const summaryBoard = root.querySelector<HTMLElement>('[data-summary-board]');
  const themeList = root.querySelector<HTMLElement>('[data-group="theme"]');

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

  const applyThemePreview = (themeId: ThemeId, options: { hover?: boolean } = {}): void => {
    const activeTheme = THEMES[themeId];

    if (screen) {
      screen.style.setProperty('--preview-back', activeTheme.cardBackGradient);
      screen.style.setProperty('--preview-board', activeTheme.boardBackground);
      screen.style.setProperty('--preview-header', activeTheme.headerBackground);
      screen.style.setProperty('--preview-text', activeTheme.textOnBoard);
    }

    if (previewMotif) {
      previewMotif.innerHTML = renderMotif(activeTheme.motifs[0] ?? '🎮');
    }

    if (previewBackMotif) {
      previewBackMotif.innerHTML = renderMotif(
        activeTheme.motifs[1] ?? activeTheme.motifs[0] ?? '💻',
      );
    }

    if (previewCaption) {
      previewCaption.textContent = activeTheme.description;
    }

    root.querySelectorAll<HTMLElement>('[data-theme-option]').forEach((option) => {
      const isHoverTarget = Boolean(options.hover) && option.dataset.themeOption === themeId;
      option.classList.toggle('is-hovered', isHoverTarget);
    });

    syncMarkers('theme');
  };

  const syncSummary = (): void => {
    const activeTheme = THEMES[draft.themeId];

    if (summaryTheme) {
      summaryTheme.textContent = activeTheme.shortLabel;
    }

    if (summaryPlayer) {
      summaryPlayer.textContent = draft.playerColor === 'blue' ? 'Blue' : 'Orange';
    }

    if (summaryBoard) {
      summaryBoard.textContent = GRID_LABELS[draft.gridSize];
    }

    if (previewCurrent) {
      previewCurrent.innerHTML = pawnIcon(draft.playerColor, 16);
    }
  };

  applyThemePreview(draft.themeId);
  syncSummary();
  syncMarkers();

  root.querySelector('[data-action="back"]')?.addEventListener('click', () => {
    callbacks.onBack();
  });

  root.querySelector('[data-action="play"]')?.addEventListener('click', () => {
    callbacks.onPlay({ ...draft });
  });

  root.querySelectorAll<HTMLInputElement>('input[name="player-color"]').forEach((input) => {
    input.addEventListener('change', () => {
      draft = { ...draft, playerColor: input.value as PlayerColor };
      syncSelection('player', draft.playerColor);
      syncSummary();
    });
  });

  root.querySelectorAll<HTMLInputElement>('input[name="grid-size"]').forEach((input) => {
    input.addEventListener('change', () => {
      draft = { ...draft, gridSize: input.value as GridSize };
      syncSelection('grid', draft.gridSize);
      syncSummary();
    });
  });

  root.querySelectorAll<HTMLInputElement>('input[name="theme-id"]').forEach((input) => {
    input.addEventListener('change', () => {
      draft = { ...draft, themeId: input.value as ThemeId };
      syncSelection('theme', draft.themeId);
      applyThemePreview(draft.themeId);
      syncSummary();
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
    applyThemePreview(draft.themeId);
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
