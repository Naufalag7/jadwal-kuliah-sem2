// Ubah dari 'naufal-v1' ke 'naufal-v2'
const CACHE_NAME = 'naufal-v2'; 

const assets = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './logo.jpg' // Pastikan namanya persis logo.jpg
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(assets))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});