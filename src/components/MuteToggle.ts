/**
 * Mounts and synchronizes the persistent global sound toggle.
 */
import { soundEffects } from '../utils/sound';

/**
 * Renders the enabled-sound glyph.
 *
 * @returns Accessible-hidden SVG markup for the speaker icon.
 */
function speakerIcon(): string {
  return `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/>
      <path d="M16 8.5a4.5 4.5 0 010 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M18.5 6a8 8 0 010 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
}

/**
 * Renders the muted-sound glyph.
 *
 * @returns Accessible-hidden SVG markup for the muted speaker icon.
 */
function mutedIcon(): string {
  return `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/>
      <path d="M18 9l-6 6M12 9l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
}

/**
 * Synchronizes button styling, labels, and icon with the mute service.
 *
 * @param button - Persistent mute button to update.
 */
function paintMuteButton(button: HTMLButtonElement): void {
  const muted = soundEffects.isMuted();
  button.classList.toggle('is-muted', muted);
  button.setAttribute('aria-pressed', muted ? 'true' : 'false');
  button.setAttribute('aria-label', muted ? 'Ton einschalten' : 'Ton ausschalten');
  button.title = muted ? 'Ton an' : 'Ton aus';
  button.innerHTML = muted ? mutedIcon() : speakerIcon();
}

/**
 * Creates, appends, and wires the persistent mute button.
 *
 * @returns Newly mounted mute button.
 */
function createMuteButton(): HTMLButtonElement {
  const button = document.createElement('button');
  button.id = 'mute-toggle';
  button.type = 'button';
  button.className = 'mute-toggle';
  document.body.appendChild(button);
  button.addEventListener('click', () => {
    soundEffects.toggleMuted();
  });
  return button;
}

/**
 * Locates the existing mute button or creates it on first use.
 *
 * @returns Persistent mute button attached to the document body.
 */
function getMuteButton(): HTMLButtonElement {
  return (
    document.querySelector<HTMLButtonElement>('#mute-toggle') ??
    createMuteButton()
  );
}

/**
 * Fixed corner mute control – lives outside #app so view re-renders keep it.
 */
export function mountMuteToggle(): void {
  const button = getMuteButton();
  paintMuteButton(button);
  soundEffects.onMuteChange(() => paintMuteButton(button));
}
