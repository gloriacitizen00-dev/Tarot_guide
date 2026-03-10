const CACHE_NAME = 'digital-oracle-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/Cosmic_console.html',
  '/game.html',
  '/Aboutus.html',
  '/Spreads.html',
  '/shopping.html',
  '/subs.html',
  '/Contact.html',
  '/login.html',
  '/register.html',
  '/MysticalWeatherCalendar.html',
  '/AuroraCalendar.html',
  'https://raw.githubusercontent.com/gloriacitizen00-dev/Tarot_guide/main/First.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
