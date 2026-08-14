const CACHE_NAME = 'mis-finanzas-v1';
const FILES_TO_CACHE = ['./index.html', './manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // network-first: siempre intenta traer la versión más reciente,
  // y solo usa la copia guardada si no hay internet
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
