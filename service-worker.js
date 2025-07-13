self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("lista-v1").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./styles.css",      // si tienes
        "./script.js",       // si tienes
        "./manifest.json",
        "./icono-192.png",
        "./icono-512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
