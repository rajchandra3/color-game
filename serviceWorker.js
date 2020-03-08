const staticDevCoffee = "color-tile-rajchandra-me"
const assets = [
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

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticDevCoffee).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})