/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { offlineFallback,warmStrategyCache } = require("workbox-recipes");
const { StaleWhileRevalidate } = require("workbox-strategies");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ["/index.html", "/", "/manifest.json", "/assets/icons/icon_48x48.ico", "/assets/icons/icon_96x96.png", "/assets/icons/icon_128x128.png"],
  strategy: pageCache,
});
//offlineFallback();

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
  // Here we define the callback function that will filter the requests we want to cache (in this case, JS and CSS files)
  ({ request }) => ["style", "script", "manifest", "worker", "image"].includes(request.destination),
  new StaleWhileRevalidate({
    // Name of the cache storage.
    cacheName: "asset-cache",
    plugins: [
      // This plugin will cache responses with these headers to a maximum-age of 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
