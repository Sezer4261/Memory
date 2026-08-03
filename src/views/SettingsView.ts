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
  let draft: DraftSelection = {
    themeId: null,
    playerColor: null,
    gridSize: null,
  };

  // Unique names each visit so browsers cannot restore a previous radio choice.
  const fieldId = `settings-${Date.now().toString(36)}`;
  const themeName = `${fieldId}-theme`;
  const playerName = `${fieldId}-player`;
  const gridName = `${fieldId}-grid`;

  const previewTheme = THEMES[PREVIEW_FALLBACK_THEME];

  root.innerHTML = `
    <section
      class="screen screen--settings"
      aria-label="Spieleinstellungen"
      style="--preview-back: ${previewTheme.cardBackGradient}; --preview-board: ${previewTheme.boardBackground}; --preview-header: ${previewTheme.headerBackground}; --preview-text: ${previewTheme.textOnBoard}; --preview-accent: ${previewTheme.accent}"
    >
      <article
        class="settings-modal settings-modal--enter"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <header class="settings-modal__header settings-anim settings-anim--1">
          <h1 id="settings-title" class="settings-title">Settings</h1>
          <button type="button" class="btn btn--text" data-action="back">Startseite</button>
        </header>

          <form class="settings-options settings-anim settings-anim--2" aria-label="Spieleinstellungen" autocomplete="off">
            <fieldset class="settings-group" data-group="theme">
              <legend>
                ${settingsSectionIcon('theme')}
                <span>Game themes</span>
              </legend>
              ${Object.values(THEMES)
                .map(
                  (entry) => `
                    <label class="radio-option" data-theme-option="${entry.id}">
                      <input type="radio" name="${themeName}" value="${entry.id}" autocomplete="off" />
                      <span class="radio-option__control" aria-hidden="true"></span>
                      <span class="radio-option__label">${entry.label}</span>
                      <span class="radio-option__marker" aria-hidden="true"></span>
                    </label>
                  `,
                )
                .join('')}
            </fieldset>

            <fieldset class="settings-group settings-anim settings-anim--3" data-group="player">
              <legend>
                ${settingsSectionIcon('player')}
                <span>Choose player</span>
              </legend>
              ${PLAYER_OPTIONS.map((color) => {
                const label = color === 'blue' ? 'Blue' : 'Orange';
                return `
                  <label class="radio-option">
                    <input type="radio" name="${playerName}" value="${color}" autocomplete="off" />
                    <span class="radio-option__control" aria-hidden="true"></span>
                    <span class="radio-option__label">${label}</span>
                    <span class="radio-option__marker" aria-hidden="true"></span>
                  </label>
                `;
              }).join('')}
            </fieldset>

            <fieldset class="settings-group settings-anim settings-anim--4" data-group="grid">
              <legend>
                ${settingsSectionIcon('board')}
                <span>Board size</span>
              </legend>
              ${GRID_OPTIONS.map(
                (size) => `
                  <label class="radio-option">
                    <input type="radio" name="${gridName}" value="${size}" autocomplete="off" />
                    <span class="radio-option__control" aria-hidden="true"></span>
                    <span class="radio-option__label">${GRID_LABELS[size]}</span>
                    <span class="radio-option__marker" aria-hidden="true"></span>
                  </label>
                `,
              ).join('')}
            </fieldset>
          </form>

          <aside class="settings-preview settings-anim settings-anim--2" aria-label="Theme-Vorschau">
            <figure class="settings-preview__stage" data-preview-stage>
              <header class="preview-game-header">
                <ul class="preview-scoreboard">
                  <li class="preview-score-item preview-score-item--blue">
                    ${pawnIcon('blue', 16)}
                    <span>0</span>
                  </li>
                  <li class="preview-score-item preview-score-item--orange">
                    ${pawnIcon('orange', 16)}
                    <span>0</span>
                  </li>
                </ul>
                <p class="preview-current">
                  <span>Current player:</span>
                  <span class="preview-current__badge preview-current__badge--blue" data-preview-current>
                    ${pawnIcon('white', 14)}
                  </span>
                </p>
                <p class="preview-exit">
                  ${exitIcon()}
                  <span>Exit game</span>
                </p>
              </header>
              <section class="preview-cards" aria-hidden="true">
                <article class="preview-card preview-card--back">
                  <span data-preview-back-motif>${renderMotif(previewTheme.motifs[1] ?? 'typescript')}</span>
                </article>
                <article class="preview-card preview-card--front">
                  <span data-preview-motif>${renderMotif(previewTheme.motifs[0] ?? 'git')}</span>
                </article>
              </section>
            </figure>

            <footer class="settings-action-bar settings-anim settings-anim--5">
              <p class="settings-summary" aria-label="Auswahl">
                <span data-summary-theme class="settings-summary__value is-placeholder">Game theme</span>
                <span class="settings-summary__slash" aria-hidden="true"></span>
                <span data-summary-player class="settings-summary__value is-placeholder">Player</span>
                <span class="settings-summary__slash" aria-hidden="true"></span>
                <span data-summary-board class="settings-summary__value is-placeholder">Board size</span>
              </p>
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
            </footer>
          </aside>
      </article>
    </section>
  `;

  const screen = root.querySelector<HTMLElement>('.screen--settings');
  const previewMotif = root.querySelector<HTMLElement>('[data-preview-motif]');
  const previewBackMotif = root.querySelector<HTMLElement>('[data-preview-back-motif]');
  const previewCurrent = root.querySelector<HTMLElement>('[data-preview-current]');
  const playButton = root.querySelector<HTMLButtonElement>('[data-action="play"]');
  const themeList = root.querySelector<HTMLElement>('[data-group="theme"]');
  const summaryTheme = root.querySelector<HTMLElement>('[data-summary-theme]');
  const summaryPlayer = root.querySelector<HTMLElement>('[data-summary-player]');
  const summaryBoard = root.querySelector<HTMLElement>('[data-summary-board]');

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

  const syncSummary = (): void => {
    if (summaryTheme) {
      const themeId = draft.themeId;
      const hasTheme = themeId !== null;
      summaryTheme.textContent = hasTheme ? THEMES[themeId].shortLabel : 'Game theme';
      summaryTheme.classList.toggle('is-placeholder', !hasTheme);
    }

    if (summaryPlayer) {
      const playerColor = draft.playerColor;
      const hasPlayer = playerColor !== null;
      summaryPlayer.textContent = hasPlayer
        ? playerColor === 'blue'
          ? 'Blue'
          : 'Orange'
        : 'Player';
      summaryPlayer.classList.toggle('is-placeholder', !hasPlayer);
    }

    if (summaryBoard) {
      const gridSize = draft.gridSize;
      const hasBoard = gridSize !== null;
      summaryBoard.textContent = hasBoard ? GRID_LABELS[gridSize] : 'Board size';
      summaryBoard.classList.toggle('is-placeholder', !hasBoard);
    }
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
      : Array.from(root.querySelectorAll<HTMLElement>('[data-group]'));

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

  const syncCurrentPlayerBadge = (): void => {
    if (!previewCurrent) {
      return;
    }

    const color = draft.playerColor ?? 'blue';
    previewCurrent.classList.toggle('preview-current__badge--blue', color === 'blue');
    previewCurrent.classList.toggle('preview-current__badge--orange', color === 'orange');
    previewCurrent.innerHTML = pawnIcon('white', 14);
  };

  const applyThemePreview = (themeId: ThemeId, options: { hover?: boolean } = {}): void => {
    const activeTheme = THEMES[themeId];

    if (screen) {
      screen.style.setProperty('--preview-back', activeTheme.cardBackGradient);
      screen.style.setProperty('--preview-board', activeTheme.boardBackground);
      screen.style.setProperty('--preview-header', activeTheme.headerBackground);
      screen.style.setProperty('--preview-text', activeTheme.textOnBoard);
      screen.style.setProperty('--preview-accent', activeTheme.accent);
      screen.classList.toggle(
        'screen--settings-light',
        themeId === 'da' || themeId === 'food' || themeId === 'gaming',
      );
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

  root.querySelector('.settings-options')?.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const clearAllSelections = (): void => {
    draft = { themeId: null, playerColor: null, gridSize: null };
    root.querySelectorAll<HTMLInputElement>('.settings-options input[type="radio"]').forEach((input) => {
      input.checked = false;
    });
    root.querySelectorAll<HTMLElement>('.settings-options .radio-option').forEach((option) => {
      option.classList.remove('is-selected', 'is-hovered', 'show-marker');
    });
  };

  clearAllSelections();
  applyThemePreview(PREVIEW_FALLBACK_THEME);
  syncCurrentPlayerBadge();
  syncSummary();
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

  root.querySelectorAll<HTMLInputElement>(`input[name="${playerName}"]`).forEach((input) => {
    input.addEventListener('change', () => {
      const playerColor = input.value as PlayerColor;
      draft = { ...draft, playerColor };
      syncSelection('player', playerColor);
      syncCurrentPlayerBadge();
      syncSummary();
      syncStartButton();
    });
  });

  root.querySelectorAll<HTMLInputElement>(`input[name="${gridName}"]`).forEach((input) => {
    input.addEventListener('change', () => {
      const gridSize = input.value as GridSize;
      draft = { ...draft, gridSize };
      syncSelection('grid', gridSize);
      syncSummary();
      syncStartButton();
    });
  });

  root.querySelectorAll<HTMLInputElement>(`input[name="${themeName}"]`).forEach((input) => {
    input.addEventListener('change', () => {
      const themeId = input.value as ThemeId;
      draft = { ...draft, themeId };
      syncSelection('theme', themeId);
      applyThemePreview(themeId);
      syncSummary();
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
      const list = option.closest('[data-group]');
      list?.querySelectorAll('.radio-option').forEach((entry) => {
        entry.classList.toggle('is-hovered', entry === option);
      });
      syncMarkers(list?.getAttribute('data-group') ?? undefined);
    });

    option.addEventListener('mouseleave', () => {
      const list = option.closest('[data-group]');
      list?.querySelectorAll('.radio-option').forEach((entry) => {
        entry.classList.remove('is-hovered');
      });
      syncMarkers(list?.getAttribute('data-group') ?? undefined);
    });
  });
}
