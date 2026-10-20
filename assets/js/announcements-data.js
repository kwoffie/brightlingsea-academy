/**
 * BRIGHTLINGSEA ACADEMY — ANNOUNCEMENTS DATA
 * Site-wide announcement banners
 */

const ANNOUNCEMENTS = [
    {
        id: 1,
        type: 'info', // info | warning | alert
        title: '📢 Important Updates',
        message: 'BECE 2024 Results are now available on the Grade Checker! 98% pass rate achieved.',
        link: 'grade-checker/launcher.html',
        linkText: 'Check Results Now',
        expiry: null, // null = permanent
        priority: 1 // lower = higher priority
    },
    {
        id: 2,
        type: 'warning',
        title: '⚠️ Fee Payment Reminder',
        message: 'Term 1, 2024/2025 fees must be paid by Friday, 20th September 2024. Contact accounts office for payment plans.',
        link: 'contact.html',
        linkText: 'Contact Accounts',
        expiry: null,
        priority: 2
    },
    {
        id: 3,
        type: 'info',
        title: '📚 New Academic Year',
        message: 'School reopens for the 2024/2025 academic year on Monday, 9th September 2024. Assembly at 7:30 AM.',
        link: null,
        linkText: null,
        expiry: new Date('2024-09-15').getTime(),
        priority: 3
    }
];

/**
 * Get active announcements (not expired)
 */
function getActiveAnnouncements() {
    const now = Date.now();
    return ANNOUNCEMENTS.filter(a => !a.expiry || a.expiry > now)
                          .sort((a, b) => a.priority - b.priority);
}

/**
 * Resolve the site root so announcement links work at any page depth.
 * Derived from this script's own URL: <root>/assets/js/announcements-data.js
 */
function getAnnouncementRoot() {
    const src = document.currentScript && document.currentScript.src;
    if (!src) return '';
    return src.replace(/assets\/js\/announcements-data\.js.*$/, '');
}

/**
 * Show announcement banner
 */
function showAnnouncementBanner() {
    let savedDismissals = [];
    try {
        savedDismissals = JSON.parse(localStorage.getItem('bla_dismissed_announcement_ids') || '[]');
    } catch (e) {
        savedDismissals = [];
    }

    const active = getActiveAnnouncements().filter(a => !savedDismissals.includes(a.id));

    if (active.length === 0) return;

    const container = document.getElementById('announcementBanner');
    if (!container) return;

    // Show highest priority announcement
    const announcement = active[0];

    const colors = {
        info: { bg: 'var(--blue-light)', border: 'var(--blue)', icon: '🔔', text: 'var(--blue)' },
        warning: { bg: 'var(--orange-light)', border: 'var(--orange)', icon: '⚠️', text: 'var(--orange)' },
        alert: { bg: 'rgba(233,30,99,0.1)', border: 'var(--red, #E91E63)', icon: '🚨', text: '#E91E63' }
    };

    const style = colors[announcement.type] || colors.info;
    const root = getAnnouncementRoot();
    const link = announcement.link ? root + announcement.link : null;

    container.innerHTML = `
        <div class="announcement-banner" role="status" style="background:${style.bg};border-left:4px solid ${style.border};">
            <div class="announcement-inner">
                <div class="announcement-content">
                    <span class="announcement-icon" aria-hidden="true" style="color:${style.text};font-size:1.1rem;">${style.icon}</span>
                    <strong style="color:${style.text};">${announcement.title}</strong>
                    <span class="announcement-message" style="margin:0 8px;color:var(--text-dark);">${announcement.message}</span>
                    ${link ? `<a href="${link}" class="announcement-link" style="color:${style.text};font-weight:600;text-decoration:none;margin-left:8px;">${announcement.linkText} &rarr;</a>` : ''}
                </div>
                <button class="announcement-close" aria-label="Dismiss announcement" title="Dismiss">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    `;

    // Dismiss button
    const closeBtn = container.querySelector('.announcement-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            const banner = this.closest('.announcement-banner');
            if (banner) banner.style.display = 'none';
            // Save dismissal
            try {
                const dismissed = JSON.parse(localStorage.getItem('bla_dismissed_announcement_ids') || '[]');
                if (!dismissed.includes(announcement.id)) dismissed.push(announcement.id);
                localStorage.setItem('bla_dismissed_announcement_ids', JSON.stringify(dismissed));
            } catch (e) { /* storage unavailable */ }
        });
    }
}

/**
 * Auto-bootstrap the banner.
 *
 * `showAnnouncementBanner()` shipped but nothing ever called it, so the
 * banner markup present on every page stayed empty. Boot it here so the
 * feature works wherever this data file is loaded.
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showAnnouncementBanner);
} else {
    showAnnouncementBanner();
}
