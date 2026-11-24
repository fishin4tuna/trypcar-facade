// TrypCar app service worker: caches the app so it opens instantly and works offline.
// Network first: when online, it always checks the site for the newest files (skipping the
// browser's short-term cache), saves a fresh copy, and only uses the saved copy when offline.
var CACHE = "trypcar-app-v17";
var FILES = ["app.html", "app.webmanifest", "app-icon-192.png", "app-icon-512.png", "trypcar-logo.png", "trypcar-car.webp"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }));
  self.skipWaiting();
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var sameSite = new URL(e.request.url).origin === location.origin;
  var req = sameSite ? new Request(e.request, { cache: "no-cache" }) : e.request;
  e.respondWith(fetch(req).then(function (res) {
    if (sameSite && res.ok) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
    }
    return res;
  }).catch(function () { return caches.match(e.request); }));
});
