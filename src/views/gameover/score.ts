/**
 * Renders the final-score interstitial and schedules result continuation.
 * @module views/gameover/score
 */
import { pawnIcon } from '../../components/icons';
import { THEMES } from '../../data/themes';
import type { GameSettings, GameSnapshot, PlayerState } from '../../types';
import type { GameOverViewCallbacks } from '../GameOverView';
import { END_PALETTE } from './palette';

/** Score-reading interval before the result phase begins. */
const AUTO_CONTINUE_MS = 2200;

/**
 * Mounts the final-score phase and starts its automatic continuation.
 * @param root - Host element that receives the score screen.
 * @param settings - Completed game's theme and board settings.
 * @param snapshot - Final game state containing both scores.
 * @param callbacks - Actions used to continue to the result phase.
 * @returns Browser timer identifier for the scheduled continuation.
 */
export function renderScorePhase(
  root: HTMLElement,
  settings: GameSettings,
  snapshot: GameSnapshot,
  callbacks: GameOverViewCallbacks,
): number {
  root.innerHTML = renderScoreScreen(settings, snapshot);
  // Preserve the 2.2 s score-reading window before announcing the result.
  return window.setTimeout(() => callbacks.onContinue(), AUTO_CONTINUE_MS);
}

/**
 * Builds the themed final-score screen.
 * @param settings - Completed game's settings.
 * @param snapshot - Final state containing both player scores.
 * @returns Final-score screen markup.
 */
function renderScoreScreen(settings: GameSettings, snapshot: GameSnapshot): string {
  const themeId = settings.themeId;
  const palette = END_PALETTE[themeId];
  const title = themeId === 'code' ? 'Game over' : 'GAME OVER';
  return `<section class="screen screen--gameover screen--gameover-score theme-${themeId}"
    aria-label="Spielende"
    style="--end-bg: ${palette.scoreBg}; --end-title: ${palette.titleColor}; --end-sub: ${palette.subtitleColor}; --theme-accent: ${THEMES[themeId].accent}">
    <main class="gameover-panel gameover-anim">
      <h1 class="gameover-title gameover-anim__item gameover-anim__item--1">${title}</h1>
      <p class="gameover-subtitle gameover-anim__item gameover-anim__item--2">Final score</p>
      <ul class="gameover-scores gameover-anim__item gameover-anim__item--3" aria-label="Endstand">${renderScores(snapshot.players)}</ul>
    </main>
  </section>`;
}

/**
 * Renders both final score entries in stable player order.
 * @param players - Final two-player states.
 * @returns Score list-item markup.
 */
function renderScores(players: [PlayerState, PlayerState]): string {
  return players.map((player) => `
    <li class="gameover-score gameover-score--${player.color}">
      ${pawnIcon('white', 22)}
      <span class="gameover-score__value">${player.score}</span>
    </li>`).join('');
}
