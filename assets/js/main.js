/**
 * BRIGHTLINGSEA ACADEMY — MAIN JAVASCRIPT
 * Handles: Mobile menu, scroll reveal, smooth interactions, year display, dark mode
 */

document.addEventListener('DOMContentLoaded', function () {

    // ========== MOBILE MENU ==========
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-controls', 'navMenu');
        navMenu.setAttribute('aria-hidden', 'true');

        function setMenuOpen(open) {
            navMenu.classList.toggle('open', open);
            mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            navMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.className = open ? 'fas fa-times' : 'fas fa-bars';
            }
            // Full-height drawer: lock background scroll while open.
            document.body.style.overflow = open ? 'hidden' : '';
            if (open) {
                const firstLink = navMenu.querySelector('.nav-link');
                if (firstLink) firstLink.focus();
            }
        }

        mobileToggle.addEventListener('click', function (e) {
            // Stop bubbling so the document outside-click handler below does
            // not see this same click and immediately close what we opened.
            e.stopPropagation();
            setMenuOpen(!navMenu.classList.contains('open'));
        });

        // Close menu when any nav link (top-level or Explore) is clicked
        navMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                setMenuOpen(false);
            });
        });

        // Close when clicking outside the drawer
        document.addEventListener('click', function (e) {
            if (navMenu.classList.contains('open') &&
                !navMenu.contains(e.target) &&
                !mobileToggle.contains(e.target)) {
                setMenuOpen(false);
            }
        });

        // Close on Escape and return focus to the toggle
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                setMenuOpen(false);
                mobileToggle.focus();
            }
        });

        // Note: the drawer is used at every width, so there is no
        // desktop breakpoint at which to auto-close the menu on resize.
    }

    // ========== DESKTOP MEGA MENU (Explore) ==========
    // Groups the flat Explore links into 3 labelled columns and wires an
    // accessible toggle. Runs on all widths (harmless in the drawer); the
    // CSS only displays the mega panel at >=993px.
    (function initMegaMenu() {
        var group = document.querySelector('.nav-explore-group');
        var grid = document.querySelector('.nav-explore-grid');
        if (!group || !grid) return;
        if (group.querySelector('.nav-explore-toggle')) return;

        var COLUMNS = [
            { label: 'Discover', match: ['Gallery', 'Campus', 'Facilities', 'Building Project'] },
            { label: 'School Life', match: ['Activities', 'News', 'Staff', 'Best Students'] },
            { label: 'Milestones', match: ['Anniversary'] }
        ];

        var links = Array.prototype.slice.call(grid.querySelectorAll('.nav-explore-link'));
        var byText = {};
        links.forEach(function (a) { byText[a.textContent.trim()] = a; });

        var cols = COLUMNS.map(function (col) {
            var div = document.createElement('div');
            div.className = 'nav-mega-col';
            var label = document.createElement('span');
            label.className = 'nav-mega-col-label';
            label.textContent = col.label;
            div.appendChild(label);
            col.match.forEach(function (name) {
                if (byText[name]) div.appendChild(byText[name]);
            });
            return div;
        });
        // Any link not claimed by a column (e.g. future pages) joins Milestones.
        links.forEach(function (a) {
            if (!a.parentElement || a.parentElement === grid) cols[cols.length - 1].appendChild(a);
        });
        cols.forEach(function (c) { grid.appendChild(c); });

        var toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'nav-explore-toggle';
        toggle.setAttribute('aria-haspopup', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = 'Explore <i class="fas fa-chevron-down"></i>';
        group.insertBefore(toggle, grid);

        function setMega(open) {
            group.classList.toggle('mega-open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        }

        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            setMega(!group.classList.contains('mega-open'));
        });
        // Hover intent on desktop; CSS :focus-within covers keyboard users.
        group.addEventListener('mouseenter', function () {
            if (window.matchMedia && window.matchMedia('(min-width: 993px)').matches) setMega(true);
        });
        group.addEventListener('mouseleave', function () {
            if (window.matchMedia && window.matchMedia('(min-width: 993px)').matches) setMega(false);
        });
        document.addEventListener('click', function (e) {
            if (group.classList.contains('mega-open') && !group.contains(e.target)) setMega(false);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && group.classList.contains('mega-open')) {
                setMega(false);
                toggle.focus();
            }
        });
        grid.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () { setMega(false); });
        });
    })();

    // ========== HEADER SHADOW ON SCROLL ==========
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 86, 163, 0.08)';
        }

        lastScroll = currentScroll;
    });

    // ========== SCROLL REVEAL ANIMATIONS ==========
    // No-JS / no-IntersectionObserver fallback: .reveal elements stay visible
    // because the hidden state is only applied when JS + IO both exist.
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        revealElements.forEach(function (el) {
            el.classList.add('reveal-will-animate');
        });
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    }

    // ========== COUNTER ANIMATION (hero stats) ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        // Reduced motion: show final values instantly, no animation loop.
        const reduceMotion = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) return;

        statNumbers.forEach(function (el) {
            const text = el.textContent;
            const isPercent = text.includes('%');
            const isPlus = text.includes('+');
            const rawVal = parseFloat(text.replace(/[^0-9.]/g, ''));
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const currentVal = eased * rawVal;

                let display;
                if (isPercent) {
                    display = Math.round(currentVal) + '%';
                } else if (rawVal >= 100) {
                    display = Math.round(currentVal) + '+';
                } else {
                    display = currentVal.toFixed(1);
                }

                el.textContent = display;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    el.textContent = text;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // Act when stats section scrolls into view
    if (statNumbers.length > 0) {
        const statsSection = statNumbers[0].closest('.hero-stats');
        if (statsSection) {
            const statsObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounters();
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            statsObserver.observe(statsSection);
        }
    }

    // ========== CURRENT YEAR IN FOOTER ==========
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ========== BACK TO TOP BUTTON ==========
    // CSS (.back-to-top) shipped for all pages but no page ever contained the
    // element, so the feature was dead. Create it on demand when missing.
    let backToTop = document.querySelector('.back-to-top');

    if (!backToTop) {
        backToTop = document.createElement('button');
        backToTop.type = 'button';
        backToTop.className = 'back-to-top';
        backToTop.setAttribute('aria-label', 'Back to top');
        backToTop.setAttribute('title', 'Back to top');
        backToTop.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
        document.body.appendChild(backToTop);
    }

    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function () {
            const reduceMotion = window.matchMedia &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    }

    // ========== IMAGE PLACEHOLDER CLICK HANDLER ==========
    document.querySelectorAll('.image-placeholder').forEach(function (el) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', function () {
            const originalText = el.innerHTML;
            el.innerHTML = '<i class="fas fa-image" style="font-size:2rem;color:var(--yellow);opacity:0.6"></i><span class="placeholder-text" style="color:var(--yellow)">Add your photo here</span>';
            setTimeout(function () {
                el.innerHTML = originalText;
            }, 2000);
        });
    });

    // ========== SMOOTH NAV ACTIVE STATE ==========
    document.querySelectorAll('.nav-link').forEach(function (link) {
        const href = link.getAttribute('href');
        if (href && window.location.pathname.includes(href)) {
            link.classList.add('active');
        }
    });

    // ========== CONTACT FORM HANDLING (demo) ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameInput = contactForm.querySelector('[name="name"]');
            const emailInput = contactForm.querySelector('[name="email"]');
            const messageInput = contactForm.querySelector('[name="message"]');
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const originalText = submitBtn.innerHTML;

            // Basic validation
            let isValid = true;
            let firstError = null;

            if (!nameInput.value.trim()) {
                nameInput.classList.add('error');
                const errEl = nameInput.parentElement.querySelector('.form-error');
                if (errEl) errEl.style.display = 'block';
                if (!firstError) firstError = nameInput;
                isValid = false;
            } else {
                nameInput.classList.remove('error');
                const errEl = nameInput.parentElement.querySelector('.form-error');
                if (errEl) errEl.style.display = 'none';
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                emailInput.classList.add('error');
                const errEl = emailInput.parentElement.querySelector('.form-error');
                if (errEl) errEl.style.display = 'block';
                if (!firstError) firstError = emailInput;
                isValid = false;
            } else {
                emailInput.classList.remove('error');
                const errEl = emailInput.parentElement.querySelector('.form-error');
                if (errEl) errEl.style.display = 'none';
            }

            if (!messageInput.value.trim()) {
                messageInput.classList.add('error');
                const errEl = messageInput.parentElement.querySelector('.form-error');
                if (errEl) errEl.style.display = 'block';
                if (!firstError) firstError = messageInput;
                isValid = false;
            } else {
                messageInput.classList.remove('error');
                const errEl = messageInput.parentElement.querySelector('.form-error');
                if (errEl) errEl.style.display = 'none';
            }

            if (!isValid) {
                if (firstError) {
                    firstError.focus();
                }
                return;
            }

            // Simulate submission
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(function () {
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
                submitBtn.style.background = 'var(--blue)';
                submitBtn.style.color = 'white';

                // Reset form
                contactForm.reset();

                setTimeout(function () {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                }, 3000);
            }, 1500);
        });

        // Remove error state on input
        contactForm.querySelectorAll('.form-input, .form-textarea').forEach(function (input) {
            input.addEventListener('input', function () {
                input.classList.remove('error');
                const errEl = input.parentElement.querySelector('.form-error');
                if (errEl) errEl.style.display = 'none';
            });
        });
    }

    // ========== GALLERY FILTER (page-specific) ==========
    // The gallery page filters its own .gallery-item rows in an inline script
    // in gallery.html (bound to .activity-filter-btn), which also scrolls
    // #galleryGrid into view on category change. No global handler is needed
    // here; activities.html owns .activity-filter-btn via the ACTIVITY FILTER
    // block below.

    // ========== VIDEO AUTOPLAY GUARD ==========
    // Only the hero background video (marked .hero-bg-video) may autoplay.
    // Any other <video> on the page is paused and stripped of autoplay cues.
    document.querySelectorAll('video:not(.hero-bg-video)').forEach(function (vid) {
        try { vid.pause(); } catch (e) {}
        vid.removeAttribute('autoplay');
        vid.removeAttribute('muted');
        vid.removeAttribute('loop');
    });

    // ========== PROTECTED-MEDIA GUARD (opt-in) ==========
    // Deters right-click-save / drag-save on elements tagged data-protected
    // (hero background video, gallery lightbox image). Anything carrying
    // data-downloadable="true" (e.g. Resources PDFs) is explicitly exempt.
    function isDownloadable(el) {
        return !!(el && el.closest && el.closest('[data-downloadable="true"]'));
    }
    document.addEventListener('contextmenu', function (e) {
        var t = e.target;
        if (t && t.closest && t.closest('[data-protected]') && !isDownloadable(t)) {
            e.preventDefault();
        }
    });
    document.addEventListener('dragstart', function (e) {
        var t = e.target;
        if (t && t.closest && t.closest('[data-protected]') && !isDownloadable(t)) {
            e.preventDefault();
        }
    });

    // ========== ACTIVITY FILTER ==========
    const activityFilterBtns = document.querySelectorAll('.activity-filter-btn');
    if (activityFilterBtns.length > 0) {
        activityFilterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                activityFilterBtns.forEach(function (b) {
                    b.classList.remove('active');
                });
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                const items = document.querySelectorAll('.activity-card');

                items.forEach(function (item) {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        item.style.opacity = '0';
                        setTimeout(function () {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

        // ========== GALLERY ITEM CLICK - LIGHTBOX ==========
    // Gallery lightbox and filter logic lives in the inline <script> in
    // gallery.html. main.js only restores the original placeholder alert for
    // pages (e.g. anniversary teaser) that reuse .gallery-item without the
    // full lightbox markup.
    document.querySelectorAll('.gallery-item[data-modal]').forEach(function (item) {
        item.addEventListener('click', function () {
            const toast = document.createElement('div');
            toast.textContent = '\uD83D\uDCF8 Photo placeholder. Add your real school image here.';
            toast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#0056A3;color:white;padding:12px 24px;border-radius:8px;font-size:0.9rem;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,0.2);animation:fadeInUp 0.3s ease;max-width:90vw;text-align:center;';
            document.body.appendChild(toast);
            setTimeout(function () {
                toast.style.opacity = '0';
                toast.style.transition = 'opacity 0.3s';
                setTimeout(function () {
                    toast.remove();
                }, 300);
            }, 2500);
        });
    });

// ========== DECORATIVE PLANES IN HERO ==========
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const planeIcon = document.createElement('i');
        planeIcon.className = 'fas fa-plane';
        planeIcon.style.cssText = `
            position: absolute;
            top: 15%;
            right: 5%;
            font-size: 1.8rem;
            color: rgba(255, 255, 255, 0.12);
            z-index: 2;
            animation: float 4s ease-in-out infinite;
            pointer-events: none;
        `;
        heroSection.appendChild(planeIcon);

        const secondPlane = document.createElement('i');
        secondPlane.className = 'fas fa-plane';
        secondPlane.style.cssText = `
            position: absolute;
            top: 25%;
            right: 15%;
            font-size: 1.2rem;
            color: rgba(255, 215, 0, 0.08);
            z-index: 2;
            animation: float 5s ease-in-out infinite 1s;
            pointer-events: none;
            transform: rotate(15deg);
        `;
        heroSection.appendChild(secondPlane);
    }

    // ========== CONSOLE WELCOME ==========
    // Initialize website search (if search bar exists; guard for load order -
    // search.js may execute after main.js depending on script tags)
    if (document.getElementById('siteSearch') && typeof initSearch === 'function') {
        initSearch();
    }

    // Show announcement banner (if exists)
    if (typeof showAnnouncementBanner === 'function') {
        showAnnouncementBanner();
    }

    // Initialize accessibility and security features
    if (typeof initAccessibility === 'function') {
        initAccessibility();
    }

    // Initialize cookie consent
    if (typeof COOKIE_CONSENT !== 'undefined' && COOKIE_CONSENT.showBanner) {
        COOKIE_CONSENT.showBanner();
    }

    // Initialize testimonials carousel
    if (typeof initTestimonialsCarousel === 'function') {
        initTestimonialsCarousel();
    }

    // Initialize newsletter
    initNewsletter();

        // Initialize PWA install button
    initPWAInstall();

    // ========== SKIP-TO-CONTENT LINK ==========
    if (!document.getElementById('skipToContent')) {
        var skipLink = document.createElement('a');
        skipLink.id = 'skipToContent';
        skipLink.href = '#mainContent';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // ========== PREFERS-REDUCED-MOTION ==========
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        document.body.classList.add('reduced-motion');
    } else {
        document.body.classList.add('increased-motion');
    }


    console.log('%c Brightlingsea Academy Website %c Ready!',
        'background:#0056A3;color:white;font-size:14px;font-weight:bold;padding:8px;border-radius:4px 0 0 4px;',
        'background:#FFD700;color:#003D7A;font-size:14px;font-weight:bold;padding:8px;border-radius:0 4px 4px 0;');
    console.log('%c Color Palette: Blue #0056A3 | Orange #FF6B35 | Yellow #FFD700',
        'color:#4A5568;font-size:12px;');
});

/**
 * SERVICE WORKER REGISTRATION
 *
 * The SW scope must cover the whole site, so resolve the root from this
 * script's own URL rather than hard-coding '/'. That keeps things working
 * when the site is hosted in a sub-directory (e.g. /school/).
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        var thisScript = document.currentScript || document.querySelector('script[src*="main.js"]');
        var root = '';
        if (thisScript && thisScript.src) {
            // .../assets/js/main.js  ->  .../
            root = thisScript.src.replace(/assets\/js\/main\.js.*$/, '');
        }

        navigator.serviceWorker.register(root + 'service-worker.js?v=12')
            .then(function (registration) {
                console.log('ServiceWorker registered:', registration.scope);

                // Ask a waiting worker to activate immediately so users get
                // the new cache without needing a hard refresh.
                if (registration.waiting) {
                    registration.waiting.postMessage({ action: 'skipWaiting' });
                }
                registration.addEventListener('updatefound', function () {
                    var installing = registration.installing;
                    if (!installing) return;
                    installing.addEventListener('statechange', function () {
                        if (installing.state === 'installed' && navigator.serviceWorker.controller) {
                            installing.postMessage({ action: 'skipWaiting' });
                        }
                    });
                });
            })
            .catch(function (error) {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

/**
 * Newsletter subscription
 */
function initNewsletter() {
    const emailInput = document.getElementById('newsletterEmail');
    const subscribeBtn = document.getElementById('newsletterSubscribe');
    const success = document.getElementById('newsletterSuccess');
    const form = document.querySelector('.newsletter-form');

    if (!emailInput || !subscribeBtn || !form) return;

    subscribeBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailInput.style.borderColor = 'var(--orange)';
            emailInput.focus();
            return;
        }
        emailInput.style.borderColor = '';

        // Simulate subscription
        subscribeBtn.disabled = true;
        subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';

        setTimeout(() => {
            form.style.display = 'none';
            success.classList.add('show');
            console.log('📧 Newsletter subscription:', email);
            // In production: send to Mailchimp/Brevo API
        }, 1500);
    });

    // Allow Enter key to submit
    emailInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            subscribeBtn.click();
        }
    });
}

/**
 * PWA Install button
 *
 * The original implementation dispatched a synthetic `beforeinstallprompt`
 * event instead of calling `prompt()` on the real deferred event, so the
 * install button could never work. The real event is now captured and used.
 */
let deferredInstallPrompt = null;

function initPWAInstall() {
    const installBtn = document.getElementById('pwaInstallBtn');

    // Capture the browser prompt as early as possible — the button may be
    // rendered further down the page.
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredInstallPrompt = e;

        const btn = document.getElementById('pwaInstallBtn');
        if (!btn) return;
        btn.disabled = false;
        btn.style.display = 'inline-flex';
        btn.innerHTML = '<i class="fas fa-download"></i> Add to Home Screen';
    });

    window.addEventListener('appinstalled', () => {
        deferredInstallPrompt = null;
        if (!installBtn) return;
        installBtn.disabled = true;
        installBtn.innerHTML = '<i class="fas fa-check"></i> App Installed';
    });

    if (!installBtn) return;

    installBtn.addEventListener('click', async function () {
        if (!deferredInstallPrompt) {
            // Not available: already installed, iOS Safari, or unsupported browser.
            installBtn.innerHTML = '<i class="fas fa-info-circle"></i> Use browser menu &rarr; Add to Home Screen';
            return;
        }

        deferredInstallPrompt.prompt();
        try {
            const choice = await deferredInstallPrompt.userChoice;
            console.log('PWA install choice:', choice && choice.outcome);
        } catch (err) {
            console.log('PWA install prompt failed:', err);
        }
        deferredInstallPrompt = null;
        installBtn.disabled = true;
        });
}



// ============================================================
// BROADCAST THEME CHANGE (for footer + cross-tab sync)
// Listed here last so every module below has already registered.
// ============================================================
try {
    window.BrightlingseaTheme = {
        get: function () {
            return document.body && document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        },
        set: function (theme) {
            document.body.classList.toggle('dark-mode', theme === 'dark');
            document.documentElement.classList.toggle('dark-mode', theme === 'dark');
            document.documentElement.setAttribute('data-theme', theme);
            try {
                localStorage.setItem('bla_theme', theme);
            } catch (e) {}
            try {
                document.dispatchEvent(new CustomEvent('brightlingsea:themechange', { detail: { theme: theme } }));
            } catch (e) {}
        },
        toggle: function () {
            var next = this.get() === 'dark' ? 'light' : 'dark';
            this.set(next);
        }
    };
} catch (e) {}
