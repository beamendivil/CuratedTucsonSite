


// Main JavaScript for Sonoran Desert Wine Experiences
// Handles all interactive features, animations, and user interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTypewriter();
    initScrollAnimations();
    initCarousels();
    initRegionMap();
    initTextAnimations();
    initNavigation();
});

// Typewriter effect for hero section
function initTypewriter() {
    const typedElement = document.getElementById('typed-regions');
    if (typedElement) {
        new Typed('#typed-regions', {
            strings: [
                'Sonoita • Arizona\'s First AVA',
                'Elgin • Rolling Grasslands',
                'Wilcox • High Desert Plateau',
                'Cottonwood • Verde Valley'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            startDelay: 1000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal-up').forEach(el => {
        observer.observe(el);
    });
}

// Initialize Splide carousels
function initCarousels() {
    // Winery carousel
    const wineryCarousel = document.getElementById('winery-carousel');
    if (wineryCarousel) {
        new Splide('#winery-carousel', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            breakpoints: {
                1024: { perPage: 2 },
                768: { perPage: 1 }
            }
        }).mount();
    }

    // Testimonial carousel
    const testimonialCarousel = document.getElementById('testimonial-carousel');
    if (testimonialCarousel) {
        new Splide('#testimonial-carousel', {
            type: 'loop',
            perPage: 1,
            autoplay: true,
            interval: 6000,
            pauseOnHover: true,
            arrows: false,
            pagination: true
        }).mount();
    }
}

// Interactive wine regions map
function initRegionMap() {
    const regionData = {
        sonoita: {
            title: 'Sonoita AVA',
            established: 'Est. 1984 • Arizona\'s First AVA',
            description: 'Rolling grasslands at 5,000 feet elevation, surrounded by the Santa Rita, Huachuca, and Whetstone Mountains. Cooler climate with warm days and crisp nights.',
            details: {
                'Elevation:': '4,000-5,000 ft',
                'Wineries:': '20+',
                'Signature:': 'Tempranillo, Syrah',
                'Soil:': 'Limestone-rich'
            }
        },
        willcox: {
            title: 'Willcox AVA',
            established: 'Est. 2016 • High Desert Plateau',
            description: 'High-desert plateau with elevations of 4,200-4,500 feet. Known for warm, sunny days and cool nights with volcanic soil deposits.',
            details: {
                'Elevation:': '4,200-4,500 ft',
                'Wineries:': '15+',
                'Signature:': 'Grenache, Malvasia',
                'Soil:': 'Volcanic loam'
            }
        },
        verde: {
            title: 'Verde Valley AVA',
            established: 'Est. 2021 • Arizona\'s Newest AVA',
            description: 'Lower elevation at 3,000-4,000 feet with shorter growing season. Known for Rhône-style varietals and unique river valley terroir.',
            details: {
                'Elevation:': '3,000-4,000 ft',
                'Wineries:': '12+',
                'Signature:': 'Sangiovese, Viognier',
                'Soil:': 'River valley mix'
            }
        }
    };

    // Add click handlers to region markers
    document.querySelectorAll('.region-marker').forEach(marker => {
        marker.addEventListener('click', function() {
            const region = this.dataset.region;
            updateRegionInfo(regionData[region]);
            
            // Animate marker
            anime({
                targets: this,
                scale: [1.3, 1.5, 1.3],
                duration: 600,
                easing: 'easeOutElastic(1, .8)'
            });
        });

        marker.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.3,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });

        marker.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
}

// Update region information panel
function updateRegionInfo(data) {
    const infoPanel = document.getElementById('region-info');
    if (!infoPanel || !data) return;

    const detailsHTML = Object.entries(data.details).map(([key, value]) => `
        <div>
            <span class="font-medium text-charcoal">${key}</span>
            <span class="text-charcoal/70">${value}</span>
        </div>
    `).join('');

    infoPanel.innerHTML = `
        <div class="wine-card rounded-2xl p-8">
            <div class="flex items-center mb-4">
                <div class="w-4 h-4 rounded-full bg-wine-burgundy mr-3"></div>
                <h3 class="font-display text-2xl font-bold text-charcoal">${data.title}</h3>
            </div>
            <div class="text-sm text-wine-burgundy font-medium mb-3">${data.established}</div>
            <p class="text-charcoal/80 mb-4 leading-relaxed">${data.description}</p>
            <div class="grid grid-cols-2 gap-4 text-sm">
                ${detailsHTML}
            </div>
        </div>
    `;

    // Animate the update
    anime({
        targets: infoPanel.firstElementChild,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutCubic'
    });
}

// Text animations using Splitting.js
function initTextAnimations() {
    // Initialize Splitting.js
    if (typeof Splitting !== 'undefined') {
        Splitting();
    }

    // Animate hero title letters
    const heroTitle = document.querySelector('[data-splitting]');
    if (heroTitle) {
        const chars = heroTitle.querySelectorAll('.char');
        
        anime({
            targets: chars,
            opacity: [0, 1],
            translateY: [50, 0],
            rotateZ: [10, 0],
            duration: 800,
            delay: anime.stagger(50, {start: 500}),
            easing: 'easeOutExpo'
        });
    }
}

// Navigation and smooth scrolling
function initNavigation() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navigation background on scroll
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('bg-white/98');
                nav.classList.remove('bg-white/95');
            } else {
                nav.classList.add('bg-white/95');
                nav.classList.remove('bg-white/98');
            }
        });
    }

    // Button interactions
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutCubic'
            });
        });

        btn.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutCubic'
            });
        });

        btn.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            anime({
                targets: ripple,
                scale: 2,
                opacity: [0.3, 0],
                duration: 600,
                easing: 'easeOutCubic',
                complete: () => ripple.remove()
            });
        });
    });
}

// Wine pairing guide functionality (for pairing.html)
function initWinePairing() {
    const wineSelections = document.querySelectorAll('.wine-selection');
    const foodPairings = document.querySelectorAll('.food-pairing');
    
    wineSelections.forEach(wine => {
        wine.addEventListener('click', function() {
            const wineType = this.dataset.wine;
            
            // Update active state
            wineSelections.forEach(w => w.classList.remove('active'));
            this.classList.add('active');
            
            // Show relevant food pairings
            foodPairings.forEach(pairing => {
                if (pairing.dataset.pairsWith === wineType) {
                    pairing.style.display = 'block';
                    anime({
                        targets: pairing,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 400,
                        easing: 'easeOutCubic'
                    });
                } else {
                    pairing.style.display = 'none';
                }
            });
        });
    });
}

// Booking calendar functionality (for experiences.html)
function initBookingCalendar() {
    const calendar = document.getElementById('booking-calendar');
    if (!calendar) return;

    // Generate calendar for current month
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    generateCalendar(calendar, year, month);
}

function generateCalendar(container, year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    let calendarHTML = `
        <div class="calendar-header mb-4">
            <h3 class="font-display text-xl font-bold text-charcoal">${monthNames[month]} ${year}</h3>
        </div>
        <div class="calendar-grid grid grid-cols-7 gap-1">
            <div class="calendar-day-header text-center text-sm font-medium text-charcoal/60 p-2">Sun</div>
            <div class="calendar-day-header text-center text-sm font-medium text-charcoal/60 p-2">Mon</div>
            <div class="calendar-day-header text-center text-sm font-medium text-charcoal/60 p-2">Tue</div>
            <div class="calendar-day-header text-center text-sm font-medium text-charcoal/60 p-2">Wed</div>
            <div class="calendar-day-header text-center text-sm font-medium text-charcoal/60 p-2">Thu</div>
            <div class="calendar-day-header text-center text-sm font-medium text-charcoal/60 p-2">Fri</div>
            <div class="calendar-day-header text-center text-sm font-medium text-charcoal/60 p-2">Sat</div>
    `;
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarHTML += '<div class="calendar-day"></div>';
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === new Date().getDate() && month === new Date().getMonth();
        const hasAvailability = Math.random() > 0.3; // Mock availability
        
        calendarHTML += `
            <div class="calendar-day p-2 text-center cursor-pointer rounded-lg transition-colors ${
                isToday ? 'bg-wine-burgundy text-white' : 
                hasAvailability ? 'hover:bg-sage-green hover:text-white' : 
                'text-gray-400'
            }" ${hasAvailability ? `data-date="${year}-${month + 1}-${day}"` : ''}>
                ${day}
                ${hasAvailability ? '<div class="w-2 h-2 bg-golden-hour rounded-full mx-auto mt-1"></div>' : ''}
            </div>
        `;
    }
    
    calendarHTML += '</div>';
    container.innerHTML = calendarHTML;
    
    // Add click handlers for available dates
    container.querySelectorAll('[data-date]').forEach(day => {
        day.addEventListener('click', function() {
            const date = this.dataset.date;
            showTimeSlots(date);
        });
    });
}

function showTimeSlots(date) {
    // Mock time slots
    const timeSlots = [
        '10:00 AM - Vineyard Tour',
        '12:00 PM - Private Tasting',
        '2:00 PM - Food & Wine Pairing',
        '4:00 PM - Sunset Tasting'
    ];
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 class="font-display text-xl font-bold text-charcoal mb-4">Available Times - ${date}</h3>
            <div class="space-y-2 mb-6">
                ${timeSlots.map(slot => `
                    <button class="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-wine-burgundy hover:bg-wine-burgundy hover:text-white transition-colors">
                        ${slot}
                    </button>
                `).join('')}
            </div>
            <button class="w-full bg-wine-burgundy text-white py-3 rounded-lg font-medium hover:bg-wine-burgundy/90 transition-colors" onclick="this.closest('.fixed').remove()">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate modal
    anime({
        targets: modal.querySelector('.bg-white'),
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutCubic'
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for use in other pages
window.SonoranWine = {
    initWinePairing,
    initBookingCalendar,
    debounce
};