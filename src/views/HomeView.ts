import {
  arrowRightIcon,
  controllerLineIcon,
  watermarkControllerIcon,
} from '../components/icons';

export interface HomeViewCallbacks {
  onStart: () => void;
}

/**
 * Home screen matching the design template: "Ready to play?" + yellow Play.
 */
export function renderHomeView(
  root: HTMLElement,
  callbacks: HomeViewCallbacks,
): void {
  root.innerHTML = `
    <section class="screen screen--home" aria-label="Startseite">
      <div class="home-watermark" aria-hidden="true">
        ${watermarkControllerIcon()}
      </div>
      <div class="home-content">
        <div class="home-copy">
          <p class="home-eyebrow home-anim home-anim--1">It's play time.</p>
          <h1 class="home-title home-anim home-anim--2">Ready to play?</h1>
        </div>
        <button type="button" class="btn btn--play home-anim home-anim--3" data-action="start">
          <span class="btn__icon" aria-hidden="true">${controllerLineIcon()}</span>
          <span class="btn__label">Play</span>
          <span class="btn__icon btn__icon--arrow" aria-hidden="true">${arrowRightIcon()}</span>
        </button>
      </div>
    </section>
  `;

  root.querySelector<HTMLButtonElement>('[data-action="start"]')?.addEventListener(
    'click',
    () => {
      callbacks.onStart();
    },
  );
}
