/**
 * Renders the application home screen and binds its start action.
 * @module views/HomeView
 */
import {
  arrowRightIcon,
  controllerLineIcon,
  watermarkControllerIcon,
} from '../components/icons';

/** User actions emitted by the home screen. */
export interface HomeViewCallbacks {
  /** Opens the game-settings flow. */
  onStart: () => void;
}

/** Static home-screen markup retained between renders. */
const HOME_MARKUP = `
    <section class="screen screen--home" aria-label="Startseite">
      <span class="home-watermark" aria-hidden="true">
        ${watermarkControllerIcon()}
      </span>
      <header class="home-header">
        <p class="home-eyebrow home-anim home-anim--1">It's play time.</p>
        <h1 class="home-title home-anim home-anim--2">Ready to play?</h1>
      </header>
      <button type="button" class="btn btn--play home-anim home-anim--3" data-action="start">
        <span class="btn__icon btn__icon--controller" aria-hidden="true">${controllerLineIcon()}</span>
        <span class="btn__label">Play</span>
        <span class="btn__icon btn__icon--arrow" aria-hidden="true">${arrowRightIcon()}</span>
      </button>
    </section>
  `;

/**
 * Connects the Play button to the supplied start callback.
 * @param root - Home-screen host containing the Play button.
 * @param onStart - Action to invoke when Play is selected.
 * @returns Nothing.
 */
function bindStartAction(root: HTMLElement, onStart: () => void): void {
  root
    .querySelector<HTMLButtonElement>('[data-action="start"]')
    ?.addEventListener('click', () => onStart());
}

/**
 * Home screen matching the design template: "Ready to play?" + yellow Play.
 * @param root - Host element that receives the home screen.
 * @param callbacks - Actions emitted by the home screen.
 * @returns Nothing.
 */
export function renderHomeView(
  root: HTMLElement,
  callbacks: HomeViewCallbacks,
): void {
  root.innerHTML = HOME_MARKUP;
  bindStartAction(root, callbacks.onStart);
}
