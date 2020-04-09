const CACHE_NAME = "color-tile-rajchandra-me";

const urlsToCache = [
  "/index.html",
  "/src/css/min/color.min.css",
//   "/css/min/animate.min.css",
  "/src/css/min/profile.min.css",
  "/src/js/requests/components/auth.js",
  "/src/js/requests/components/gameplays.js",
  "/src/js/requests/components/user_stats.js",
  "/src/js/requests/config.js",
  "/src/js/requests/cookie.js",
  "/src/js/requests/localstorage.js",
  "/src/js/states/anonymous.js",
  "/src/js/states/logged_in.js",
  "/src/js/states/state_manager.js",
  "/src/js/main.js",
  "/src/js/common.js"
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
    // console.log('INSIDE FETCH --->',event.request.url);
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
                    return cache.match('/index.html');
                  });
              });
          }
        })
    );
  }); 