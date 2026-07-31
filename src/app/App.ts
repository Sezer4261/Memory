import { DEFAULT_SETTINGS } from '../data/themes';
import { MemoryGame } from '../game/MemoryGame';
import type { AppScreen, GameSettings, GameSnapshot } from '../types';
import {
  renderGameOverView,
  type GameOverPhase,
} from '../views/GameOverView';
import { renderGameView } from '../views/GameView';
import { renderHomeView } from '../views/HomeView';
import { renderSettingsView } from '../views/SettingsView';

/**
 * Application controller – navigation, game instance and end-screen flow.
 */
export class App {
  private readonly root: HTMLElement;
  private screen: AppScreen = 'home';
  private settings: GameSettings = { ...DEFAULT_SETTINGS };
  private game: MemoryGame | null = null;
  private latestSnapshot: GameSnapshot | null = null;
  private showExitDialog = false;
  private gameOverPhase: GameOverPhase = 'score';
  private gameOverTimer: number | null = null;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  public start(): void {
    this.showHome();
  }

  private clearGameOverTimer(): void {
    if (this.gameOverTimer !== null) {
      window.clearTimeout(this.gameOverTimer);
      this.gameOverTimer = null;
    }
  }

  private showHome(): void {
    this.clearGameOverTimer();
    this.screen = 'home';
    this.game = null;
    this.latestSnapshot = null;
    this.showExitDialog = false;
    renderHomeView(this.root, {
      onStart: () => {
        this.showSettings();
      },
    });
  }

  private showSettings(): void {
    this.clearGameOverTimer();
    this.screen = 'settings';
    this.game = null;
    this.showExitDialog = false;
    renderSettingsView(this.root, this.settings, {
      onBack: () => {
        this.showHome();
      },
      onPlay: (nextSettings: GameSettings) => {
        this.settings = nextSettings;
        this.startGame();
      },
    });
  }

  private startGame(): void {
    this.clearGameOverTimer();
    this.screen = 'game';
    this.showExitDialog = false;
    this.gameOverPhase = 'score';
    this.game = new MemoryGame(this.settings);
    this.game.setChangeListener((snapshot: GameSnapshot) => {
      this.latestSnapshot = snapshot;
      this.paintGame();
    });
  }

  private paintGame(): void {
    if (this.screen !== 'game' || !this.latestSnapshot) {
      return;
    }

    renderGameView(
      this.root,
      this.settings,
      this.latestSnapshot,
      {
        onExitRequest: () => {
          this.showExitDialog = true;
          this.paintGame();
        },
        onExitConfirm: () => {
          this.showSettings();
        },
        onExitCancel: () => {
          this.showExitDialog = false;
          this.paintGame();
        },
        onCardClick: (cardId: number) => {
          if (this.showExitDialog) {
            return;
          }
          this.game?.flipCard(cardId);
        },
        onFinished: (finishedSnapshot: GameSnapshot) => {
          this.showGameOver(finishedSnapshot);
        },
      },
      this.showExitDialog,
    );
  }

  private showGameOver(snapshot: GameSnapshot): void {
    this.clearGameOverTimer();
    this.screen = 'gameover';
    this.game = null;
    this.latestSnapshot = snapshot;
    this.gameOverPhase = 'score';
    this.paintGameOver();
  }

  private paintGameOver(): void {
    if (this.screen !== 'gameover' || !this.latestSnapshot) {
      return;
    }

    this.clearGameOverTimer();

    this.gameOverTimer = renderGameOverView(
      this.root,
      this.settings,
      this.latestSnapshot,
      this.gameOverPhase,
      {
        onContinue: () => {
          this.clearGameOverTimer();
          this.gameOverPhase = 'result';
          this.paintGameOver();
        },
        onReplay: () => {
          this.startGame();
        },
        onHome: () => {
          this.showHome();
        },
      },
    );
  }
}
