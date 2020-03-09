const CACHE_NAME = "color-tile-rajchandra-me";

const urlsToCache = [
  "/index.html",
  "/css/min/color.min.css",
  "/css/min/animate.min.css",
  "/css/min/profile.min.css",
  "/js/requests/components/auth.js",
  "/js/requests/components/gameplays.js",
  "/js/requests/components/user_stats.js",
  "/js/requests/config.js",
  "/js/requests/cookie.js",
  "/js/requests/localstorage.js",
  "/js/states/anonymous.js",
  "/js/states/logged_in.js",
  "/js/states/state_manager.js",
  "/js/main.js",
  "/js/common.js"
]

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log('INSIDE FRTCH --->',event.request.url);
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;     // if valid response is found in cache return it
          } else {
            return fetch(event.request)     //fetch from internet
              .then(function(res) {
                return caches.open(CACHE_NAME)
                  .then(function(cache) {
                    cache.put(event.request.url, res.clone());    //save the response for future
                    return res;   // return the fetched data
                  })
              })
              .catch(function(err) {       // fallback mechanism
                return caches.open(CACHE_NAME)
                  .then(function(cache) {
                    return cache.match('/offline.html');
                  });
              });
          }
        })
    );
  }); 