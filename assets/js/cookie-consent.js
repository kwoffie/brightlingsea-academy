/**
 * BRIGHTLINGSEA ACADEMY — COOKIE CONSENT
 * GDPR-compliant cookie consent banner
 */

const COOKIE_CONSENT = {
    cookieName: 'bla_cookie_consent',
    expiryDays: 365,
    
    categories: [
        {
            id: 'essential',
            name: 'Essential Cookies',
            description: 'These cookies are necessary for the website to function and cannot be disabled. They include cookies for basic functionality, session management, and security.',
            required: true,
            cookies: ['session', 'csrf_token']
        },
        {
            id: 'analytics',
            name: 'Analytics Cookies',
            description: 'These cookies help us understand how visitors interact with the website, including page views, top pages, and device information. We use privacy-friendly analytics that do not track personal data.',
            required: false,
            cookies: ['plausible', 'page_views']
        },
        {
            id: 'marketing',
            name: 'Marketing Cookies',
            description: 'These cookies are used to send you relevant content, reminders, and updates about school events and activities via our newsletter and communication channels.',
            required: false,
            cookies: ['newsletter', 'preferences']
        }
    ],
    
    getSavedPreferences: function() {
        const saved = localStorage.getItem(this.cookieName);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return null;
            }
        }
        // Check cookie fallback
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(this.cookieName + '=')) {
                try {
                    return JSON.parse(decodeURIComponent(cookie.substring(this.cookieName.length + 1)));
                } catch (e) {
                    return null;
                }
            }
        }
        return null;
    },
    
    savePreferences: function(prefs) {
        // Save to localStorage
        localStorage.setItem(this.cookieName, JSON.stringify(prefs));
        
        // Save to cookie with 365-day expiry
        const expires = new Date();
        expires.setTime(expires.getTime() + (this.expiryDays * 24 * 60 * 60 * 1000));
        document.cookie = this.cookieName + '=' + encodeURIComponent(JSON.stringify(prefs)) + ';expires=' + expires.toUTCString() + ';path=/;SameSite=Lax';
    },
    
    showBanner: function() {
        const saved = this.getSavedPreferences();
        
        // If no preference saved, show banner
        if (!saved) {
            this._renderBanner();
            this._renderModal();
        } else {
            // Apply saved preferences
            this._applyPreferences(saved);
            this._initAnalytics(saved);
        }
    },
    
    _renderBanner: function() {
        if (document.getElementById('cookieConsentBanner')) return;
        
        const banner = document.createElement('div');
        banner.id = 'cookieConsentBanner';
        banner.innerHTML = `
            <div class="cookie-banner">
                <div class="cookie-banner-inner">
                    <div class="cookie-banner-content">
                        <div class="cookie-banner-icon">
                            <i class="fas fa-cookie-bite"></i>
                        </div>
                        <div class="cookie-banner-text">
                            <strong>We use cookies to enhance your experience.</strong>
                            <span class="cookie-banner-desc">By continuing to use this website, you agree to our use of cookies. You can customize your preferences anytime.</span>
                        </div>
                    </div>
                    <div class="cookie-banner-actions">
                        <button class="cookie-btn cookie-accept-all" id="cookieAcceptAll">
                            <i class="fas fa-check"></i> Accept All
                        </button>
                        <button class="cookie-btn cookie-reject" id="cookieReject">
                            <i class="fas fa-times"></i> Reject Non-Essential
                        </button>
                        <button class="cookie-btn cookie-preferences" id="cookiePreferences">
                            <i class="fas fa-sliders-h"></i> Manage Preferences
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        this._bindBannerEvents();
    },
    
    _renderModal: function() {
        if (document.getElementById('cookiePreferencesModal')) return;
        
        const modal = document.createElement('div');
        modal.id = 'cookiePreferencesModal';
        modal.innerHTML = `
            <div class="cookie-modal-backdrop" id="cookieModalBackdrop"></div>
            <div class="cookie-modal">
                <div class="cookie-modal-header">
                    <h3><i class="fas fa-cookie-bite" style="color:var(--orange);margin-right:8px;"></i> Cookie Preferences</h3>
                    <button class="cookie-modal-close" id="cookieModalClose" aria-label="Close preferences">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="cookie-modal-body">
                    <p style="color:var(--text-gray);font-size:0.9rem;margin-bottom:20px;">
                        You can customize your cookie preferences below. Your choices will be saved for 1 year.
                    </p>
                    <div class="cookie-category-list" id="cookieCategoryList">
                        <!-- Populated by JS -->
                    </div>
                    <div class="cookie-modal-actions" style="display:flex;gap:8px;margin-top:24px;padding-top:16px;border-top:1px solid var(--bg-lighter);">
                        <button class="btn btn-blue" id="cookieSavePreferences">
                            <i class="fas fa-save"></i> Save Preferences
                        </button>
                        <button class="btn btn-outline" id="cookieAcceptAllModal">
                            Accept All
                        </button>
                        <button class="btn btn-outline" id="cookieRejectAllModal">
                            Reject All
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this._bindModalEvents();
    },
    
    _bindBannerEvents: function() {
        const banner = document.getElementById('cookieConsentBanner');
        if (!banner) return;
        
        const acceptAll = document.getElementById('cookieAcceptAll');
        const reject = document.getElementById('cookieReject');
        const preferences = document.getElementById('cookiePreferences');
        const modal = document.getElementById('cookiePreferencesModal');
        const backdrop = document.getElementById('cookieModalBackdrop');
        const close = document.getElementById('cookieModalClose');
        
        if (acceptAll) {
            acceptAll.addEventListener('click', () => {
                this.savePreferences({ essential: true, analytics: true, marketing: true });
                banner.style.display = 'none';
                this._applyPreferences({ essential: true, analytics: true, marketing: true });
                this._initAnalytics({ essential: true, analytics: true, marketing: true });
            });
        }
        
        if (reject) {
            reject.addEventListener('click', () => {
                this.savePreferences({ essential: true, analytics: false, marketing: false });
                banner.style.display = 'none';
                this._applyPreferences({ essential: true, analytics: false, marketing: false });
            });
        }
        
        if (preferences) {
            preferences.addEventListener('click', () => {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                this._populateCategories();
            });
        }
        
        // Close modal on backdrop click
        if (backdrop) {
            backdrop.addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            });
        }
        
        if (close) {
            close.addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            });
        }
        
        // Keyboard: Escape to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    },
    
    _bindModalEvents: function() {
        const acceptAll = document.getElementById('cookieAcceptAllModal');
        const rejectAll = document.getElementById('cookieRejectAllModal');
        const save = document.getElementById('cookieSavePreferences');
        
        if (acceptAll) {
            acceptAll.addEventListener('click', () => {
                this.savePreferences({ essential: true, analytics: true, marketing: true });
                this._applyPreferences({ essential: true, analytics: true, marketing: true });
                this._initAnalytics({ essential: true, analytics: true, marketing: true });
                document.getElementById('cookiePreferencesModal').style.display = 'none';
                document.body.style.overflow = '';
            });
        }
        
        if (rejectAll) {
            rejectAll.addEventListener('click', () => {
                this.savePreferences({ essential: true, analytics: false, marketing: false });
                this._applyPreferences({ essential: true, analytics: false, marketing: false });
                document.getElementById('cookiePreferencesModal').style.display = 'none';
                document.body.style.overflow = '';
            });
        }
        
        if (save) {
            save.addEventListener('click', () => {
                const checkboxes = document.querySelectorAll('.cookie-category-checkbox');
                const prefs = {};
                checkboxes.forEach(cb => {
                    const id = cb.dataset.category;
                    prefs[id] = cb.checked;
                });
                prefs.essential = true; // Always save essential
                this.savePreferences(prefs);
                this._applyPreferences(prefs);
                if (prefs.analytics) this._initAnalytics(prefs);
                document.getElementById('cookiePreferencesModal').style.display = 'none';
                document.body.style.overflow = '';
            });
        }
    },
    
    _populateCategories: function() {
        const list = document.getElementById('cookieCategoryList');
        if (!list) return;
        
        list.innerHTML = '';
        COOKIE_CONSENT.categories.forEach(cat => {
            const item = document.createElement('div');
            item.className = 'cookie-category-item';
            if (cat.required) {
                item.innerHTML = `
                    <div class="cookie-category-header">
                        <div class="cookie-category-info">
                            <span class="cookie-category-name">${cat.name} <span class="cookie-required-badge">Required</span></span>
                            <span class="cookie-category-desc">${cat.description}</span>
                        </div>
                        <div class="cookie-category-status">
                            <i class="fas fa-check-circle" style="color:var(--blue);"></i>
                            <span style="font-size:0.8rem;color:var(--blue);font-weight:600;">Always Active</span>
                        </div>
                    </div>
                    <div class="cookie-category-cookies" style="padding:12px 16px;background:var(--bg-light);border-radius:8px;margin-top:8px;font-size:0.8rem;color:var(--text-light);">
                        <span style="color:var(--text-light);font-weight:600;margin-right:4px;">Cookies used:</span>
                        ${cat.cookies.join(', ')}
                    </div>
                `;
            } else {
                item.innerHTML = `
                    <div class="cookie-category-header">
                        <div class="cookie-category-info">
                            <span class="cookie-category-name">${cat.name}</span>
                            <span class="cookie-category-desc">${cat.description}</span>
                        </div>
                    </div>
                    <div class="cookie-category-actions" style="padding:12px 16px;background:var(--bg-light);border-radius:8px;margin-top:8px;display:flex;align-items:center;justify-content:space-between;">
                        <span style="font-size:0.8rem;color:var(--text-light);">Cookies: ${cat.cookies.join(', ')}</span>
                        <label class="cookie-switch" style="position:relative;display:inline-block;width:48px;height:26px;flex-shrink:0;">
                            <input type="checkbox" class="cookie-category-checkbox" data-category="${cat.id}" ${cat.id === 'essential' ? 'checked disabled' : ''} style="position:absolute;opacity:0;width:0;height:0;">
                            <span class="cookie-switch-slider" style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:var(--bg-lighter);transition:0.3s;border-radius:26px;">
                                <span class="cookie-switch-thumb" style="position:absolute;content:'';height:20px;width:20px;left:3px;bottom:3px;background-color:white;transition:0.3s;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,0.2);"></span>
                            </span>
                        </label>
                    </div>
                `;
            }
            list.appendChild(item);
        });
    },
    
    _applyPreferences: function(prefs) {
        if (prefs.analytics) {
            // Enable analytics (just log for now)
            console.log('✓ Analytics cookies enabled');
        }
        if (!prefs.analytics) {
            // Disable analytics tracking
            console.log('✗ Analytics cookies disabled');
        }
        if (prefs.marketing) {
            console.log('✓ Marketing cookies enabled');
        }
    },
    
    _initAnalytics: function(prefs) {
        if (prefs.analytics) {
            // Placeholder for Plausible/Fathom analytics init
            // In production: load analytics script here
            console.log('Analytics initialized with cookie preference:', prefs.analytics);
        }
    }
};

// Auto-initialize
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => COOKIE_CONSENT.showBanner());
    } else {
        COOKIE_CONSENT.showBanner();
    }
})();
