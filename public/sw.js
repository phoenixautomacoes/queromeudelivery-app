// Service Worker - Quero Meu Delivery
// Estratégia: sem cache de assets (Vite já faz cache-busting por hash)
// Isso garante que atualizações sejam entregues imediatamente.

const CACHE_NAME = "qmd-v5-offline";
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (e) => {
  // Ativa imediatamente sem esperar abas antigas fecharem
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add(OFFLINE_URL).catch(() => {}))
  );
});

self.addEventListener("activate", (e) => {
  // Remove todos os caches antigos
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  // Nunca intercepta requisições de API
  if (e.request.url.includes("/api/")) return;

  // Nunca intercepta requisições POST/PUT/DELETE
  if (e.request.method !== "GET") return;

  // Para tudo mais: vai na rede. Se offline, mostra página offline.
  e.respondWith(
    fetch(e.request).catch(() =>
      caches.match(OFFLINE_URL).then((r) => r || new Response("Offline", { status: 503 }))
    )
  );
});
