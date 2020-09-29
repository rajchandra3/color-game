const cacheName = 'Color-Tile-Cache';

// Cache all the files to make a PWA
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      // Our application only has two files here index.html and manifest.json
      // but you can add more such as style.css as your app grows
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './src/css/min/color.min.css',
        './src/css/min/profile.min.css',
        './src/css/min/animate.min.css',
        './src/images/brand-icons/globe.svg',
        './src/images/brand-icons/linkedin.svg',
        './src/images/brand-icons/twitter.svg',
        './src/images/favicon.ico',
        './src/images/share-icon.svg',
        './src/js/index.js',
        './src/js/main.js',
        './src/js/common.js'
      ]);
    })
  );
});

// Our service worker will intercept all fetch requests
// and check if we have cached the file
// if so it will serve the cached file
self.addEventListener('fetch', event => {
  // event.respondWith(
  //   caches.open(cacheName)
  //     .then(cache => cache.match(event.request, { ignoreSearch: true }))
  //     .then(response => {
  //       return response || fetch(event.request);
  //     })
  // );
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        // if (response) {
        //   return response;
        // }
        return fetch(event.request);
      }
    )
  );
});