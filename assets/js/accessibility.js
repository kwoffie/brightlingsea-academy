/**
 * BRIGHTLINGSEA ACADEMY — ACCESSIBILITY & SECURITY
 * WCAG 2.1 AA compliance + security enhancements
 */

/**
 * Initialize accessibility features
 */
function initAccessibility() {
    // 1. Skip to content link
    addSkipToContent();
    
    // 2. Keyboard navigation for all interactive elements
    initKeyboardNavigation();
    
    // 3. Focus management for modals
    initFocusManagement();
    
    // 4. Reduced motion preference
    initReducedMotion();
    
    // 5. ARIA labels for icon-only buttons
    addARIAlabels();
    
    // 6. Color contrast adjustments for dark mode
    initContrastFixes();
}

/**
 * Add "Skip to content" link at top of body
 */
function addSkipToContent() {
    if (document.getElementById('skipToContent')) return;
    
    const skipLink = document.createElement('a');
    skipLink.id = 'skipToContent';
    skipLink.href = '#mainContent';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = 'position:absolute;top:100%;left:10px;z-index:9999;padding:10px 20px;background:var(--blue);color:white;text-decoration:none;border-radius:0 0 6px 6px;font-weight:600;opacity:0;transition:opacity 0.2s;';
    
    // Show on focus
    skipLink.addEventListener('focus', function() {
        this.style.opacity = '1';
    });
    skipLink.addEventListener('blur', function() {
        this.style.opacity = '0';
    });
    
    document.body.prepend(skipLink);
    
    // Ensure main content has ID — fall back to the first major section
    // (covers page-hero, homepage hero, grade-checker gc-hero, and any page
    // whose first block is a plain <section>).
    let main = document.getElementById('mainContent');
    if (!main) {
        const firstSection = document.querySelector('main, section.page-hero, section.hero, section.gc-hero, section.about-page-content, section.gallery-content, section.staff-content, section.resources-content, section.faq-content, section.contact-content, section');
        if (firstSection) {
            firstSection.id = 'mainContent';
        }
    }
}

/**
 * Ensure all interactive elements are keyboard accessible
 */
function initKeyboardNavigation() {
    // Tab order: ensure logical flow
    const focusableElements = document.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    // Add visible focus ring to all focusable elements
    focusableElements.forEach(el => {
        if (!el.style.borderRadius || el.style.borderRadius === '50%') {
            // Circular elements get outline
            el.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--blue)';
                this.style.outlineOffset = '2px';
            });
            el.addEventListener('blur', function() {
                this.style.outline = '';
            });
        }
    });
    
    // Close dropdowns on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open dropdowns, modals, or menus
            const openDropdown = document.querySelector('.site-search-dropdown:not([style*="display: none"])');
            if (openDropdown) {
                openDropdown.style.display = 'none';
                const searchInput = document.getElementById('siteSearch');
                if (searchInput) searchInput.blur();
            }
            
            const openModal = document.querySelector('.gc-modal[style*="display: flex"]');
            if (openModal) {
                openModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        }
    });
}

/**
 * Focus management for modals and dialogs
 */
function initFocusManagement() {
    // Track last focused element before modal opens
    let lastFocusedElement = null;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Check for modal open
            const openModal = document.querySelector('.gc-modal[style*="display: flex"], .lightbox[style*="display: flex"], .modal[style*="display: flex"]');
            if (openModal) {
                e.preventDefault();
                // Trap focus within modal
                const focusable = openModal.querySelectorAll('button, input, select, textarea, a[href]');
                const firstFocusable = focusable[0];
                const lastFocusable = focusable[focusable.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                    }
                }
            }
        }
    });
}

/**
 * Respect prefers-reduced-motion
 */
function initReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable all CSS animations
        document.querySelectorAll('style, link[rel="stylesheet"]').forEach(style => {
            if (style.tagName === 'style') {
                style.textContent = style.textContent.replace(
                    /animation:[^;]+;?/g,
                    'animation: none;'
                ).replace(
                    /transition:[^;]+;?/g,
                    'transition: none;'
                );
            }
        });
        
        // Remove animation classes
        document.querySelectorAll('.animate, .fadeIn, .slideIn, .pulse, .float, .bounce').forEach(el => {
            el.classList.remove('animate', 'fadeIn', 'slideIn', 'pulse', 'float', 'bounce');
        });
        
        // Disable reveal animations
        if (typeof observer !== 'undefined') {
            observer.disconnect();
        }
    }
    
    // Listen for changes
    prefersReducedMotion.addEventListener('change', function(e) {
        if (e.matches) {
            document.documentElement.style.setProperty('--transition-duration', '0s');
        } else {
            document.documentElement.style.setProperty('--transition-duration', '0.3s');
        }
    });
}

/**
 * Add ARIA labels to icon-only buttons
 */
function addARIAlabels() {
    const iconButtons = document.querySelectorAll(
        'a[class*="social-link"], button[aria-label], [class*="btn"][aria-label^=""]'
    );
    
    // Add aria-labels to social links
    document.querySelectorAll('.social-link').forEach(link => {
        const icon = link.querySelector('i');
        if (icon && !link.getAttribute('aria-label')) {
            const iconClass = icon.className;
            if (iconClass.includes('facebook')) {
                link.setAttribute('aria-label', 'Facebook');
            } else if (iconClass.includes('whatsapp')) {
                link.setAttribute('aria-label', 'WhatsApp');
            } else if (iconClass.includes('twitter')) {
                link.setAttribute('aria-label', 'Twitter');
            } else if (iconClass.includes('instagram')) {
                link.setAttribute('aria-label', 'Instagram');
            }
        }
    });
    
    // Add aria-labels to header icon buttons
    document.querySelectorAll('.site-search-toggle, .mobile-menu-toggle, .dark-mode-toggle').forEach(btn => {
        if (!btn.getAttribute('aria-label')) {
            const icon = btn.querySelector('i');
            if (icon) {
                const iconClass = icon.className;
                if (iconClass.includes('bars')) {
                    btn.setAttribute('aria-label', 'Toggle navigation menu');
                } else if (iconClass.includes('moon')) {
                    btn.setAttribute('aria-label', 'Toggle dark mode');
                } else if (iconClass.includes('sun')) {
                    btn.setAttribute('aria-label', 'Toggle light mode');
                } else if (iconClass.includes('search')) {
                    btn.setAttribute('aria-label', 'Search website');
                }
            }
        }
    });
}

/**
 * Color contrast fixes for accessibility
 */
function initContrastFixes() {
    // Check for yellow text on white background (low contrast issue)
    const yellowText = document.querySelectorAll('.text-yellow, [style*="color: #FFD700"], [style*="color: #ffd700"]');
    yellowText.forEach(el => {
        // Yellow #FFD700 on white has 1.4:1 contrast - fails WCAG AA
        // Check if element is on light background
        const bgColor = window.getComputedStyle(el).backgroundColor;
        if (bgColor.includes('255,255,255') || bgColor.includes('247,248,252')) {
            // Suggest darker yellow or add a note
            console.warn('Accessibility: Yellow text on light background - consider using #B8860B (DarkGoldenRod) for WCAG AA compliance');
            // Auto-fix: apply slightly darker yellow for better contrast
            el.style.color = '#C9A227';
        }
    });
    
    // Fix for dark mode: ensure yellow has enough contrast
    if (document.body.classList.contains('dark-mode')) {
        document.querySelectorAll('.text-yellow, [style*="color: #FFD700"]').forEach(el => {
            el.style.color = '#FFE066'; // Slightly lighter yellow for dark mode contrast
        });
    }
}

/**
 * Add security headers to the page via meta tags
 */
function addSecurityHeaders() {
    if (document.querySelector('meta[http-equiv="Content-Security-Policy"]')) return;
    
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://cdnjs.cloudflare.com https://fonts.googleapis.com; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'";
    document.head.appendChild(cspMeta);
    
    const xContentType = document.createElement('meta');
    xContentType.httpEquiv = 'X-Content-Type-Options';
    xContentType.content = 'nosniff';
    document.head.appendChild(xContentType);
    
    const xFrame = document.createElement('meta');
    xFrame.httpEquiv = 'X-Frame-Options';
    xFrame.content = 'DENY';
    document.head.appendChild(xFrame);
    
    const referrer = document.createElement('meta');
    referrer.httpEquiv = 'Referrer-Policy';
    referrer.content = 'strict-origin-when-cross-origin';
    document.head.appendChild(referrer);
    
    const permissions = document.createElement('meta');
    permissions.httpEquiv = 'Permissions-Policy';
    permissions.content = 'camera=(), microphone=(), geolocation=(), payment=()';
    document.head.appendChild(permissions);
    
    console.log('%c🔒 Security headers applied', 'color: green; font-weight: bold;');
}

/**
 * Initialize all accessibility and security features
 */
function initAll() {
    initAccessibility();
    addSecurityHeaders();
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}
