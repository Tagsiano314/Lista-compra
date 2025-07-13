// service-worker.js

self.addEventListener('install', (event) => {
  console.log('[SW] Instalando nuevo service worker...');
  self.skipWaiting(); // Fuerza usar el nuevo SW inmediatamente
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activando service worker...');
  self.clients.claim(); // Toma control de todas las pestañas abiertas
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('v1').then((cache) =>
      cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      })
    )
  );
});
