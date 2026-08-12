/**
 * Builds shuffled card layouts from the selected grid and motif theme.
 */
import { GRID_CONFIGS, THEMES } from '../data/themes';
import type { CardData, GameSettings } from '../types';
import { shuffle } from '../utils/shuffle';

/** Board state required to initialize a game engine. */
export interface BoardSetup {
  cards: CardData[];
  columns: number;
  rows: number;
  totalPairs: number;
}

/**
 * Creates both cards that represent one matching motif.
 *
 * @param motif - Motif content shared by the two cards.
 * @param pairId - Stable identifier used to match the cards.
 * @returns Two face-down cards with unique card identifiers.
 */
function createPair(motif: string, pairId: number): CardData[] {
  const shared = { pairId, motif, isFlipped: false, isMatched: false };
  return [
    { id: pairId * 2, ...shared },
    { id: pairId * 2 + 1, ...shared },
  ];
}

/**
 * Expands a motif list into matching card pairs.
 *
 * @param motifs - Motifs to place on the board.
 * @returns One pair of cards for every supplied motif.
 */
function createPairCards(motifs: string[]): CardData[] {
  return motifs.flatMap((motif, pairId) => createPair(motif, pairId));
}

/**
 * Creates a freshly shuffled board for the supplied settings.
 *
 * @param settings - Grid size and theme used to construct the board.
 * @returns Cards and dimensions required to initialize the game engine.
 */
export function createBoard(settings: GameSettings): BoardSetup {
  const grid = GRID_CONFIGS[settings.gridSize];
  const theme = THEMES[settings.themeId];
  const motifs = theme.motifs.slice(0, grid.pairCount);
  return {
    cards: shuffle(createPairCards(motifs)),
    columns: grid.columns,
    rows: grid.rows,
    totalPairs: grid.pairCount,
  };
}
