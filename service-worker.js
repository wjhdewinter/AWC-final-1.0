const CACHE_NAME = "awc-v2";

const urlsToCache = [
  "/Awcv1/",
  "/Awcv1/index.html",
  "/Awcv1/manifest.json",
  "/Awcv1/icon-192.png",
  "/Awcv1/icon-512.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
