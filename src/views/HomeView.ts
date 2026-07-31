import { controllerIcon, playIcon } from '../components/icons';

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
      <div class="home-stage">
        <div class="home-controller home-controller--watermark" aria-hidden="true">
          ${controllerIcon('controller-icon controller-icon--faint')}
        </div>
        <div class="home-content">
          <p class="home-eyebrow home-anim home-anim--1">It's play time.</p>
          <h1 class="home-title home-anim home-anim--2">Ready to play?</h1>
          <div class="home-controller home-controller--animated home-anim home-anim--3" aria-hidden="true">
            ${controllerIcon()}
          </div>
          <button type="button" class="btn btn--yellow btn--pulse home-anim home-anim--4" data-action="start">
            <span class="btn__icon">${playIcon()}</span>
            <span>Play</span>
          </button>
        </div>
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
