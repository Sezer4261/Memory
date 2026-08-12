/**
 * Produces the themed DOM markup for a newly mounted Memory board.
 * @module views/game/template
 */
import { exitIcon, pawnIcon } from '../../components/icons';
import { renderMotif } from '../../data/motifs';
import { THEMES } from '../../data/themes';
import type { CardData, GameSettings, GameSnapshot, PlayerColor, ThemeDefinition } from '../../types';

/**
 * Creates the complete playfield DOM for a new board.
 * @param settings - Theme and board settings for the game.
 * @param snapshot - State used to render header and cards.
 * @returns Complete game-screen markup.
 */
export function renderGameTemplate(settings: GameSettings, snapshot: GameSnapshot): string {
  const theme = THEMES[settings.themeId];
  const lightClass = theme.id === 'da' || theme.id === 'food' ? 'screen--game-light' : '';
  return `<section class="screen screen--game ${lightClass}" aria-label="Spielfeld"
    data-theme-id="${settings.themeId}" data-grid="${snapshot.columns}x${snapshot.rows}"
    style="${gameThemeStyle(theme)}">
    ${renderHeader(snapshot)}
    ${renderCardGrid(snapshot, theme)}
  </section>`;
}

/**
 * Serializes theme values as game-screen CSS custom properties.
 * @param theme - Theme definition supplying board and card styles.
 * @returns Inline style declaration for the game screen.
 */
function gameThemeStyle(theme: ThemeDefinition): string {
  const exitBackground = theme.id !== 'code' ? theme.accent : '#2f2f2f';
  return `--board-bg: ${theme.boardBackground}; --shell-bg: ${theme.shellBackground}; --header-bg: ${theme.headerBackground}; --card-back: ${theme.cardBackGradient}; --card-front: ${theme.cardFront ?? '#ffffff'}; --card-radius: ${theme.cardRadius ?? '10px'}; --theme-accent: ${theme.accent}; --board-text: ${theme.textOnBoard}; --exit-bg: ${exitBackground}; --exit-fg: #ffffff;`;
}

/**
 * Renders the scoreboard, current player, and exit control.
 * @param snapshot - State supplying scores and active player.
 * @returns Game-header markup.
 */
function renderHeader(snapshot: GameSnapshot): string {
  const currentPlayer = snapshot.players[snapshot.currentPlayerIndex];
  return `<header class="game-header">
    <ul class="scoreboard" aria-label="Punktestand" data-scoreboard>${renderScoreboard(snapshot)}</ul>
    <p class="current-player" aria-live="polite" data-current-player>${renderCurrentPlayer(currentPlayer.color)}</p>
    <button type="button" class="btn btn--exit" data-action="exit">
      ${exitIcon()}<span class="btn--exit__label">Exit game</span>
    </button>
  </header>`;
}

/**
 * Renders scoreboard entries for mounting and patching.
 * @param snapshot - State containing both player scores.
 * @returns Scoreboard list-item markup.
 */
export function renderScoreboard(snapshot: GameSnapshot): string {
  return snapshot.players.map((player) => `
    <li class="scoreboard__item scoreboard__item--${player.color}">
      ${pawnIcon(player.color, 22)}
      <span class="scoreboard__score">${player.score}</span>
    </li>`).join('');
}

/**
 * Renders the current-player label for mounting and patching.
 * @param color - Color of the player whose turn is active.
 * @returns Current-player label markup.
 */
export function renderCurrentPlayer(color: PlayerColor): string {
  return `<span>Current player:</span>
    <span class="current-player__badge current-player__badge--${color}">
      ${pawnIcon('white', 16)}
    </span>`;
}

/**
 * Renders the dimensioned card grid for the current snapshot.
 * @param snapshot - State containing grid dimensions and cards.
 * @param theme - Theme used for card-back motifs.
 * @returns Card-grid markup.
 */
function renderCardGrid(snapshot: GameSnapshot, theme: ThemeDefinition): string {
  const cards = snapshot.cards.map((card) => renderCard(card, snapshot, theme)).join('');
  return `<main class="card-grid" style="--columns: ${snapshot.columns}; --rows: ${snapshot.rows}"
    aria-label="Memory-Karten" data-card-grid>
    ${cards}
  </main>`;
}

/**
 * Renders one card with flip, match, and lock state.
 * @param card - Card state and motif to render.
 * @param snapshot - Current state supplying the board lock.
 * @param theme - Theme used for the card back.
 * @returns Memory-card button markup.
 */
function renderCard(card: CardData, snapshot: GameSnapshot, theme: ThemeDefinition): string {
  const openClass = card.isFlipped || card.isMatched ? 'is-flipped' : '';
  const matchedClass = card.isMatched ? 'is-matched' : '';
  const disabled = card.isMatched || snapshot.isLocked ? 'disabled' : '';
  return `<button type="button" class="memory-card ${openClass} ${matchedClass}"
    data-card-id="${card.id}" ${disabled} aria-label="Karte ${card.id + 1}">
    <span class="memory-card__inner">
      <span class="memory-card__face memory-card__face--back">${renderBackMotif(theme)}</span>
      <span class="memory-card__face memory-card__face--front">
        <span class="memory-card__motif">${renderMotif(card.motif)}</span>
      </span>
    </span>
  </button>`;
}

/**
 * Renders the optional motif displayed on card backs.
 * @param theme - Theme that may define a back motif.
 * @returns Back-motif markup, or an empty string when absent.
 */
function renderBackMotif(theme: ThemeDefinition): string {
  if (!theme.cardBackMotif) return '';
  return `<span class="memory-card__back-motif">${renderMotif(theme.cardBackMotif)}</span>`;
}
