const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported in the browser');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('./sw.bundle.js');
    console.log('Service worker registered');
    return registration;
  } catch (error) {
    console.log('Failed to register service worker', error);
  }
};

// Pastikan runtime service worker berjalan di browser yang mendukung
const runtime = {
  async waitUntilReady() {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    try {
      // Tunggu sampai service worker aktif
      const registration = await navigator.serviceWorker.ready;
      console.log('Service Worker ready');
      return registration;
    } catch (error) {
      console.error('Service Worker not ready', error);
    }
  },

  // Fungsi untuk memperbarui cache
  async updateCache() {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.update();
      console.log('Service Worker cache updated');
    } catch (error) {
      console.error('Failed to update Service Worker cache', error);
    }
  },
};

// Event listener untuk menangani pesan dari service worker
const initServiceWorkerMessaging = () => {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  navigator.serviceWorker.addEventListener('message', (event) => {
    console.log('Received message from service worker:', event.data);

    // Handle pesan sesuai dengan tipe
    if (event.data && event.data.type === 'CACHE_UPDATED') {
      console.log('Content has been cached for offline use');
    }
  });
};

export { swRegister, runtime, initServiceWorkerMessaging };