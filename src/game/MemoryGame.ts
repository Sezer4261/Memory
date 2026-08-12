/**
 * Implements Memory card rules, turn resolution, scoring, and state updates.
 */
import type {
  CardData,
  GameSettings,
  GameSnapshot,
  PlayerColor,
  PlayerState,
} from '../types';
import { soundEffects } from '../utils/sound';
import { createBoard } from './board';

const MATCH_DELAY_MS = 380;
const MISMATCH_DELAY_MS = 520;

/**
 * Creates the two score entries with distinct player colors.
 *
 * @param settings - Game settings containing the first player's color.
 * @returns Player states in fixed turn-order positions.
 */
function createPlayers(settings: GameSettings): [PlayerState, PlayerState] {
  const secondColor: PlayerColor =
    settings.playerColor === 'orange' ? 'blue' : 'orange';
  return [
    { color: settings.playerColor, score: 0 },
    { color: secondColor, score: 0 },
  ];
}

/**
 * Runs the Memory game independently from rendering and navigation.
 */
export class MemoryGame {
  private readonly settings: GameSettings;
  private cards: CardData[] = [];
  private players: [PlayerState, PlayerState];
  private currentPlayerIndex: 0 | 1 = 0;
  private flippedIds: number[] = [];
  private matchedPairs = 0;
  private totalPairs = 0;
  private columns = 0;
  private rows = 0;
  private isLocked = false;
  private isFinished = false;
  private onChange: ((snapshot: GameSnapshot) => void) | null = null;

  /**
   * Creates a new shuffled game using the supplied settings.
   *
   * @param settings - Board, theme, and player configuration for the game.
   */
  constructor(settings: GameSettings) {
    this.settings = settings;
    this.players = createPlayers(settings);
    this.resetBoard();
  }

  /**
   * Registers the state listener and immediately emits the current state.
   *
   * @param listener - Consumer notified after observable state changes.
   */
  public setChangeListener(listener: (snapshot: GameSnapshot) => void): void {
    this.onChange = listener;
    this.emit();
  }

  /**
   * Creates a defensive snapshot of the current game state.
   *
   * @returns Cloned cards, players, board metadata, and turn status.
   */
  public getSnapshot(): GameSnapshot {
    return {
      cards: this.cards.map((card) => ({ ...card })),
      columns: this.columns,
      rows: this.rows,
      players: [{ ...this.players[0] }, { ...this.players[1] }],
      currentPlayerIndex: this.currentPlayerIndex,
      matchedPairs: this.matchedPairs,
      totalPairs: this.totalPairs,
      isLocked: this.isLocked,
      isFinished: this.isFinished,
    };
  }

  /**
   * Flips an eligible card and resolves the turn after the second flip.
   *
   * @param cardId - Unique identifier of the card selected by the player.
   */
  public flipCard(cardId: number): void {
    if (this.isLocked || this.isFinished) return;
    const card = this.cards.find((entry) => entry.id === cardId);
    if (!card || !this.canFlip(card)) {
      return;
    }
    card.isFlipped = true;
    this.flippedIds.push(card.id);
    this.emit();
    if (this.flippedIds.length === 2) {
      this.beginTurnResolution();
    }
  }

  /**
   * Determines whether a card can join the current selection.
   *
   * @param card - Candidate card from the active board.
   * @returns Whether the card is face-down, unmatched, and selectable.
   */
  private canFlip(card: CardData): boolean {
    return !card.isFlipped && !card.isMatched && this.flippedIds.length < 2;
  }

  /** Locks input and starts asynchronous resolution of the selected pair. */
  private beginTurnResolution(): void {
    this.isLocked = true;
    this.emit();
    void this.resolveTurn();
  }

  /** Replaces board-dependent state with a fresh shuffled setup. */
  private resetBoard(): void {
    const board = createBoard(this.settings);
    this.cards = board.cards;
    this.columns = board.columns;
    this.rows = board.rows;
    this.totalPairs = board.totalPairs;
    this.matchedPairs = 0;
    this.flippedIds = [];
    this.isLocked = false;
    this.isFinished = false;
  }

  /** Resolves the selected pair after its result has remained visible. */
  private async resolveTurn(): Promise<void> {
    const pair = this.getFlippedPair();
    if (!pair) {
      this.recoverInvalidTurn();
      return;
    }
    const [firstCard, secondCard] = pair;
    const isMatch = firstCard.pairId === secondCard.pairId;
    this.playResultSound(isMatch);
    // Keep both cards visible long enough for the result to register.
    await this.wait(isMatch ? MATCH_DELAY_MS : MISMATCH_DELAY_MS);
    this.applyResult(firstCard, secondCard, isMatch);
    this.finishResolution();
  }

  /**
   * Resolves selected card identifiers to their board entries.
   *
   * @returns The selected pair, or `null` if either card is unavailable.
   */
  private getFlippedPair(): [CardData, CardData] | null {
    const [firstId, secondId] = this.flippedIds;
    const firstCard = this.cards.find((card) => card.id === firstId);
    const secondCard = this.cards.find((card) => card.id === secondId);
    return firstCard && secondCard ? [firstCard, secondCard] : null;
  }

  /**
   * Plays the feedback sound associated with a turn result.
   *
   * @param isMatch - Whether the selected cards form a pair.
   */
  private playResultSound(isMatch: boolean): void {
    if (isMatch) {
      soundEffects.playMatch();
      return;
    }
    soundEffects.playMismatch();
  }

  /**
   * Applies either matching or mismatching state transitions.
   *
   * @param firstCard - First selected card.
   * @param secondCard - Second selected card.
   * @param isMatch - Whether both cards share a pair identifier.
   */
  private applyResult(
    firstCard: CardData,
    secondCard: CardData,
    isMatch: boolean,
  ): void {
    if (isMatch) {
      this.applyMatch(firstCard, secondCard);
      return;
    }
    this.applyMismatch(firstCard, secondCard);
  }

  /**
   * Marks a pair complete and awards it to the current player.
   *
   * @param firstCard - First card in the matched pair.
   * @param secondCard - Second card in the matched pair.
   */
  private applyMatch(firstCard: CardData, secondCard: CardData): void {
    firstCard.isMatched = true;
    secondCard.isMatched = true;
    this.players[this.currentPlayerIndex].score += 1;
    this.matchedPairs += 1;
    this.isFinished = this.matchedPairs >= this.totalPairs;
  }

  /**
   * Hides a mismatched pair and passes control to the other player.
   *
   * @param firstCard - First card in the mismatched selection.
   * @param secondCard - Second card in the mismatched selection.
   */
  private applyMismatch(firstCard: CardData, secondCard: CardData): void {
    firstCard.isFlipped = false;
    secondCard.isFlipped = false;
    this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
  }

  /** Unlocks the game if selected cards can no longer be resolved. */
  private recoverInvalidTurn(): void {
    this.isLocked = false;
    this.flippedIds = [];
    this.emit();
  }

  /** Clears the selection, unlocks input, and publishes resolved state. */
  private finishResolution(): void {
    this.flippedIds = [];
    this.isLocked = false;
    this.emit();
  }

  /**
   * Delays turn mutation so both selected cards remain visible.
   *
   * @param durationMs - Delay duration in milliseconds.
   * @returns Promise fulfilled after the browser timer expires.
   */
  private wait(durationMs: number): Promise<void> {
    return new Promise((resolve) => window.setTimeout(resolve, durationMs));
  }

  /** Publishes a defensive snapshot to the registered listener. */
  private emit(): void {
    this.onChange?.(this.getSnapshot());
  }
}
