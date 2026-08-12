/**
 * Defines theme-specific presentation colors for game-over phases.
 * @module views/gameover/palette
 */
import type { ThemeId } from '../../types';

/** Theme-specific colors for score and result screens. */
export interface EndPalette {
  /** Background color of the final-score phase. */
  scoreBg: string;
  /** Background color of the winner or draw phase. */
  resultBg: string;
  /** Primary heading color. */
  titleColor: string;
  /** Supporting text color. */
  subtitleColor: string;
}

/** Complete game-over palette lookup keyed by theme identifier. */
export const END_PALETTE: Record<ThemeId, EndPalette> = {
  code: {
    scoreBg: '#2b2b2b',
    resultBg: '#2b2b2b',
    titleColor: '#14b8a6',
    subtitleColor: '#ffffff',
  },
  gaming: {
    scoreBg: '#4a6d82',
    resultBg: '#4a6d82',
    titleColor: '#ec4899',
    subtitleColor: '#ffffff',
  },
  da: {
    scoreBg: '#2f8f9d',
    resultBg: '#2f8f9d',
    titleColor: '#ff8a1f',
    subtitleColor: '#ffffff',
  },
  food: {
    scoreBg: '#ff8c32',
    resultBg: '#f4f2ef',
    titleColor: '#ffffff',
    subtitleColor: '#ffffff',
  },
};
