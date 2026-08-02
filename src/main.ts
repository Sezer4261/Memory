import { App } from './app/App';
import { mountMuteToggle } from './components/MuteToggle';
import './styles/index.css';

const appRoot = document.querySelector<HTMLElement>('#app');

if (!appRoot) {
  throw new Error('Root element #app was not found.');
}

mountMuteToggle();

const app = new App(appRoot);
app.start();
