// Service Worker
const CACHE_VERSION = 1.1;
const CACHE_NAME = `data-caches-V${CACHE_VERSION}`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll([
        '/offline.html',
        '/js/app.js',
        '/bootstrap.min.css',
        '/main.css',
        'js/notification.js',
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        if (cacheName === CACHE_NAME) {
          return;
        }
        caches.delete(cacheName);
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        if (response) {
          return response;
        }

        // if data not save in cache.
        // run bottom data
        return fetch(event.request)
          .then((networkRes) => {
            cache.put(event.request, networkRes.clone());

            return networkRes;
          })
          .catch(() => {
            return caches.open(CACHE_NAME).then((cache) => {
              return cache.match('/offline.html').then((res) => res);
            });
          });
      });
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  switch (event.action) {
    case 'about_us_page':
      clients.openWindow('http://google.com/?search=about-us-page');
      break;

    case 'events_page':
      clients.openWindow('http://google.com/?search=events_page');
      break;

    default:
      clients.openWindow('http://google.com/?search=home');
      break;
  }
});
