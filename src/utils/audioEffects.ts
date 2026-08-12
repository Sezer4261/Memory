/**
 * Builds and schedules synthesized feedback sounds with the Web Audio API.
 */

/**
 * Routes an oscillator through gain control to the audio destination.
 *
 * @param oscillator - Tone source to connect.
 * @param gain - Output envelope for the tone.
 * @param context - Audio context whose destination receives the tone.
 */
function connectTone(
  oscillator: OscillatorNode,
  gain: GainNode,
  context: AudioContext,
): void {
  oscillator.connect(gain);
  gain.connect(context.destination);
}

/**
 * Schedules the lifetime of an oscillator.
 *
 * @param oscillator - Tone source to schedule.
 * @param start - Audio-context time at which playback begins.
 * @param stop - Audio-context time at which playback ends.
 */
function startTone(oscillator: OscillatorNode, start: number, stop: number): void {
  oscillator.start(start);
  oscillator.stop(stop);
}

/**
 * Applies the descending pitch contour used by the flip sound.
 *
 * @param oscillator - Oscillator to configure.
 * @param now - Effect start time in the audio context.
 * @param duration - Length of the pitch ramp in seconds.
 */
function configureWhooshOscillator(
  oscillator: OscillatorNode,
  now: number,
  duration: number,
): void {
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(620, now);
  oscillator.frequency.exponentialRampToValueAtTime(180, now + duration);
}

/**
 * Applies the closing low-pass sweep used by the flip sound.
 *
 * @param filter - Filter to configure.
 * @param now - Effect start time in the audio context.
 * @param duration - Length of the filter sweep in seconds.
 */
function configureWhooshFilter(
  filter: BiquadFilterNode,
  now: number,
  duration: number,
): void {
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(2400, now);
  filter.frequency.exponentialRampToValueAtTime(500, now + duration);
}

/**
 * Applies the attack and decay envelope used by the flip sound.
 *
 * @param gain - Gain node to configure.
 * @param now - Effect start time in the audio context.
 * @param duration - Length of the envelope in seconds.
 */
function configureWhooshGain(
  gain: GainNode,
  now: number,
  duration: number,
): void {
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.08, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
}

/**
 * Schedules the card-flip whoosh on an active audio context.
 *
 * @param context - Active context on which to build and play the effect.
 */
export function playWhoosh(context: AudioContext): void {
  const duration = 0.16;
  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();
  configureWhooshOscillator(oscillator, now, duration);
  configureWhooshFilter(filter, now, duration);
  configureWhooshGain(gain, now, duration);
  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);
  startTone(oscillator, now, now + duration + 0.02);
}

/**
 * Applies the short attack and decay envelope used by a chime note.
 *
 * @param gain - Gain node to configure.
 * @param start - Note start time in the audio context.
 */
function configureBlingGain(gain: GainNode, start: number): void {
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(0.11, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);
}

/**
 * Schedules one note in the match chime.
 *
 * @param context - Active context on which to create the note.
 * @param frequency - Note frequency in hertz.
 * @param start - Note start time in the audio context.
 */
function playBlingNote(
  context: AudioContext,
  frequency: number,
  start: number,
): void {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, start);
  configureBlingGain(gain, start);
  connectTone(oscillator, gain, context);
  startTone(oscillator, start, start + 0.24);
}

/**
 * Schedules the three-note match chime on an active audio context.
 *
 * @param context - Active context on which to build and play the effect.
 */
export function playBling(context: AudioContext): void {
  const now = context.currentTime;
  const notes = [880, 1320, 1760];
  notes.forEach((frequency, index) => {
    playBlingNote(context, frequency, now + index * 0.05);
  });
}

/**
 * Configures the detuned sawtooth sources used by the buzzer.
 *
 * @param first - First oscillator in the detuned pair.
 * @param second - Second oscillator in the detuned pair.
 * @param now - Effect start time in the audio context.
 */
function configureBuzzerOscillators(
  first: OscillatorNode,
  second: OscillatorNode,
  now: number,
): void {
  first.type = 'sawtooth';
  second.type = 'sawtooth';
  first.frequency.setValueAtTime(140, now);
  second.frequency.setValueAtTime(148, now);
}

/**
 * Configures the band-pass filter that shapes the buzzer.
 *
 * @param filter - Filter to configure.
 * @param now - Effect start time in the audio context.
 */
function configureBuzzerFilter(filter: BiquadFilterNode, now: number): void {
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(420, now);
  filter.Q.setValueAtTime(4, now);
}

/**
 * Applies the attack, sustain, and decay envelope used by the buzzer.
 *
 * @param gain - Gain node to configure.
 * @param now - Effect start time in the audio context.
 * @param duration - Length of the envelope in seconds.
 */
function configureBuzzerGain(
  gain: GainNode,
  now: number,
  duration: number,
): void {
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.14, now + 0.02);
  gain.gain.setValueAtTime(0.12, now + 0.18);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
}

/**
 * Routes both buzzer oscillators through shared filtering and gain.
 *
 * @param first - First oscillator to connect.
 * @param second - Second oscillator to connect.
 * @param filter - Shared tone-shaping filter.
 * @param gain - Shared output envelope.
 * @param context - Audio context whose destination receives the effect.
 */
function connectBuzzer(
  first: OscillatorNode,
  second: OscillatorNode,
  filter: BiquadFilterNode,
  gain: GainNode,
  context: AudioContext,
): void {
  first.connect(filter);
  second.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);
}

/**
 * Starts both buzzer sources together and schedules their stop time.
 *
 * @param first - First oscillator to schedule.
 * @param second - Second oscillator to schedule.
 * @param now - Audio-context time at which playback begins.
 * @param stop - Audio-context time at which playback ends.
 */
function startBuzzer(
  first: OscillatorNode,
  second: OscillatorNode,
  now: number,
  stop: number,
): void {
  first.start(now);
  second.start(now);
  first.stop(stop);
  second.stop(stop);
}

/**
 * Schedules the mismatch buzzer on an active audio context.
 *
 * @param context - Active context on which to build and play the effect.
 */
export function playBuzzer(context: AudioContext): void {
  const now = context.currentTime;
  const duration = 0.38;
  const first = context.createOscillator();
  const second = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();
  configureBuzzerOscillators(first, second, now);
  configureBuzzerFilter(filter, now);
  configureBuzzerGain(gain, now, duration);
  connectBuzzer(first, second, filter, gain, context);
  startBuzzer(first, second, now, now + duration + 0.02);
}
