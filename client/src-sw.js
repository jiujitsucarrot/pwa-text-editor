import { precacheAndRoute } from 'workbox-precaching';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';

// Precache and route all static assets using Workbox
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// Cache and serve the HTML page with CacheFirst strategy
registerRoute(
  ({ request }) => request.destination === 'document',
  new CacheFirst({
    cacheName: 'html-cache',
  })
);

// Cache and serve other assets with StaleWhileRevalidate
registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'assets-cache',
  })
);

// Cache and serve image assets with CacheFirst
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
  })
);

// Cache and serve fonts with CacheFirst
registerRoute(
  ({ request }) => request.destination === 'font',
  new CacheFirst({
    cacheName: 'font-cache',
  })
);
