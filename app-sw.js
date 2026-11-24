// TrypCar app service worker: caches the app so it opens instantly and works offline.
// Network first for the site's own files: when online, it always checks the site for the newest
// files (skipping the browser's short-term cache), saves a fresh copy, and only uses the saved copy when offline.
// The 3D engine never changes at its address, so it is saved once and then loaded straight from the phone.
var CACHE = "trypcar-app-v18";
var FILES = ["app.html", "app.webmanifest", "app-icon-192.png", "app-icon-512.png", "trypcar-logo.png", "trypcar-car.webp"];
var ENGINE = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return c.addAll(FILES).then(function () { return c.add(new Request(ENGINE, { mode: "cors" })).catch(function () {}); });
  }));
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
  if (e.request.url === ENGINE) {
    e.respondWith(caches.match(ENGINE).then(function (hit) {
      return hit || fetch(e.request).then(function (res) {
        if (res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(ENGINE, copy); }); }
        return res;
      });
    }));
    return;
  }
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
