/**
 * BRIGHTLINGSEA ACADEMY — SERVICE WORKER
 * Provides offline caching for core pages and assets
 */
const CACHE_NAME = 'brightlingsea-v18';

/**
 * Resolve every cache URL relative to wherever this worker is deployed.
 * With absolute paths ("/index.html") offline mode silently broke whenever
 * the site was not served from the domain root (e.g. /school/ or a GitHub
 * Pages project path). `self.registration.scope` gives us that base.
 */
const BASE = self.location ? new URL('./', self.location.href).href : './';
const cacheUrl = function (path) {
    return new URL(path.replace(/^\//, ''), BASE).href;
};

/**
 * Everything below is cached eagerly on install.
 * Keep this list in sync with the real file inventory — a missing entry
 * means that page/asset silently breaks when offline.
 */
const STATIC_ASSETS = [
    // ---- Core site pages ----
    '/',
    '/index.html',
    '/about.html',
    '/activities.html',
    '/alumni.html',
    '/anniversary.html',
    '/contact.html',
    '/departments.html',
    '/faq.html',
    '/gallery.html',
    '/news.html',
    '/resources.html',
    '/staff.html',
    '/timeline.html',
    '/video-gallery.html',

    // ---- Academic department pages ----
    '/departments/creative-arts.html',
    '/departments/english.html',
    '/departments/languages.html',
    '/departments/mathematics.html',
    '/departments/science.html',
    '/departments/social-studies.html',
    '/departments/technology.html',

    // ---- New content pages (facilities, campus, projects, honours) ----
    '/facilities.html',
    '/campus.html',
    '/building-project.html',
    '/best-students.html',

    // ---- Error & offline pages ----
    '/404.html',
    '/500.html',
    '/offline.html',

    // ---- PWA manifest ----
    '/manifest.json',

    // ---- PWA icons / favicon ----
    '/assets/images/icon-192.png',
    '/assets/images/icon-512.png',
    '/assets/images/icon-maskable.png',
    '/assets/images/favicon.ico',
    '/assets/images/favicon-32.png',
    '/assets/images/favicon.png',

    // ---- Social sharing image ----
    '/assets/images/og-image.png',

    // ---- School logo (referenced by Schema.org JSON-LD on every page) ----
    '/assets/images/logo.png',

    // ---- Stylesheets ----
    '/assets/css/main.css',
    '/assets/css/pages.css',
    '/assets/css/dark-mode.css',
    '/assets/css/alumni.css',
    '/assets/css/departments.css',
    '/assets/css/timeline.css',
    '/assets/css/video-gallery.css',
    '/assets/css/facilities.css',
    '/assets/css/best-students.css',

    // Offline icon fallback — the fetch handler resolves this from the cache
    // when the Font Awesome CDN is unreachable, so it MUST be precached.
    '/assets/css/font-awesome-fallback.css',

    // ---- Core scripts ----
    '/assets/js/main.js',
    '/assets/js/accessibility.js',
    '/assets/js/cookie-consent.js',
    '/assets/js/dark-mode.js',
    '/assets/js/search.js',
    '/assets/js/performance.js',

    // ---- Content / data modules ----
    '/assets/js/announcements-data.js',
    '/assets/js/departments-data.js',
    '/assets/js/faq-data.js',
    '/assets/js/news-data.js',
    '/assets/js/resources-data.js',
    '/assets/js/staff-data.js',
    '/assets/js/testimonials-data.js',
    '/assets/js/testimonials-carousel.js',

    // ---- New data modules + certificate generator + countdown ----
    '/assets/js/facilities-data.js',
    '/assets/js/building-project-data.js',
    '/assets/js/best-students-data.js',
    '/assets/js/certificate-generator.js',
    '/assets/js/countdown.js'
];

const FONTS_CDN = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap'
];

// Install - cache static assets
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            // Add entries individually: with cache.addAll() a single 404
            // aborts the whole install, leaving the site with NO offline
            // support. Individual adds degrade gracefully instead.
            return Promise.all(
                STATIC_ASSETS.map(function (path) {
                    var absolute = cacheUrl(path);
                    return cache.add(new Request(absolute, { cache: 'reload' }))
                        .catch(function (err) {
                            console.warn('[SW] Skipped (could not cache):', absolute, err && err.message);
                        });
                })
            );
        }).then(function () {
            // Warm the CDN font/icon cache too (non-blocking, best effort).
            return Promise.all(
                FONTS_CDN.map(function (url) {
                    return caches.open(CACHE_NAME).then(function (cache) {
                        return fetch(url, { mode: 'cors' })
                            .then(function (res) { if (res.ok) return cache.put(url, res); })
                            .catch(function () { /* offline during install - fine */ });
                    });
                })
            );
        })
    );
    self.skipWaiting();
});

// Activate - clean old caches (ONLY this app's own cache family)
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (name) {
                    // Never touch other origins'/apps' caches sharing this
                    // origin (e.g. a second school site on the same host).
                    return name.indexOf('brightlingsea-') === 0 && name !== CACHE_NAME;
                }).map(function (name) {
                    return caches.delete(name);
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch - serve from cache, fall back to network
self.addEventListener('fetch', function (event) {
    const request = event.request;

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip chrome-extension, etc.
    if (request.url.startsWith('chrome-extension://')) return;

    // For font/CSS requests from CDN, use network-first with cache fallback
    if (request.url.startsWith('https://cdnjs.cloudflare.com') || request.url.startsWith('https://fonts.googleapis.com')) {
        event.respondWith(
            fetch(request).then(function (response) {
                if (response.ok) {
                    const responseCopy = response.clone();
                    caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(request, responseCopy);
                    });
                }
                return response;
            }).catch(function () {
                // CDN not reachable - return placeholder
                if (request.url.includes('font-awesome')) {
                    return caches.match(cacheUrl('/assets/css/font-awesome-fallback.css'))
                        .then(function (cached) {
                            return cached || new Response('/* Font Awesome fallback */', {
                                status: 200,
                                headers: { 'Content-Type': 'text/css' }
                            });
                        });
                }
                return caches.match(request);
            })
        );
        return;
    }

    // ---- HTML documents: network-first (so content never goes stale) ----
    if (request.mode === 'navigate' || request.destination === 'document') {
        event.respondWith(
            fetch(request).then(function (response) {
                if (response.ok) {
                    const responseCopy = response.clone();
                    caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(request, responseCopy);
                    });
                }
                return response;
            }).catch(function () {
                // Offline: prefer the cached copy of the requested page,
                // then the dedicated offline page, then the homepage.
                return caches.match(request)
                    .then(function (cached) {
                        if (cached) return cached;
                        return caches.match(cacheUrl('/offline.html'));
                    })
                    .then(function (offlinePage) {
                        if (offlinePage) return offlinePage;
                        return caches.match(cacheUrl('/index.html'));
                    })
                    .then(function (homePage) {
                        return homePage || new Response('Offline', { status: 503 });
                    });
            })
        );
        return;
    }

    // ---- Everything else: cache-first (fast, then revalidate in background) ----
    event.respondWith(
        caches.match(request).then(function (cachedResponse) {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(request).then(function (response) {
                // Only cache same-origin, successful, basic responses.
                if (response.ok && response.type === 'basic') {
                    const responseCopy = response.clone();
                    caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(request, responseCopy);
                    });
                }
                return response;
            }).catch(function () {
                return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
            });
        })
    );
});

// Message handling — lets the page ask a waiting worker to take over
// immediately (main.js posts { action: 'skipWaiting' }).
self.addEventListener('message', function (event) {
    var data = event.data || {};

    if (data.action === 'skipWaiting') {
        self.skipWaiting();
        return;
    }

    if (data.action === 'clearCache') {
        event.waitUntil(
            caches.keys().then(function (names) {
                // Scoped to this app's cache family - never wipe foreign caches.
                return Promise.all(names
                    .filter(function (n) { return n.indexOf('brightlingsea-') === 0; })
                    .map(function (n) { return caches.delete(n); }));
            }).then(function () {
                if (event.ports && event.ports[0]) {
                    event.ports[0].postMessage({ cleared: true });
                }
            })
        );
    }
});

// Background sync (for offline form submissions)
self.addEventListener('sync', function (event) {
    if (event.tag === 'sync-form') {
        event.waitUntil(
            performSync()
        );
    }
});

function performSync() {
    // In a real implementation, this would sync form data from IndexedDB
    // For now, it's a placeholder
    return Promise.resolve();
}

// Push notifications (for SMS result delivery in future)
self.addEventListener('push', function (event) {
    if (!event.data) return;

    const data = event.data.json();
    const options = {
        body: data.body || 'New notification from Brightlingsea Academy',
        icon: cacheUrl('/assets/images/icon-192.png'),
        badge: cacheUrl('/assets/images/icon-192.png'),
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            { action: 'view', title: 'View' },
            { action: 'dismiss', title: 'Dismiss' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Brightlingsea Academy', options)
    );
});

// Notification click
self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('/index.html')
        );
    }
});

// Future hero background video: add '/assets/video/hero-background.webm'
// to STATIC_ASSETS above once the file exists (kept out of the array so
// tools/verify-sw-cache.py keeps reporting 0 missing).
