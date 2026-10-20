/**
 * BRIGHTLINGSEA ACADEMY — DARK MODE CONTROLLER
 * ---------------------------------------------------------------
 * The site ships `assets/css/dark-mode.css`, which styles everything
 * under `body.dark-mode`, but nothing previously toggled that class.
 * This module:
 *
 *   1. Applies the saved / preferred theme as early as possible.
 *   2. Injects a toggle button into the site header (no per-page markup
 *      changes required) — or a floating button if there is no header.
 *   3. Persists the choice in localStorage ("bla_theme").
 *   4. Follows the OS `prefers-color-scheme` when no choice is saved.
 *   5. Keeps the toggle in sync across tabs and exposes a small API.
 *
 * Include on every page (before </body>):
 *   <script src="assets/js/dark-mode.js"></script>
 */

(function () {
    'use strict';

    var STORAGE_KEY = 'bla_theme';
    var DARK = 'dark';
    var LIGHT = 'light';
    var TOGGLE_ID = 'darkModeToggle';

    /* ------------------------------------------------------------------
     * Theme persistence helpers
     * ------------------------------------------------------------------ */

    function readStoredTheme() {
        try {
            var value = window.localStorage.getItem(STORAGE_KEY);
            return (value === DARK || value === LIGHT) ? value : null;
        } catch (e) {
            return null;
        }
    }

    function writeStoredTheme(theme) {
        try {
            window.localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {
            /* Storage disabled (private mode) — theme still applies for this view */
        }
    }

    function systemPrefersDark() {
        return !!(window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    function resolvedTheme() {
        return readStoredTheme() || (systemPrefersDark() ? DARK : LIGHT);
    }

    /* ------------------------------------------------------------------
     * Applying the theme
     * ------------------------------------------------------------------ */

    function paint(theme) {
        var isDark = theme === DARK;

        // `body.dark-mode` is what dark-mode.css targets.
        if (document.body) {
            document.body.classList.toggle('dark-mode', isDark);
        }
        // Also flag the root element so early CSS / FOUC guards can use it.
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.classList.toggle('dark-mode', isDark);

        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute('content', isDark ? '#0D1B2A' : '#0056A3');
        }
        syncToggle(theme);

        // Let the rest of the page react (e.g. footer toggle, custom widgets).
        try {
            document.dispatchEvent(new CustomEvent('brightlingsea:themechange', {
                detail: { theme: theme }
            }));
        } catch (e) {
            /* CustomEvent unsupported — non fatal */
        }
    }

    function currentTheme() {
        return document.body && document.body.classList.contains('dark-mode') ? DARK : LIGHT;
    }

    function setTheme(theme, persist) {
        if (persist !== false) {
            writeStoredTheme(theme);
        }
        paint(theme);
    }

    function toggleTheme() {
        setTheme(currentTheme() === DARK ? LIGHT : DARK);
    }

    /* ------------------------------------------------------------------
     * Toggle button
     * ------------------------------------------------------------------ */

    function syncToggle(theme) {
        var btn = document.getElementById(TOGGLE_ID);
        if (!btn) return;

        var isDark = theme === DARK;
        var pin = btn.querySelector('i');

        if (pin) {
            pin.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
        btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        btn.setAttribute('title', isDark ? 'Light mode' : 'Dark mode');
    }

    function buildToggle(floating) {
        var btn = document.createElement('button');
        btn.id = TOGGLE_ID;
        btn.type = 'button';
        btn.className = floating ? 'dark-mode-toggle dark-mode-toggle-floating' : 'dark-mode-toggle';
        btn.setAttribute('aria-pressed', 'false');
        btn.setAttribute('aria-label', 'Switch to dark mode');
        btn.setAttribute('title', 'Dark mode');
        btn.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>';

        btn.addEventListener('click', toggleTheme);
        return btn;
    }

    function mountToggle() {
        if (document.getElementById(TOGGLE_ID)) {
            syncToggle(currentTheme());
            return;
        }

        var nav = document.querySelector('header.site-header .nav-container');

        if (nav) {
            // Sit next to the mobile-menu toggle so it stays reachable even
            // when the nav menu collapses on small screens.
            var anchor = nav.querySelector('.mobile-menu-toggle');
            if (anchor) {
                anchor.parentNode.insertBefore(buildToggle(false), anchor);
            } else {
                nav.appendChild(buildToggle(false));
            }
            return;
        }

        // No header on this page (e.g. standalone tools) — float instead.
        document.body.appendChild(buildToggle(true));
    }

    /* ------------------------------------------------------------------
     * Bootstrap
     * ------------------------------------------------------------------ */

    // Apply immediately so the first paint is already correct when this
    // script is loaded at the end of <body>.
    paint(resolvedTheme());

    function boot() {
        paint(resolvedTheme());
        mountToggle();

        // Follow OS changes only while the user has not chosen explicitly.
        if (window.matchMedia) {
            var mq = window.matchMedia('(prefers-color-scheme: dark)');
            var onChange = function () {
                if (!readStoredTheme()) {
                    paint(systemPrefersDark() ? DARK : LIGHT);
                }
            };
            if (mq.addEventListener) {
                mq.addEventListener('change', onChange);
            } else if (mq.addListener) {
                mq.addListener(onChange);
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

    // Keep multiple open tabs in sync.
    window.addEventListener('storage', function (e) {
        if (e.key === STORAGE_KEY) {
            paint(resolvedTheme());
        }
    });

    // Small public API (used by the footer link and tests).
    window.BrightlingseaTheme = {
        get: currentTheme,
        set: function (theme) { setTheme(theme); },
        toggle: toggleTheme,
        clear: function () {
            try { window.localStorage.removeItem(STORAGE_KEY); } catch (e) {}
            paint(systemPrefersDark() ? DARK : LIGHT);
        }
    };
})();
