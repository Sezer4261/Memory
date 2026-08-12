/**
 * Renders theme-aware winner and draw outcomes for a completed game.
 * @module views/gameover/result
 */
import { confettiStrip, largePawnIcon, scalesIcon, trophyIcon } from '../../components/icons';
import { THEMES } from '../../data/themes';
import type { GameSnapshot, PlayerColor, PlayerState, ThemeId } from '../../types';
import { END_PALETTE } from './palette';
import type { EndPalette } from './palette';

/**
 * Renders the winner or draw result for the selected theme.
 * @param themeId - Theme controlling result copy, colors, and icons.
 * @param snapshot - Final state used to resolve the winner.
 * @returns Winner or draw screen markup.
 */
export function renderResultPhase(themeId: ThemeId, snapshot: GameSnapshot): string {
  const winner = resolveWinner(snapshot.players);
  const palette = END_PALETTE[themeId];
  return winner ? renderWinnerScreen(themeId, palette, winner) : renderDrawScreen(themeId, palette);
}

/**
 * Renders the winner announcement for one player.
 * @param themeId - Theme controlling result presentation.
 * @param palette - End-screen colors for the theme.
 * @param winner - Player with the greater final score.
 * @returns Winner-screen markup.
 */
function renderWinnerScreen(themeId: ThemeId, palette: EndPalette, winner: PlayerState): string {
  const winnerColor = winner.color === 'orange' ? '#ff9800' : '#4fc3f7';
  return `<section class="screen screen--gameover screen--result screen--winner theme-${themeId}"
    aria-label="Gewinner" style="${winnerStyle(themeId, palette, winnerColor)}">
    ${renderConfetti(themeId)}
    <main class="result-panel result-anim">
      <p class="result-eyebrow result-anim__item result-anim__item--1">The winner is</p>
      <h1 class="result-winner result-anim__item result-anim__item--2">${winnerLabel(themeId, winner.color)}</h1>
      ${renderWinnerIcon(themeId, winner.color)}
      ${renderHomeButton(themeId, winner.color)}
    </main>
  </section>`;
}

/**
 * Builds winner-screen custom properties, including the winning color.
 * @param themeId - Active theme identifier.
 * @param palette - End-screen colors for the theme.
 * @param winnerColor - CSS color representing the winner.
 * @returns Inline winner-screen style declaration.
 */
function winnerStyle(themeId: ThemeId, palette: EndPalette, winnerColor: string): string {
  const subtitle = themeId === 'food' ? '#c4783f' : '#ffffff';
  return `--end-bg: ${palette.resultBg}; --end-title: ${palette.titleColor}; --end-sub: ${subtitle}; --theme-accent: ${THEMES[themeId].accent}; --winner-color: ${winnerColor}`;
}

/**
 * Formats a player label according to theme typography.
 * @param themeId - Active theme identifier.
 * @param color - Winning player's color.
 * @returns Theme-appropriate winner label.
 */
function winnerLabel(themeId: ThemeId, color: PlayerColor): string {
  if (themeId === 'code') return color === 'orange' ? 'ORANGE PLAYER' : 'BLUE PLAYER';
  return color === 'orange' ? 'Orange Player' : 'Blue Player';
}

/**
 * Selects and wraps the winner icon for the active theme.
 * @param themeId - Active theme identifier.
 * @param color - Winning player's color.
 * @returns Winner-icon markup.
 */
function renderWinnerIcon(themeId: ThemeId, color: PlayerColor): string {
  const outlined = themeId === 'da' || themeId === 'food';
  const icon = themeId === 'gaming' ? trophyIcon() : largePawnIcon(color, outlined);
  if (themeId === 'food') {
    return `<div class="result-icon-card result-anim__item result-anim__item--3"><p class="result-icon">${icon}</p></div>`;
  }
  return `<p class="result-icon result-anim__item result-anim__item--3">${icon}</p>`;
}

/**
 * Renders the code theme's decorative confetti.
 * @param themeId - Active theme identifier.
 * @returns Confetti markup for the code theme, otherwise an empty string.
 */
function renderConfetti(themeId: ThemeId): string {
  if (themeId !== 'code') return '';
  return `${confettiStrip()}
    <span class="confetti-burst" aria-hidden="true">
      ${Array.from({ length: 22 }, (_, index) => renderConfettiPiece(index)).join('')}
    </span>`;
}

/**
 * Creates one deterministic animated confetti piece.
 * @param index - Piece index used to derive color, position, and timing.
 * @returns Confetti-piece markup.
 */
function renderConfettiPiece(index: number): string {
  const colors = ['#ef4444', '#fbbf24', '#22d3ee', '#3b82f6', '#a3e635', '#f472b6'];
  const color = colors[index % colors.length];
  const left = 6 + (index * 4.1) % 88;
  const delay = (index % 8) * 0.07;
  const duration = 1.35 + (index % 5) * 0.12;
  return `<span class="confetti-burst__piece" style="left:${left}%;background:${color};animation-delay:${delay}s;animation-duration:${duration}s"></span>`;
}

/**
 * Renders a draw result for the active theme.
 * @param themeId - Theme controlling result presentation.
 * @param palette - End-screen colors for the theme.
 * @returns Draw-screen markup.
 */
function renderDrawScreen(themeId: ThemeId, palette: EndPalette): string {
  return `<section class="screen screen--gameover screen--result screen--draw theme-${themeId}"
    aria-label="Unentschieden" style="${drawStyle(themeId, palette)}">
    <main class="result-panel result-anim">
      <h1 class="result-title result-anim__item result-anim__item--1">It's a DRAW</h1>
      ${renderDrawIcon(themeId)}
      ${renderHomeButton(themeId, 'orange')}
    </main>
  </section>`;
}

/**
 * Builds theme-specific draw-screen custom properties.
 * @param themeId - Active theme identifier.
 * @param palette - End-screen colors for the theme.
 * @returns Inline draw-screen style declaration.
 */
function drawStyle(themeId: ThemeId, palette: EndPalette): string {
  const title = themeId === 'food' ? '#ff8c32' : themeId === 'da' ? '#ff8a1f' : palette.titleColor;
  const subtitle = themeId === 'food' ? '#ff8c32' : '#ffffff';
  return `--end-bg: ${palette.resultBg}; --end-title: ${title}; --end-sub: ${subtitle}; --theme-accent: ${THEMES[themeId].accent}`;
}

/**
 * Selects and wraps the draw icon for the active theme.
 * @param themeId - Active theme identifier.
 * @returns Draw-icon markup.
 */
function renderDrawIcon(themeId: ThemeId): string {
  const outlined = themeId === 'da' || themeId === 'food';
  const icon = scalesIcon(outlined);
  if (themeId === 'food') {
    return `<div class="result-icon-card result-anim__item result-anim__item--2"><p class="result-icon result-icon--draw">${icon}</p></div>`;
  }
  return `<p class="result-icon result-icon--draw result-anim__item result-anim__item--2">${icon}</p>`;
}

/**
 * Renders the theme-specific home navigation button.
 * @param themeId - Active theme identifier.
 * @param accentPlayer - Player color used by the food-theme button.
 * @returns Home-button markup.
 */
function renderHomeButton(themeId: ThemeId, accentPlayer: PlayerColor): string {
  if (themeId === 'code') return endButton('btn--end-link', 'Back to start');
  if (themeId === 'gaming') return endButton('btn--end-fill', 'Home');
  if (themeId === 'da') return endButton('btn--end-light', 'Home');
  const fill = accentPlayer === 'blue' ? '#4fc3f7' : '#ff8c32';
  return `<button type="button" class="btn btn--end-fill result-anim__item result-anim__item--4"
    data-action="home" style="--end-btn-bg: ${fill}">Home</button>`;
}

/**
 * Renders a standard end-screen navigation button.
 * @param variant - CSS variant class applied to the button.
 * @param label - Visible button label.
 * @returns Home-button markup.
 */
function endButton(variant: string, label: string): string {
  return `<button type="button" class="btn ${variant} result-anim__item result-anim__item--4"
    data-action="home">${label}</button>`;
}

/**
 * Resolves the higher-scoring player without changing player order.
 * @param players - Final two-player states.
 * @returns The winner, or `null` when both scores are equal.
 */
function resolveWinner(players: [PlayerState, PlayerState]): PlayerState | null {
  if (players[0].score === players[1].score) return null;
  return players[0].score > players[1].score ? players[0] : players[1];
}
