/**
 * BRIGHTLINGSEA ACADEMY — TESTIMONIALS CAROUSEL
 * Interactive carousel for student testimonials
 */

function initTestimonialsCarousel() {
    const section = document.querySelector('.testimonials-section');
    if (!section || typeof TESTIMONIALS_DATA === 'undefined') return;
    
    const track = section.querySelector('.testimonials-track');
    const cardsContainer = section.querySelector('.testimonials-track');
    const prevBtn = section.querySelector('.testimonial-prev-btn');
    const nextBtn = section.querySelector('.testimonial-next-btn');
    const dotsContainer = section.querySelector('.testimonials-dots');
    const counter = section.querySelector('.testimonial-counter');
    const categoryTabs = section.querySelector('.testimonial-filter-tabs');
    const searchInput = section.querySelector('.testimonial-search input');
    
    if (!track) return;
    
    let currentIndex = 0;
    let currentCategory = 'all';
    let visibleCards = [];
    let cardsPerView = 3;
    
    // Determine cards per view based on screen width
    function updateCardsPerView() {
        if (window.innerWidth < 600) {
            cardsPerView = 1;
        } else if (window.innerWidth < 992) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }
    }
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    
    // Filter testimonials by category
    function getFilteredTestimonials() {
        const searchQuery = (searchInput ? searchInput.value.trim() : '').toLowerCase();
        
        let list = currentCategory !== 'all'
            ? TESTIMONIALS_DATA.filter(t => t.category === currentCategory)
            : TESTIMONIALS_DATA;
        
        if (searchQuery) {
            list = list.filter(t =>
                t.name.toLowerCase().includes(searchQuery) ||
                t.quote.toLowerCase().includes(searchQuery) ||
                t.category.toLowerCase().includes(searchQuery) ||
                t.achievement.toLowerCase().includes(searchQuery)
            );
        }
        
        return list;
    }
    
    // Set active dot
    function setActiveDot(index) {
        if (!dotsContainer) return;
        const dots = dotsContainer.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Update counter
    function updateCounter() {
        if (!counter) return;
        const filtered = getFilteredTestimonials();
        counter.textContent = `${currentIndex + 1} / ${filtered.length}`;
    }
    
    // Render cards
    function renderCards() {
        const filtered = getFilteredTestimonials();
        
        if (!cardsContainer) return;
        cardsContainer.innerHTML = '';
        
        if (filtered.length === 0) {
            cardsContainer.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-light);">No testimonials found.</div>';
            return;
        }
        
        // Show featured card first
        const featured = filtered.filter(t => t.id === 1);
        const regular = filtered.filter(t => t.id !== 1);
        
        const displayList = [...featured, ...regular];
        
        displayList.forEach((testimonial, index) => {
            const card = document.createElement('div');
            card.className = 'testimonial-card' + (testimonial.id === 1 ? ' featured' : '');
            
            const initials = testimonial.name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
            
            card.innerHTML = `
                <div class="testimonial-card-inner">
                    <div class="testimonial-card-category">${testimonial.category}</div>
                    <div class="testimonial-card-author">
                        <div class="testimonial-card-avatar">${initials}</div>
                        <div class="testimonial-card-info">
                            <div class="testimonial-card-name">${testimonial.name}</div>
                            <div class="testimonial-card-role">${testimonial.year}${testimonial.current ? ' · ' + testimonial.current : ''}</div>
                        </div>
                    </div>
                    <div class="testimonial-quote">${testimonial.quote}</div>
                    <div class="testimonial-achievement">
                        <i class="fas fa-star"></i>
                        <span>${testimonial.achievement}</span>
                    </div>
                </div>
            `;
            cardsContainer.appendChild(card);
        });
        
        // Update dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < displayList.length; i++) {
                const dot = document.createElement('button');
                dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
                dot.addEventListener('click', () => {
                    scrollToCard(i);
                });
                dotsContainer.appendChild(dot);
            }
        }
        
        updateCounter();
    }
    
    // Scroll to specific card
    function scrollToCard(index) {
        updateCardsPerView();
        const filtered = getFilteredTestimonials();
        if (filtered.length === 0) return;
        
        const maxIndex = Math.max(0, filtered.length - cardsPerView);
        currentIndex = Math.min(index, maxIndex);
        
        if (cardsContainer) {
            const cardWidth = cardsContainer.querySelector('.testimonial-card')?.offsetWidth || 380;
            const gap = 24;
            const offset = -(currentIndex * (cardWidth + gap));
            cardsContainer.style.transform = `translateX(${offset}px)`;
        }
        
        setActiveDot(currentIndex);
        updateCounter();
    }
    
    // Next/prev navigation
    function nextCard() {
        scrollToCard(currentIndex + 1);
    }
    
    function prevCard() {
        scrollToCard(currentIndex - 1);
    }
    
    // Category filter
    if (categoryTabs) {
        categoryTabs.querySelectorAll('.tour-filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                categoryTabs.querySelectorAll('.tour-filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentCategory = this.dataset.category;
                currentIndex = 0;
                renderCards();
                scrollToCard(0);
            });
        });
    }
    
    // Search
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentIndex = 0;
            renderCards();
            scrollToCard(0);
        });
    }
    
    // Navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', nextCard);
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', prevCard);
    }
    
    // Auto-rotate
    let autoRotateInterval = setInterval(nextCard, 5000);
    
    // Pause on hover
    if (cardsContainer) {
        cardsContainer.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
        cardsContainer.addEventListener('mouseleave', () => {
            autoRotateInterval = setInterval(nextCard, 5000);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!section.contains(document.activeElement)) return;
        if (e.key === 'ArrowLeft') prevCard();
        if (e.key === 'ArrowRight') nextCard();
    });
    
    // Initial render
    renderCards();
    scrollToCard(0);
}

// Auto-initialize
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTestimonialsCarousel);
    } else {
        initTestimonialsCarousel();
    }
})();
