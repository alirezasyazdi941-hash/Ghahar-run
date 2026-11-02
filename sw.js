/* Alireza Yazdi · GHAHAR service worker — scoped to its own folder, touches only its own caches. */
const PREFIX = "ay-ghahar-";
const CACHE = PREFIX + "e01ec40d94";
const CORE = ["./", "./index.html", "./ghahar.css", "./ghahar.js", "./manifest.json",
  "./gh-icon-192.png", "./gh-icon-512.png", "./gh-mono-400.woff2", "./gh-mono-700.woff2", "./gh-fa-400.woff2", "./gh-fa-600.woff2"];
self.addEventListener("install", (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())));
self.addEventListener("activate", (e) => e.waitUntil(
  caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim())));
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin || !url.href.startsWith(self.registration.scope)) return;
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
    return res;
  }).catch(() => req.mode === "navigate" ? caches.match("./index.html") : Response.error())));
});
