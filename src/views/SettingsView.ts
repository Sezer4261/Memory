import {
  pawnIcon,
  playIcon,
  settingsSectionIcon,
} from '../components/icons';
import { GRID_LABELS, THEMES } from '../data/themes';
import type { GameSettings, GridSize, PlayerColor, ThemeId } from '../types';
import { escapeHtml } from '../utils/escapeHtml';

export interface SettingsViewCallbacks {
  onBack: () => void;
  onPlay: (settings: GameSettings) => void;
}

const GRID_OPTIONS: GridSize[] = ['4x4', '4x6', '6x6'];
const PLAYER_OPTIONS: PlayerColor[] = ['blue', 'orange'];

/**
 * Settings modal: player, board size, themes + live preview (design template).
 */
export function renderSettingsView(
  root: HTMLElement,
  initialSettings: GameSettings,
  callbacks: SettingsViewCallbacks,
): void {
  let draft: GameSettings = { ...initialSettings };

  const paint = (): void => {
    const theme = THEMES[draft.themeId];
    const playerLabel = draft.playerColor === 'blue' ? 'Blue Player' : 'Orange Player';
    const boardLabel = GRID_LABELS[draft.gridSize];
    const previewMotif = theme.motifs[0] ?? '🎮';

    root.innerHTML = `
      <section
        class="screen screen--settings"
        aria-label="Spieleinstellungen"
        style="--preview-back: ${theme.cardBackGradient}; --preview-board: ${theme.boardBackground}"
      >
        <div class="settings-backdrop" aria-hidden="true">
          <div class="settings-backdrop__board">
            ${Array.from({ length: 16 }, () => '<span class="settings-backdrop__card"></span>').join('')}
          </div>
        </div>

        <div class="settings-modal" role="dialog" aria-modal="true" aria-labelledby="settings-title">
          <header class="settings-modal__header">
            <h1 id="settings-title" class="settings-title">Settings</h1>
            <button type="button" class="btn btn--text" data-action="back">Startseite</button>
          </header>

          <div class="settings-modal__body">
            <div class="settings-options">
              <fieldset class="settings-group">
                <legend>
                  ${settingsSectionIcon('player')}
                  <span>Choose player</span>
                </legend>
                <div class="radio-list" role="radiogroup" aria-label="Spielerfarbe">
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
                        ${pawnIcon(color, 22)}
                        <span>${label}</span>
                      </label>
                    `;
                  }).join('')}
                </div>
              </fieldset>

              <fieldset class="settings-group">
                <legend>
                  ${settingsSectionIcon('board')}
                  <span>Board size</span>
                </legend>
                <div class="radio-list" role="radiogroup" aria-label="Spielfeldgröße">
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
                        <span>${GRID_LABELS[size]} <small>(${size})</small></span>
                      </label>
                    `;
                  }).join('')}
                </div>
              </fieldset>

              <fieldset class="settings-group">
                <legend>
                  ${settingsSectionIcon('theme')}
                  <span>Game themes</span>
                </legend>
                <div class="radio-list" role="radiogroup" aria-label="Theme">
                  ${Object.values(THEMES)
                    .map((entry) => {
                      const selected = draft.themeId === entry.id;
                      return `
                        <label class="radio-option ${selected ? 'is-selected' : ''}">
                          <input
                            type="radio"
                            name="theme-id"
                            value="${entry.id}"
                            ${selected ? 'checked' : ''}
                          />
                          <span class="radio-option__control" aria-hidden="true"></span>
                          <span>${entry.label}</span>
                        </label>
                      `;
                    })
                    .join('')}
                </div>
              </fieldset>
            </div>

            <aside class="settings-preview" aria-label="Theme-Vorschau">
              <div class="settings-preview__stage">
                <div class="preview-card preview-card--back"></div>
                <div class="preview-card preview-card--front">
                  <span>${escapeHtml(previewMotif)}</span>
                </div>
              </div>
              <p class="settings-preview__caption">${theme.description}</p>
            </aside>
          </div>

          <footer class="settings-modal__footer">
            <p class="settings-summary">
              ${playerLabel} / Board-${boardLabel} / ${theme.shortLabel}
            </p>
            <button type="button" class="btn btn--yellow" data-action="play">
              <span class="btn__icon btn__icon--boxed">${playIcon()}</span>
              <span>Start</span>
            </button>
          </footer>
        </div>
      </section>
    `;

    bindEvents();
  };

  const bindEvents = (): void => {
    root.querySelector('[data-action="back"]')?.addEventListener('click', () => {
      callbacks.onBack();
    });

    root.querySelector('[data-action="play"]')?.addEventListener('click', () => {
      callbacks.onPlay({ ...draft });
    });

    root.querySelectorAll<HTMLInputElement>('input[name="player-color"]').forEach((input) => {
      input.addEventListener('change', () => {
        draft = { ...draft, playerColor: input.value as PlayerColor };
        paint();
      });
    });

    root.querySelectorAll<HTMLInputElement>('input[name="grid-size"]').forEach((input) => {
      input.addEventListener('change', () => {
        draft = { ...draft, gridSize: input.value as GridSize };
        paint();
      });
    });

    root.querySelectorAll<HTMLInputElement>('input[name="theme-id"]').forEach((input) => {
      input.addEventListener('change', () => {
        draft = { ...draft, themeId: input.value as ThemeId };
        paint();
      });
    });
  };

  paint();
}
