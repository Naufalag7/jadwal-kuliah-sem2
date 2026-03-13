const CACHE_NAME = 'naufal-dashboard-v1';
const assets = ['./index.html', './style.css', './script.js'];

// Install service worker and cache files
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

// Listen for push notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'Tugas Baru!', body: 'Cek spreadsheet kamu, Fal!' };
  const options = {
    body: data.body,
    icon: 'logo.png',
    badge: 'logo.png'
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});