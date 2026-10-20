/**
 * BRIGHTLINGSEA ACADEMY — WEBSITE SEARCH
 * Client-side search across pages, staff, and content
 */

// Site index for search - built from nav structure + staff data
const SEARCH_INDEX = (function() {
    const index = [];
    
    // Navigation pages
    const pages = [
        { title: 'Home', url: 'index.html', description: 'Brightlingsea Academy homepage', category: 'Page' },
        { title: 'About Us', url: 'about.html', description: 'Our history, mission, vision, and leadership', category: 'Page' },
        { title: 'Gallery', url: 'gallery.html', description: 'School photos, events, activities', category: 'Page' },
        { title: 'Activities', url: 'activities.html', description: 'Sports, clubs, events, and student life', category: 'Page' },
        { title: 'Anniversary', url: 'anniversary.html', description: 'School anniversary celebrations and history', category: 'Page' },
        { title: 'Contact', url: 'contact.html', description: 'Contact information, phone, email, location', category: 'Page' },
        { title: 'Our Staff', url: 'staff.html', description: 'Meet our teaching and support staff', category: 'Page' },
        { title: 'Facilities', url: 'facilities.html', description: 'Our campus facilities and school animal', category: 'Page' },
        { title: 'Campus & Location', url: 'campus.html', description: 'School views and how to find us', category: 'Page' },
        { title: 'Building Project', url: 'building-project.html', description: 'Our community footbridge project', category: 'Page' }
    ];
    
    pages.forEach(p => {
        index.push({
            type: 'page',
            title: p.title,
            url: p.url,
            description: p.description,
            keywords: p.title.toLowerCase() + ' ' + p.description.toLowerCase()
        });
    });
    
    // Staff members (from staff-data.js)
    if (typeof getAllStaff === 'function') {
        getAllStaff().forEach(staff => {
            index.push({
                type: 'staff',
                title: staff.name,
                url: 'staff.html',
                description: staff.title + ' — ' + staff.department + (staff.subject ? '. Teaches: ' + staff.subject : ''),
                keywords: staff.name.toLowerCase() + ' ' + staff.title.toLowerCase() + ' ' + staff.department.toLowerCase() + ' ' + (staff.subject || '').toLowerCase()
            });
        });
    }
    
    // Grade checker classes (feature removed — index left empty intentionally)
    
    return index;
})();

/**
 * Fuse.js-like simple search
 */
function searchWebsite(query) {
    if (!query || !query.trim()) return [];
    
    const q = query.toLowerCase().trim();
    const terms = q.split(/\s+/).filter(t => t.length > 1);
    
    const results = [];
    
    SEARCH_INDEX.forEach(item => {
        let score = 0;
        const keywords = item.keywords;
        
        // Exact match
        if (keywords.includes(q)) {
            score = 100;
        }
        
        // Individual term matching
        terms.forEach(term => {
            if (keywords.includes(term)) {
                score += 20;
            }
            // Partial match
            if (item.title.toLowerCase().includes(term)) {
                score += 30;
            }
            if (item.description.toLowerCase().includes(term)) {
                score += 10;
            }
        });
        
        if (score > 0) {
            results.push({ ...item, score });
        }
    });
    
    // Sort by score descending
    results.sort((a, b) => b.score - a.score);
    
    // Return top 8 results
    return results.slice(0, 8);
}

/**
 * Initialize search functionality on a page
 */
function initSearch() {
    const searchInput = document.getElementById('siteSearch');
    const searchDropdown = document.getElementById('siteSearchDropdown');
    
    if (!searchInput || !searchDropdown) return;
    
    let searchTimeout = null;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        const query = this.value.trim();
        
        if (!query) {
            searchDropdown.style.display = 'none';
            return;
        }
        
        searchTimeout = setTimeout(() => {
            const results = searchWebsite(query);
            renderSearchResults(results, searchDropdown);
        }, 200);
    });
    
    searchInput.addEventListener('focus', function() {
        const query = this.value.trim();
        if (query) {
            const results = searchWebsite(query);
            renderSearchResults(results, searchDropdown);
        }
    });
    
    // Close dropdown on click outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
            searchDropdown.style.display = 'none';
        }
    });
    
    // Keyboard navigation
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchDropdown.style.display = 'none';
            this.blur();
        }
    });
}

function renderSearchResults(results, dropdown) {
    if (results.length === 0) {
        dropdown.innerHTML = `
            <div class="search-empty">
                <i class="fas fa-search"></i>
                <span>No results for "<strong>${escapeHTML(dropdown.dataset.query || '')}</strong>"</span>
            </div>
        `;
        dropdown.style.display = 'block';
        return;
    }
    
    let html = '<div class="search-results-list">';
    
    results.forEach((result, index) => {
        const icon = result.type === 'staff' ? 'fas fa-user' :
                     result.type === 'grade' ? 'fas fa-book' :
                     result.type === 'tool' ? 'fas fa-search' : 'fas fa-file';
        
        const color = result.type === 'staff' ? 'var(--orange)' :
                      result.type === 'grade' ? 'var(--blue)' :
                      result.type === 'tool' ? 'var(--yellow)' : 'var(--text-light)';
        
        html += `
            <a href="${SEARCH_ROOT ? SEARCH_ROOT + result.url : result.url}" class="search-result-item" data-index="${index}">
                <div class="search-result-icon" style="color:${color};">
                    <i class="${icon}"></i>
                </div>
                <div class="search-result-content">
                    <div class="search-result-title">${escapeHTML(result.title)}</div>
                    <div class="search-result-desc">${escapeHTML(result.description)}</div>
                </div>
                <div class="search-result-type">${escapeHTML(result.type)}</div>
            </a>
        `;
    });
    
    html += '</div>';
    dropdown.innerHTML = html;
    dropdown.style.display = 'block';
    dropdown.dataset.query = results[0]?.title || '';
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Handle search result clicks for keyboard navigation
document.addEventListener('click', function(e) {
    const resultItem = e.target.closest('.search-result-item');
    if (resultItem) {
        const url = resultItem.getAttribute('href');
        if (url) {
            window.location.href = url;
        }
    }
});

/* ======================================================================
 * RUNTIME WIRING
 * ----------------------------------------------------------------------
 * `initSearch()` existed but nothing ever called it, and only some pages
 * shipped the search markup — so site search was effectively dead.
 * The block below:
 *   1. derives the site root so result links work on any page depth,
 *   2. injects the desktop search box + mobile search bar when missing,
 *   3. boots the search behaviour,
 *   4. binds the Ctrl/⌘ + K shortcut advertised in the markup.
 * ====================================================================== */

const SEARCH_ROOT = (function () {
    const src = document.currentScript && document.currentScript.src;
    if (!src) return '';
    // script lives at <root>/assets/js/search.js → strip the known suffix
    return src.replace(/assets\/js\/search\.js.*$/, '');
})();

function injectSearchMarkup() {
    if (document.getElementById('siteSearch')) return true;

    const nav = document.querySelector('header.site-header .nav-container');
    if (!nav) return false;

    const wrap = document.createElement('div');
    wrap.className = 'site-search';
    wrap.style.marginLeft = 'auto';
    wrap.style.marginRight = '16px';
    wrap.innerHTML =
        '<div class="site-search-input-wrap" style="position:relative;">' +
            '<i class="fas fa-search site-search-icon" aria-hidden="true"></i>' +
            '<input type="text" id="siteSearch" class="site-search-input" placeholder="Search..." ' +
                   'aria-label="Search website" autocomplete="off">' +
            '<span class="site-search-shortcut" aria-hidden="true">Ctrl K</span>' +
        '</div>' +
        '<div class="site-search-dropdown" id="siteSearchDropdown"></div>';
    nav.appendChild(wrap);

    // Mobile toggle + slide-down bar (CSS already ships for both).
    const header = document.querySelector('header.site-header');
    if (header && !document.querySelector('.site-search-toggle')) {
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'site-search-toggle';
        toggle.setAttribute('aria-label', 'Open search');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<i class="fas fa-search" aria-hidden="true"></i>';
        nav.appendChild(toggle);

        const bar = document.createElement('div');
        bar.className = 'site-search-mobile';
        bar.innerHTML =
            '<label class="sr-only" for="siteSearchMobile">Search website</label>' +
            '<input type="text" id="siteSearchMobile" placeholder="Search pages, staff, classes...">';
        header.appendChild(bar);

        toggle.addEventListener('click', function () {
            const open = bar.style.display === 'block';
            bar.style.display = open ? 'none' : 'block';
            toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
            if (!open) document.getElementById('siteSearchMobile').focus();
        });

        // Mirror mobile queries into the main search box so there is a single
        // rendering path for results.
        const mobileInput = document.getElementById('siteSearchMobile');
        mobileInput.addEventListener('keydown', function (e) {
            if (e.key !== 'Enter') return;
            const target = document.getElementById('siteSearch');
            if (!target) return;
            target.value = this.value;
            const results = searchWebsite(this.value);
            renderSearchResults(results, document.getElementById('siteSearchDropdown'));
            bar.style.display = 'none';
        });
    }

    return true;
}

function bootSearch() {
    if (!document.getElementById('siteSearch')) {
        injectSearchMarkup();
    }
    initSearch();

    document.addEventListener('keydown', function (e) {
        if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== 'k') return;
        const input = document.getElementById('siteSearch');
        if (!input) return;
        e.preventDefault();
        input.focus();
        input.select();
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootSearch);
} else {
    bootSearch();
}
