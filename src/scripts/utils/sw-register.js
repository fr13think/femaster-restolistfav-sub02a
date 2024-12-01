import * as WorkboxWindow from 'workbox-window';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported in the browser');
    return;
  }

  try {
    const wb = new WorkboxWindow.Workbox('/sw.bundle.js');

    const showSkipWaitingPrompt = async () => {
      await wb.messageSkipWaiting();
      window.location.reload();
    };

    wb.addEventListener('waiting', showSkipWaitingPrompt);
    wb.addEventListener('externalwaiting', showSkipWaitingPrompt);

    await wb.register();
    console.log('Service worker registered');
  } catch (error) {
    console.error('Failed to register service worker', error);
  }
};

export default swRegister;