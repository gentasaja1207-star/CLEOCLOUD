const CACHE_STATIC_NAME = 'cleocloud-static-v3';
const CACHE_DATA_NAME = 'cleocloud-api-v3';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png',
  '/app.js',
  '/player.js',
  '/fullplayer.js',
  '/miniplayer.js',
  '/home.js',
  '/library.js',
  '/liked.js',
  '/search.js',
  '/album.js',
  '/artist.js',
  '/profile.js',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest'
];

// Install Event - Pre-cache Static Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then((cache) => {
      console.log('[SW] Pre-caching static assets');
      return Promise.allSettled(
        STATIC_ASSETS.map((url) => {
          return fetch(url).then((res) => {
            if (res.status === 200 || res.type === 'opaque') {
              return cache.put(url, res);
            }
          }).catch((err) => {
            console.warn('[SW] Failed to cache:', url, err);
          });
        })
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean Up Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DATA_NAME) {
            console.log('[SW] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Handle Offline & Caching
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore non-GET requests or chrome-extension URLs
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // 1. Navigation requests -> Network first, fallback to cached index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match('/index.html', { ignoreSearch: true }) || caches.match('/', { ignoreSearch: true });
      })
    );
    return;
  }

  // 2. Audio Proxy -> Cache FIRST (file audio yang udah didownload nggak akan berubah,
  //    dan link asli YouTube-nya sering expired kalau diambil ulang dari network)
  if (url.pathname === '/api/proxy-audio') {
    event.respondWith(
      caches.match(request, { ignoreSearch: true }).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          // Cuma cache kalau responsenya FULL content (200), bukan partial/206 -
          // biar nggak kesimpen cuma potongan awal doang yang bisa bikin audio korup pas diputar ulang
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_DATA_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          return new Response('Audio tidak tersedia (offline & belum di-cache)', { status: 503 });
        });
      })
    );
    return;
  }

  // 3. API Routes lainnya -> Network first, save success to cache, fallback to cache kalau network gagal/error
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_DATA_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
            return networkResponse;
          }
          // Network merespon tapi statusnya error (misal link expired) -> coba fallback ke cache dulu
          return caches.match(request, { ignoreSearch: true }).then((cachedResponse) => {
            return cachedResponse || networkResponse;
          });
        })
        .catch(() => {
          return caches.match(request, { ignoreSearch: true }).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Fallback JSON for offline API requests
            return new Response(
              JSON.stringify({ status: false, offline: true, message: 'Anda sedang offline (PWA Offline Mode)' }),
              { headers: { 'Content-Type': 'application/json' } }
            );
          });
        })
    );
    return;
  }

  // 4. Static Assets (JS, PNG, WebP, CSS, Manifest, CDN scripts) -> Cache first, fallback to network
  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch background update for cache freshness if online
        if (navigator.onLine) {
          fetch(request).then((networkResponse) => {
            if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
              caches.open(CACHE_STATIC_NAME).then((cache) => {
                cache.put(request, networkResponse);
              });
            }
          }).catch(() => {});
        }
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_STATIC_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // If image fails offline, fallback to logo or FI placeholder
        if (request.headers.get('accept')?.includes('image')) {
          return caches.match('/logo.png');
        }
      });
    })
  );
});
