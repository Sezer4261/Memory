/**
 * Shared domain types for the Memory game.
 */

export type PlayerColor = 'orange' | 'blue';

export type GridSize = '4x4' | '4x6' | '6x6';

export type ThemeId = 'code' | 'gaming' | 'da' | 'food';

export type AppScreen = 'home' | 'settings' | 'game' | 'gameover';

export interface ThemeDefinition {
  id: ThemeId;
  label: string;
  shortLabel: string;
  description: string;
  cardBack: string;
  cardBackGradient: string;
  accent: string;
  boardBackground: string;
  headerBackground: string;
  shellBackground: string;
  textOnBoard: string;
  motifs: string[];
}

export interface GameSettings {
  playerColor: PlayerColor;
  gridSize: GridSize;
  themeId: ThemeId;
}

export interface CardData {
  id: number;
  pairId: number;
  motif: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface PlayerState {
  color: PlayerColor;
  score: number;
}

export interface GameSnapshot {
  cards: CardData[];
  columns: number;
  rows: number;
  players: [PlayerState, PlayerState];
  currentPlayerIndex: 0 | 1;
  matchedPairs: number;
  totalPairs: number;
  isLocked: boolean;
  isFinished: boolean;
}

export interface GridConfig {
  columns: number;
  rows: number;
  pairCount: number;
}
