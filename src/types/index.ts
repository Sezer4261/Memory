/**
 * Defines shared settings, theme, card, player, and game-state domain types.
 */

/** Color identity assigned to one of the two players. */
export type PlayerColor = 'orange' | 'blue';

/** Supported board dimensions, expressed as columns by rows. */
export type GridSize = '4x4' | '4x6' | '6x6';

/** Stable identifier for a selectable visual theme. */
export type ThemeId = 'code' | 'gaming' | 'da' | 'food';

/** Top-level application screen controlled by the app router. */
export type AppScreen = 'home' | 'settings' | 'game' | 'gameover';

/** Visual tokens and ordered motif pool used to render a themed board. */
export interface ThemeDefinition {
  /** Stable key used to select and persist the theme. */
  id: ThemeId;
  /** Accessible full label shown in theme controls. */
  label: string;
  /** Compact label used where horizontal space is limited. */
  shortLabel: string;
  /** Supporting copy displayed in the theme selector. */
  description: string;
  /** Solid fallback color for the hidden side of a card. */
  cardBack: string;
  /** CSS background value applied to the hidden side of a card. */
  cardBackGradient: string;
  /** Theme highlight color used by interactive UI elements. */
  accent: string;
  /** CSS background value for the game board. */
  boardBackground: string;
  /** CSS background value for the in-game header. */
  headerBackground: string;
  /** CSS background value for the outer game shell. */
  shellBackground: string;
  /** Text color chosen for contrast against the board. */
  textOnBoard: string;
  /** Ordered motif identifiers available when building card pairs. */
  motifs: string[];
  /** Optional motif key rendered on the card back. */
  cardBackMotif?: string;
  /** Front face fill; defaults to white. */
  cardFront?: string;
  /** Motif size as CSS percentage of the card face (e.g. "76%"). */
  motifSize?: string;
  /** Card corner radius (e.g. "10px"). */
  cardRadius?: string;
  /** Card aspect ratio (e.g. "1 / 1" or "3 / 4"). */
  cardAspect?: string;
}

/** Player-selected options required to start a game. */
export interface GameSettings {
  /** Color assigned to the first player. */
  playerColor: PlayerColor;
  /** Board dimensions and pair count to use. */
  gridSize: GridSize;
  /** Visual theme and motif pool to use. */
  themeId: ThemeId;
}

/** Serializable state for one physical card on the board. */
export interface CardData {
  /** Unique card identifier within the current game. */
  id: number;
  /** Shared identifier linking the two cards in a matching pair. */
  pairId: number;
  /** Theme motif identifier rendered on the card front. */
  motif: string;
  /** Whether the card is currently face up. */
  isFlipped: boolean;
  /** Whether the card belongs to an already claimed pair. */
  isMatched: boolean;
}

/** Score and visual identity for one player. */
export interface PlayerState {
  color: PlayerColor;
  /** Number of matching pairs claimed by the player. */
  score: number;
}

/** Read-only-shaped snapshot consumed by game views and state listeners. */
export interface GameSnapshot {
  /** Cards in their current board order and state. */
  cards: CardData[];
  /** Number of card columns in the board. */
  columns: number;
  /** Number of card rows in the board. */
  rows: number;
  /** Fixed two-player state ordered by player index. */
  players: [PlayerState, PlayerState];
  /** Index of the player whose turn is active. */
  currentPlayerIndex: 0 | 1;
  /** Number of pairs claimed by either player. */
  matchedPairs: number;
  /** Number of pairs required to complete the board. */
  totalPairs: number;
  /** Whether card input is temporarily blocked during resolution. */
  isLocked: boolean;
  /** Whether every pair on the board has been matched. */
  isFinished: boolean;
}

/** Numeric dimensions and pair count derived from a grid-size choice. */
export interface GridConfig {
  /** Number of card columns in the board. */
  columns: number;
  /** Number of card rows in the board. */
  rows: number;
  /** Number of unique pairs needed to fill the board. */
  pairCount: number;
}
