import { soundEffects } from '../utils/sound';

function speakerIcon(): string {
  return `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/>
      <path d="M16 8.5a4.5 4.5 0 010 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M18.5 6a8 8 0 010 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
}

function mutedIcon(): string {
  return `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/>
      <path d="M18 9l-6 6M12 9l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
}

function paintMuteButton(button: HTMLButtonElement): void {
  const muted = soundEffects.isMuted();
  button.classList.toggle('is-muted', muted);
  button.setAttribute('aria-pressed', muted ? 'true' : 'false');
  button.setAttribute('aria-label', muted ? 'Ton einschalten' : 'Ton ausschalten');
  button.title = muted ? 'Ton an' : 'Ton aus';
  button.innerHTML = muted ? mutedIcon() : speakerIcon();
}

/**
 * Fixed corner mute control – lives outside #app so view re-renders keep it.
 */
export function mountMuteToggle(): void {
  let button = document.querySelector<HTMLButtonElement>('#mute-toggle');

  if (!button) {
    button = document.createElement('button');
    button.id = 'mute-toggle';
    button.type = 'button';
    button.className = 'mute-toggle';
    document.body.appendChild(button);

    button.addEventListener('click', () => {
      soundEffects.toggleMuted();
    });
  }

  paintMuteButton(button);
  soundEffects.onMuteChange(() => {
    paintMuteButton(button);
  });
}
