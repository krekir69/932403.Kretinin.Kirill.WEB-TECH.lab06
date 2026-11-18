const CACHE_NAME = 'app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/manifest.json',
  '/icons/icon1.png',
  '/icons/icon2.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});