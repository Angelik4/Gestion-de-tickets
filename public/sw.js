const CACHE = "tickets-cache-v1";
const ASSETS = [ "/", "/index.html", "/manifest.json" ]; // puedes añadir CSS/JS si usas CRA

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k !== CACHE ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const { request } = e;
  const url = new URL(request.url);
  const isAPI = url.pathname.startsWith("/tickets") || url.pathname.startsWith("/usuarios");

  if (isAPI && request.method === "GET") {
    e.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  e.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
