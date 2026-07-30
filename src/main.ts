import { App } from './app/App';
import './style.css';

const appRoot = document.querySelector<HTMLElement>('#app');

if (!appRoot) {
  throw new Error('Root element #app was not found.');
}

const app = new App(appRoot);
app.start();
