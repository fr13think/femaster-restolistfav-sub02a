import 'regenerator-runtime';
import '../styles/style.scss';
import '../styles/responsive.scss';
import App from './app';
import { swRegister, runtime, initServiceWorkerMessaging } from './utils/sw-register';

// Import components
import './components/app-bar';
import './components/hero-element';
import './components/restaurant-item';

const app = new App({
  content: document.querySelector('#mainContent'),
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  app.renderPage();

  // Initialize service worker only in production
  if (window.ENV === 'production') {
    try {
      await swRegister();
      await runtime.waitUntilReady();
      initServiceWorkerMessaging();
    } catch (error) {
      console.error('Failed to initialize service worker', error);
    }
  }
});

// PWA enhancement - Add to Home Screen
const initPWAInstallation = () => {
  let deferredPrompt;
  const addBtn = document.querySelector('.add-button');

  if (addBtn) {
    addBtn.style.display = 'none';

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      deferredPrompt = event;
      addBtn.style.display = 'block';

      addBtn.addEventListener('click', () => {
        addBtn.style.display = 'none';
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
      });
    });
  }
};

initPWAInstallation();