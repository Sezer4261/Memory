/**
 * Coordinates screen navigation, game lifecycle, and application-level state.
 */
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

type GameCallbacks = Parameters<typeof renderGameView>[3];
type GameOverCallbacks = Parameters<typeof renderGameOverView>[4];

/**
 * Controls navigation, the active game instance, and the end-screen flow.
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

  /**
   * Creates an application controller.
   *
   * @param root - Element into which each application screen is rendered.
   */
  constructor(root: HTMLElement) {
    this.root = root;
  }

  /** Starts the application on the home screen. */
  public start(): void {
    this.showHome();
  }

  /** Cancels any pending transition owned by the game-over screen. */
  private clearGameOverTimer(): void {
    if (this.gameOverTimer !== null) {
      window.clearTimeout(this.gameOverTimer);
      this.gameOverTimer = null;
    }
  }

  /** Resets transient game state and renders the home screen. */
  private showHome(): void {
    this.clearGameOverTimer();
    this.screen = 'home';
    this.game = null;
    this.latestSnapshot = null;
    this.showExitDialog = false;
    renderHomeView(this.root, this.homeCallbacks());
  }

  /**
   * Builds event handlers for the home screen.
   *
   * @returns Callbacks that route home-screen actions.
   */
  private homeCallbacks() {
    return { onStart: () => this.showSettings() };
  }

  /** Clears active play state and renders the settings screen. */
  private showSettings(): void {
    this.clearGameOverTimer();
    this.screen = 'settings';
    this.game = null;
    this.showExitDialog = false;
    renderSettingsView(this.root, this.settings, this.settingsCallbacks());
  }

  /**
   * Builds event handlers for settings navigation and game launch.
   *
   * @returns Callbacks that apply settings or return home.
   */
  private settingsCallbacks() {
    return {
      onBack: () => this.showHome(),
      onPlay: (nextSettings: GameSettings) => {
        this.settings = nextSettings;
        this.startGame();
      },
    };
  }

  /** Creates a game and subscribes the application to its snapshots. */
  private startGame(): void {
    this.clearGameOverTimer();
    this.screen = 'game';
    this.showExitDialog = false;
    this.gameOverPhase = 'score';
    this.game = new MemoryGame(this.settings);
    this.game.setChangeListener((snapshot) => this.updateGame(snapshot));
  }

  /**
   * Stores a game-engine update and refreshes the active game screen.
   *
   * @param snapshot - Latest immutable representation of the game state.
   */
  private updateGame(snapshot: GameSnapshot): void {
    this.latestSnapshot = snapshot;
    this.paintGame();
  }

  /** Renders the game only while complete active-game state is available. */
  private paintGame(): void {
    if (this.screen !== 'game' || !this.latestSnapshot) {
      return;
    }
    renderGameView(
      this.root,
      this.settings,
      this.latestSnapshot,
      this.gameCallbacks(),
      this.showExitDialog,
    );
  }

  /**
   * Builds event handlers used by the game view.
   *
   * @returns Callbacks that bridge view events to the game and navigation.
   */
  private gameCallbacks(): GameCallbacks {
    return {
      onExitRequest: () => this.requestExit(),
      onExitConfirm: () => this.showSettings(),
      onExitCancel: () => this.cancelExit(),
      onCardClick: (cardId) => this.flipCard(cardId),
      onFinished: (snapshot) => this.showGameOver(snapshot),
    };
  }

  /** Opens the in-game exit confirmation without leaving the game. */
  private requestExit(): void {
    this.showExitDialog = true;
    this.paintGame();
  }

  /** Closes the in-game exit confirmation and restores the board view. */
  private cancelExit(): void {
    this.showExitDialog = false;
    this.paintGame();
  }

  /**
   * Delegates an eligible card selection to the active game.
   *
   * @param cardId - Unique identifier of the selected card.
   */
  private flipCard(cardId: number): void {
    if (this.showExitDialog) {
      return;
    }
    this.game?.flipCard(cardId);
  }

  /**
   * Leaves active play and opens the score phase for a finished game.
   *
   * @param snapshot - Final game state used by the game-over screens.
   */
  private showGameOver(snapshot: GameSnapshot): void {
    this.clearGameOverTimer();
    this.screen = 'gameover';
    this.game = null;
    this.latestSnapshot = snapshot;
    this.gameOverPhase = 'score';
    this.paintGameOver();
  }

  /** Renders the current game-over phase and records its transition timer. */
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
      this.gameOverCallbacks(),
    );
  }

  /**
   * Builds navigation handlers for the game-over flow.
   *
   * @returns Callbacks for continuing, replaying, or returning home.
   */
  private gameOverCallbacks(): GameOverCallbacks {
    return {
      onContinue: () => this.showGameResult(),
      onReplay: () => this.startGame(),
      onHome: () => this.showHome(),
    };
  }

  /** Advances the game-over flow from score reveal to final result. */
  private showGameResult(): void {
    // Cancel the score-phase timer before navigating to the result phase.
    this.clearGameOverTimer();
    this.gameOverPhase = 'result';
    this.paintGameOver();
  }
}
