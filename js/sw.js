// Service Worker

self.addEventListener('install', (event) => {
  console.log('Installing the service worker', event);
});

// self.addEventListener('activate', (event) => {
//   console.log('Activate the service worker', event);
// });

self.addEventListener('fetch', (event) => {
  console.log('fetch data', event);
});
