/**
 * BRIGHTLINGSEA ACADEMY — PERFORMANCE OPTIMIZATION
 * Lighthouse 90+ score targets
 * 
 * IMPLEMENTATION NOTES:
 * 
 * 1. IMAGE OPTIMIZATION:
 *    - Add loading="lazy" to all <img> tags below the fold
 *    - Use srcset for responsive images in gallery
 *    - Convert PNG/JPG to WebP format
 *    - Set explicit width/height on all images to prevent CLS
 *
 * 2. CODE MINIFICATION:
 *    - CSS: Use CSSNano or clean-css-cli to minify
 *      npx clean-css-cli -o assets/css/main.min.css assets/css/main.css
 *      (Similar for pages.css, grade-checker.css, dark-mode.css, departments.css)
 *    - JS: Use terser to minify
 *      npx terser assets/js/main.js -o assets/js/main.min.js
 *      (Similar for all JS files)
 *
 * 3. RESOURCE PRECONNECT:
 *    Add to <head> of all pages:
 *    <link rel="preconnect" href="https://fonts.googleapis.com">
 *    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
 *
 * 4. FONT DISPLAY SWAP:
 *    Already in Google Fonts URL: &display=swap
 *    This prevents FOIT (Flash of Invisible Text)
 *
 * 5. DEFER NON-CRITICAL JS:
 *    Add defer attribute to all non-critical JS scripts:
 *    <script src="assets/js/main.js" defer></script>
 *
 * 6. CRITICAL CSS INLINING:
 *    Inline above-the-fold CSS for homepage hero in <head>
 *    Use critical-path-css-tools to extract
 *
 * 7. SERVICE WORKER CACHE STRATEGY:
 *    Already implemented in service-worker.js
 *    - Cache-first for local assets
 *    - Network-first for CDN fonts
 *    - Offline fallback to index.html
 *
 * 8. BROWSER CACHING (SERVER CONFIG):
 *    For NGINX:
 *    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
 *        expires 1y;
 *        add_header Cache-Control "public, immutable";
 *    }
 *
 * 9. COMPRESSION:
 *    Enable Gzip or Brotli on server
 *    For NGINX: gzip on; gzip_types text/css application/javascript;
 *
 * 10. REDUCE MAIN THREAD WORK:
 *     - Debounce scroll/resize handlers (already done in main.js)
 *     - Use requestAnimationFrame for animations
 *     - Avoid layout thrashing
 */

// RUNTIME: this file previously did nothing but log to the console and was
// linked from NO page. It now performs the client-side optimisations the
// notes above describe. Core Web Vitals logging is opt-in via "?perf".
(function () {
    'use strict';

    var DEBUG = /[?&]perf\b/.test(window.location.search);

    /* ------------------------------------------------------------------
     * 1 + 2. Image optimisation
     * ------------------------------------------------------------------ */
    function optimiseImages() {
        var images = document.querySelectorAll('img:not([data-perf-done])');

        images.forEach(function (img, index) {
            img.setAttribute('data-perf-done', '1');

            // Empty-src placeholders (e.g. the gallery lightbox viewer) are
            // filled in by page JS later, often while the viewer is still
            // display:none. A loading="lazy" image with no rendered box can
            // stay deferred even after it becomes visible, so the photo
            // would never load in any window size. Those must stay eager.
            if (!img.getAttribute('src')) {
                img.setAttribute('loading', 'eager');
            } else if (index < 3 && !img.hasAttribute('loading')) {
                // Above-the-fold images must load eagerly for LCP.
                img.setAttribute('loading', 'eager');
                img.setAttribute('fetchpriority', 'high');
            } else if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }

            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }

            // Reserve space when the intrinsic size is known, to avoid CLS.
            if (img.width && img.height &&
                !img.style.aspectRatio && !img.style.height) {
                img.style.aspectRatio = img.width + ' / ' + img.height;
            }

            img.addEventListener('error', function () {
                if (DEBUG) console.warn('[perf] image failed to load:', img.currentSrc || img.src);
            });
        });
    }

    /* ------------------------------------------------------------------
     * 3. Resource hints
     * ------------------------------------------------------------------ */
    function addResourceHints() {
        var hints = [
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', cross: true },
            { rel: 'dns-prefetch', href: 'https://cdnjs.cloudflare.com' }
        ];

        hints.forEach(function (hint) {
            var selector = 'link[rel="' + hint.rel + '"][href="' + hint.href + '"]';
            if (document.head.querySelector(selector)) return;

            var link = document.createElement('link');
            link.rel = hint.rel;
            link.href = hint.href;
            if (hint.cross) link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    /* ------------------------------------------------------------------
     * 4. Idle-time tasks
     * ------------------------------------------------------------------ */
    function whenIdle(fn) {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(fn, { timeout: 2000 });
        } else {
            window.setTimeout(fn, 200);
        }
    }

    function init() {
        addResourceHints();
        optimiseImages();

        // Images injected later (galleries, news cards) also get optimised.
        whenIdle(function () {
            if (!('MutationObserver' in window)) return;
            var pending = false;
            new MutationObserver(function () {
                if (pending) return;
                pending = true;
                window.setTimeout(function () {
                    pending = false;
                    optimiseImages();
                }, 250);
            }).observe(document.body, { childList: true, subtree: true });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ------------------------------------------------------------------
     * 5. Core Web Vitals (opt-in: add ?perf to the URL)
     * ------------------------------------------------------------------ */
    if (DEBUG && 'PerformanceObserver' in window) {
        try {
            new PerformanceObserver(function (list) {
                list.getEntries().forEach(function (entry) {
                    console.log('[perf]', entry.name || entry.entryType,
                                Math.round(entry.startTime) + 'ms');
                });
            }).observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] });
        } catch (e) {
            /* entry type unsupported in this browser */
        }

        window.addEventListener('load', function () {
            var nav = performance.getEntriesByType('navigation')[0];
            if (!nav) return;
            console.log('[perf] load time:', Math.round(nav.loadEventEnd - nav.startTime) + 'ms');
            console.log('[perf] DOM ready:', Math.round(nav.domContentLoadedEventEnd - nav.startTime) + 'ms');
        });
    }
})();
