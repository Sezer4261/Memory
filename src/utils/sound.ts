/**
 * Lightweight UI sounds via Web Audio API (no external files).
 */
const MUTE_STORAGE_KEY = 'memory-muted';

export class SoundEffects {
  private context: AudioContext | null = null;
  private muted = false;
  private readonly listeners = new Set<(muted: boolean) => void>();

  constructor() {
    this.muted = window.localStorage.getItem(MUTE_STORAGE_KEY) === '1';
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(muted: boolean): void {
    this.muted = muted;
    window.localStorage.setItem(MUTE_STORAGE_KEY, muted ? '1' : '0');
    this.listeners.forEach((listener) => {
      listener(muted);
    });
  }

  public toggleMuted(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  public onMuteChange(listener: (muted: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private getContext(): AudioContext {
    if (!this.context) {
      this.context = new AudioContext();
    }

    return this.context;
  }

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

  /** Short swipe / whoosh when a card is flipped. */
  public playFlip(): void {
    void this.playWhoosh();
  }

  /** Bright “bling” for a correct pair. */
  public playMatch(): void {
    void this.playBling();
  }

  /** Harsh contest-style buzzer for a wrong pair. */
  public playMismatch(): void {
    void this.playBuzzer();
  }

  private async playWhoosh(): Promise<void> {
    const context = await this.ensureRunning();
    if (!context) {
      return;
    }

    const duration = 0.16;
    const now = context.currentTime;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(620, now);
    oscillator.frequency.exponentialRampToValueAtTime(180, now + duration);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, now);
    filter.frequency.exponentialRampToValueAtTime(500, now + duration);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);

    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  }

  private async playBling(): Promise<void> {
    const context = await this.ensureRunning();
    if (!context) {
      return;
    }

    const now = context.currentTime;
    const notes = [880, 1320, 1760];

    notes.forEach((frequency, index) => {
      const start = now + index * 0.05;
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, start);

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.11, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);

      oscillator.connect(gain);
      gain.connect(context.destination);

      oscillator.start(start);
      oscillator.stop(start + 0.24);
    });
  }

  private async playBuzzer(): Promise<void> {
    const context = await this.ensureRunning();
    if (!context) {
      return;
    }

    const now = context.currentTime;
    const duration = 0.38;

    const oscillator = context.createOscillator();
    const oscillator2 = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    oscillator.type = 'sawtooth';
    oscillator2.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(140, now);
    oscillator2.frequency.setValueAtTime(148, now);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(420, now);
    filter.Q.setValueAtTime(4, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.14, now + 0.02);
    gain.gain.setValueAtTime(0.12, now + 0.18);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(filter);
    oscillator2.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);

    oscillator.start(now);
    oscillator2.start(now);
    oscillator.stop(now + duration + 0.02);
    oscillator2.stop(now + duration + 0.02);
  }
}

export const soundEffects = new SoundEffects();
