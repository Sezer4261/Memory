import { GRID_CONFIGS, THEMES } from '../data/themes';
import type {
  CardData,
  GameSettings,
  GameSnapshot,
  PlayerColor,
  PlayerState,
} from '../types';
import { shuffle } from '../utils/shuffle';
import { soundEffects } from '../utils/sound';

const MATCH_DELAY_MS = 380;
const MISMATCH_DELAY_MS = 520;

/**
 * Core Memory game engine: board creation, flips, scoring and turn order.
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

  constructor(settings: GameSettings) {
    this.settings = settings;
    const secondColor: PlayerColor =
      settings.playerColor === 'orange' ? 'blue' : 'orange';

    this.players = [
      { color: settings.playerColor, score: 0 },
      { color: secondColor, score: 0 },
    ];

    this.createBoard();
  }

  public setChangeListener(listener: (snapshot: GameSnapshot) => void): void {
    this.onChange = listener;
    this.emit();
  }

  public getSnapshot(): GameSnapshot {
    return {
      cards: this.cards.map((card) => ({ ...card })),
      columns: this.columns,
      rows: this.rows,
      players: [
        { ...this.players[0] },
        { ...this.players[1] },
      ],
      currentPlayerIndex: this.currentPlayerIndex,
      matchedPairs: this.matchedPairs,
      totalPairs: this.totalPairs,
      isLocked: this.isLocked,
      isFinished: this.isFinished,
    };
  }

  public flipCard(cardId: number): void {
    if (this.isLocked || this.isFinished) {
      return;
    }

    const card = this.cards.find((entry) => entry.id === cardId);

    if (!card || card.isFlipped || card.isMatched) {
      return;
    }

    if (this.flippedIds.length >= 2) {
      return;
    }

    card.isFlipped = true;
    this.flippedIds.push(card.id);
    this.emit();

    if (this.flippedIds.length === 2) {
      this.isLocked = true;
      this.emit();
      void this.resolveTurn();
    }
  }

  private createBoard(): void {
    const grid = GRID_CONFIGS[this.settings.gridSize];
    const theme = THEMES[this.settings.themeId];
    const motifs = theme.motifs.slice(0, grid.pairCount);

    this.columns = grid.columns;
    this.rows = grid.rows;
    this.totalPairs = grid.pairCount;
    this.matchedPairs = 0;
    this.flippedIds = [];
    this.isLocked = false;
    this.isFinished = false;

    const pairCards: CardData[] = [];
    let nextId = 0;

    motifs.forEach((motif, pairId) => {
      pairCards.push(
        {
          id: nextId,
          pairId,
          motif,
          isFlipped: false,
          isMatched: false,
        },
        {
          id: nextId + 1,
          pairId,
          motif,
          isFlipped: false,
          isMatched: false,
        },
      );
      nextId += 2;
    });

    this.cards = shuffle(pairCards);
  }

  private async resolveTurn(): Promise<void> {
    const [firstId, secondId] = this.flippedIds;
    const firstCard = this.cards.find((card) => card.id === firstId);
    const secondCard = this.cards.find((card) => card.id === secondId);

    if (!firstCard || !secondCard) {
      this.isLocked = false;
      this.flippedIds = [];
      this.emit();
      return;
    }

    const isMatch = firstCard.pairId === secondCard.pairId;

    if (isMatch) {
      soundEffects.playMatch();
    } else {
      soundEffects.playMismatch();
    }

    await this.wait(isMatch ? MATCH_DELAY_MS : MISMATCH_DELAY_MS);

    if (isMatch) {
      firstCard.isMatched = true;
      secondCard.isMatched = true;
      this.players[this.currentPlayerIndex].score += 1;
      this.matchedPairs += 1;

      if (this.matchedPairs >= this.totalPairs) {
        this.isFinished = true;
      }
    } else {
      firstCard.isFlipped = false;
      secondCard.isFlipped = false;
      this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
    }

    this.flippedIds = [];
    this.isLocked = false;
    this.emit();
  }

  private wait(durationMs: number): Promise<void> {
    return new Promise((resolve) => {
      window.setTimeout(resolve, durationMs);
    });
  }

  private emit(): void {
    this.onChange?.(this.getSnapshot());
  }
}
