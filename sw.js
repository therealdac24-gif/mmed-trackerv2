const CACHE_NAME = 'mmed-rural-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './mmed_rural_icon.png'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Try to cache all, but don't fail properly if one fails (best effort for icon)
            return cache.addAll(ASSETS).catch(err => {
                console.log('SW: Cache addAll failed, trying essential assets', err);
                return cache.addAll(['./', './index.html', './manifest.json']);
            });
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});
