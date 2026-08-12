/**
 * Exposes persisted mute state and browser-audio playback for UI feedback.
 */
import { playBling, playBuzzer, playWhoosh } from './audioEffects';

const MUTE_STORAGE_KEY = 'memory-muted';
type AudioEffect = (context: AudioContext) => void;

/** Manages lightweight Web Audio effects and a persisted mute preference. */
export class SoundEffects {
  private context: AudioContext | null = null;
  private muted = false;
  private readonly listeners = new Set<(muted: boolean) => void>();

  /** Creates the service and restores the persisted mute preference. */
  constructor() {
    this.muted = window.localStorage.getItem(MUTE_STORAGE_KEY) === '1';
  }

  /**
   * Reports whether sound playback is currently disabled.
   *
   * @returns The current mute preference.
   */
  public isMuted(): boolean {
    return this.muted;
  }

  /**
   * Updates and persists the mute state, notifying all listeners.
   *
   * @param muted - Whether future sound playback should be disabled.
   */
  public setMuted(muted: boolean): void {
    this.muted = muted;
    window.localStorage.setItem(MUTE_STORAGE_KEY, muted ? '1' : '0');
    this.listeners.forEach((listener) => listener(muted));
  }

  /**
   * Toggles the mute state.
   *
   * @returns The updated mute preference.
   */
  public toggleMuted(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  /**
   * Subscribes to mute changes.
   *
   * @param listener - Callback invoked whenever the preference changes.
   * @returns Function that removes the listener.
   */
  public onMuteChange(listener: (muted: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Lazily creates the browser audio context.
   *
   * @returns Shared context used for all generated effects.
   */
  private getContext(): AudioContext {
    if (!this.context) {
      this.context = new AudioContext();
    }

    return this.context;
  }

  /**
   * Obtains a playable context unless sound is muted.
   *
   * @returns A running context, or `null` when playback is disabled.
   */
  private async ensureRunning(): Promise<AudioContext | null> {
    if (this.muted) {
      return null;
    }

    const context = this.getContext();

    if (context.state === 'suspended') {
      await context.resume();
    }

    return context;
  }

  /**
   * Schedules an effect after confirming browser playback is available.
   *
   * @param effect - Audio graph builder to run on the shared context.
   */
  private async play(effect: AudioEffect): Promise<void> {
    const context = await this.ensureRunning();
    if (context) {
      // Schedule only after browsers allow the context to resume.
      effect(context);
    }
  }

  /** Plays a short swipe when a card is flipped. */
  public playFlip(): void {
    void this.play(playWhoosh);
  }

  /** Plays a bright chime for a correct pair. */
  public playMatch(): void {
    void this.play(playBling);
  }

  /** Plays a contest-style buzzer for a wrong pair. */
  public playMismatch(): void {
    void this.play(playBuzzer);
  }
}

/** Shared sound service used by the application UI and game engine. */
export const soundEffects = new SoundEffects();
