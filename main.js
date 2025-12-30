


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

// ============================================
// WINE 101 COURSE PLAYER
// ============================================

// Course curriculum data
const courseData = {
    'wine-basics': {
        title: 'Wine Basics & Terminology',
        slides: [
            {
                type: 'text',
                title: 'Welcome to Wine 101',
                content: `<p class="mb-4">Wine is simply fermented grape juice, but the variables in that process create infinite complexity. In this module, we will cover the fundamental language you need to describe wine to guests.</p>
                          <div class="bg-cream p-4 rounded-lg border-l-4 border-wine-burgundy">
                            <strong>Key Concept:</strong> Confidence sells wine. You don't need to know everything, you just need to know how to describe what you are selling.
                          </div>`
            },
            {
                type: 'text',
                title: 'The 5 Structural Components',
                content: `<ul class="space-y-4">
                            <li><strong>Sweetness:</strong> Detected on the tip of the tongue. Is it dry (no sugar) or off-dry?</li>
                            <li><strong>Acidity:</strong> The "pucker" factor. Makes your mouth water. Crucial for food pairing.</li>
                            <li><strong>Tannin:</strong> Found in red wines. Dries out your mouth (like oversteeped tea). Comes from grape skins.</li>
                            <li><strong>Alcohol:</strong> The "heat" felt in the back of the throat. Adds body.</li>
                            <li><strong>Body:</strong> The weight of the wine (Skim milk vs. Whole milk vs. Cream).</li>
                          </ul>`
            },
            {
                type: 'quiz',
                question: 'Which component is primarily responsible for the "drying" sensation in red wines?',
                options: ['Acidity', 'Tannin', 'Alcohol', 'Sugar'],
                correct: 1,
                explanation: 'Tannins bind to proteins in your saliva, causing a drying or astringent sensation.'
            }
        ]
    },
    'wine-service': {
        title: 'Professional Service Standards',
        slides: [
            { type: 'text', title: 'The Mise en Place', content: 'Always have your "tools" ready: A double-hinged corkscrew (wine key) and a clean polishing cloth (lith) are mandatory.' },
            { 
                type: 'text', 
                title: 'Opening the Bottle', 
                content: `<ol class="list-decimal pl-5 space-y-2">
                            <li>Present the label to the host.</li>
                            <li>Cut the foil under the second lip to prevent wine touching foil.</li>
                            <li>Wipe the top of the cork.</li>
                            <li>Insert screw, pull cork 90% out, finish by hand (silently).</li>
                            <li>Wipe the bottle opening again.</li>
                          </ol>` 
            },
            {
                type: 'scenario',
                title: 'The Improper Pour',
                content: `
                    <div class="bg-gray-100 p-4 rounded-lg italic mb-4">
                        "You are serving a bottle of Arizona Syrah. You pour the host a taste. 
                        They nod. You immediately move clockwise to fill everyone's glass, 
                        filling them to the brim to be generous."
                    </div>
                    <p class="font-bold">What two mistakes did you make?</p>
                `,
                options: [
                    'Did not wipe the bottle & filled too high.',
                    'Moved clockwise & served host first.',
                    'Served host first & filled too high.'
                ],
                correct: 2,
                explanation: 'Never fill to the brim (swirl space is needed!) and always serve guests before returning to fill the host\'s glass.'
            },
            {
                type: 'quiz',
                question: 'Who should be served first at the table?',
                options: ['The Host', 'The oldest person', 'Ladies, then Gentlemen', 'Whoever is closest'],
                correct: 2,
                explanation: 'Tradition dictates serving ladies first, then gentlemen, and the host last (regardless of gender).'
            }
        ]
    },
    'arizona-wines': {
        title: 'Arizona Wine Regions',
        slides: [
            {
                type: 'text',
                title: 'Why Arizona?',
                content: 'Arizona is a high-elevation desert region. This entails hot days and very cool nights (diurnal shift). This temperature swing allows grapes to ripen sugar (heat) while maintaining acidity (cool nights).'
            },
            {
                type: 'text',
                title: 'The 3 Major AVAs',
                content: `<div class="grid gap-4">
                            <div class="p-4 border rounded bg-gray-50"><strong>Sonoita (1984):</strong> Rolling grasslands, soil similar to Burgundy. Known for Pinot Noir and sparkling.</div>
                            <div class="p-4 border rounded bg-gray-50"><strong>Willcox (2016):</strong> Produces 70% of AZ grapes. High desert playa. Rhone varietals thrive here (Syrah, Grenache).</div>
                            <div class="p-4 border rounded bg-gray-50"><strong>Verde Valley (2021):</strong> North of Phoenix. Diverse microclimates. Strong tourism focus.</div>
                          </div>`
            },
            {
                type: 'quiz',
                question: 'Which varietal is often considered Arizona\'s signature red?',
                options: ['Cabernet Sauvignon', 'Pinot Noir', 'Syrah/Grenache', 'Merlot'],
                correct: 2,
                explanation: 'Rhone varietals like Syrah, Grenache, and Mourvedre thrive in Arizona\'s climate.'
            }
        ]
    }
};

// Wine 101 state management
let currentModuleId = null;
let currentSlideIndex = 0;
let userProgress = null;

function initWine101() {
    // Load progress from localStorage
    userProgress = JSON.parse(localStorage.getItem('wine101_progress')) || {
        'wine-basics': false,
        'wine-service': false,
        'arizona-wines': false,
        'food-pairing': false,
        'customer-service': false
    };
    
    updateDashboardUI();
    
    const certDate = document.getElementById('cert-date');
    if (certDate) {
        certDate.textContent = new Date().toLocaleDateString();
    }
}

function updateDashboardUI() {
    if (!userProgress) return;
    
    // Update module cards with completion status
    Object.keys(userProgress).forEach(moduleId => {
        const card = document.querySelector(`[data-module="${moduleId}"]`);
        if (card && userProgress[moduleId]) {
            card.classList.add('completed');
            const progressFill = card.querySelector('.progress-fill');
            if (progressFill) progressFill.style.width = '100%';
        }
    });
    
    // Check if all modules complete for certificate
    const completedCount = Object.values(userProgress).filter(Boolean).length;
    const totalModules = Object.keys(userProgress).length;
    
    const certBtn = document.getElementById('view-certificate-btn');
    if (certBtn) {
        certBtn.disabled = completedCount < totalModules;
    }
}

function startModule(moduleId) {
    if (!courseData[moduleId]) {
        alert('This module is coming soon!');
        return;
    }
    currentModuleId = moduleId;
    currentSlideIndex = 0;
    
    // Show Modal
    const player = document.getElementById('course-player');
    if (player) {
        player.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    renderSlide();
    buildOutline();
}

function closeCoursePlayer() {
    const player = document.getElementById('course-player');
    if (player) {
        player.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
    updateDashboardUI();
}

function buildOutline() {
    const outline = document.getElementById('course-outline');
    if (!outline || !currentModuleId) return;
    
    const module = courseData[currentModuleId];
    outline.innerHTML = module.slides.map((slide, index) => {
        let icon = '';
        if (slide.type === 'quiz') icon = '❓';
        else if (slide.type === 'scenario') icon = '📋';
        
        return `
            <div class="p-3 text-sm rounded cursor-pointer ${index === currentSlideIndex ? 'bg-wine-burgundy text-white' : 'text-charcoal hover:bg-gray-100'}"
                 onclick="jumpToSlide(${index})">
                 ${index + 1}. ${slide.title} ${icon}
            </div>
        `;
    }).join('');
}

function jumpToSlide(index) {
    currentSlideIndex = index;
    renderSlide();
}

function renderSlide() {
    if (!currentModuleId) return;
    
    const module = courseData[currentModuleId];
    const slide = module.slides[currentSlideIndex];
    const stage = document.getElementById('content-stage');
    
    if (!stage) return;
    
    // Update Header Info
    const moduleTitle = document.getElementById('player-module-title');
    const slideCounter = document.getElementById('slide-counter');
    const progressBar = document.getElementById('player-progress-bar');
    
    if (moduleTitle) moduleTitle.textContent = module.title;
    if (slideCounter) slideCounter.textContent = `${currentSlideIndex + 1}/${module.slides.length}`;
    
    const percent = ((currentSlideIndex + 1) / module.slides.length) * 100;
    if (progressBar) progressBar.style.width = `${percent}%`;

    // Render Content based on Type
    stage.style.opacity = '0';
    
    setTimeout(() => {
        if (slide.type === 'text') {
            stage.innerHTML = `
                <h2 class="font-display text-3xl font-bold text-wine-burgundy mb-6">${slide.title}</h2>
                <div class="prose prose-lg text-charcoal/80">
                    ${slide.content}
                </div>
            `;
            const nextBtn = document.getElementById('next-btn');
            if (nextBtn) nextBtn.disabled = false;
        } else if (slide.type === 'scenario') {
            stage.innerHTML = `
                <h2 class="font-display text-3xl font-bold text-terracotta mb-6">📋 Scenario: ${slide.title}</h2>
                <div class="bg-white p-8 rounded-2xl border-2 border-terracotta/30 shadow-lg">
                    <div class="mb-6">
                        ${slide.content}
                    </div>
                    <div class="space-y-3" id="current-quiz-options">
                        ${slide.options.map((opt, i) => `
                            <button onclick="checkAnswer(${i}, ${slide.correct}, '${slide.explanation.replace(/'/g, "\\'")}')" 
                                class="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-terracotta transition-all bg-white">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                    <div id="quiz-result" class="mt-6 hidden p-4 rounded-lg"></div>
                </div>
            `;
            const nextBtn = document.getElementById('next-btn');
            if (nextBtn) nextBtn.disabled = true;
        } else if (slide.type === 'quiz') {
            stage.innerHTML = `
                <h2 class="font-display text-3xl font-bold text-charcoal mb-6">Knowledge Check</h2>
                <div class="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                    <p class="text-xl font-semibold mb-6">${slide.question}</p>
                    <div class="space-y-3" id="current-quiz-options">
                        ${slide.options.map((opt, i) => `
                            <button onclick="checkAnswer(${i}, ${slide.correct}, '${slide.explanation.replace(/'/g, "\\'")}')" 
                                class="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-wine-burgundy transition-all bg-white">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                    <div id="quiz-result" class="mt-6 hidden p-4 rounded-lg"></div>
                </div>
            `;
            const nextBtn = document.getElementById('next-btn');
            if (nextBtn) nextBtn.disabled = true;
        }
        
        // Update Buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
        if (nextBtn) {
            nextBtn.textContent = currentSlideIndex === module.slides.length - 1 ? "Complete Module" : "Next";
        }

        stage.style.opacity = '1';
        buildOutline();
    }, 200);
}

function checkAnswer(selected, correct, explanation) {
    const buttons = document.getElementById('current-quiz-options')?.children;
    const resultBox = document.getElementById('quiz-result');
    
    if (!buttons || !resultBox) return;
    
    // Disable all buttons
    for (let btn of buttons) btn.disabled = true;

    if (selected === correct) {
        buttons[selected].classList.add('bg-sage-green/10', 'border-sage-green');
        resultBox.className = 'mt-6 p-4 rounded-lg bg-sage-green/10 text-sage-green block';
        resultBox.innerHTML = `<strong>Correct!</strong> ${explanation}`;
    } else {
        buttons[selected].classList.add('bg-terracotta/10', 'border-terracotta');
        buttons[correct].classList.add('bg-sage-green/10', 'border-sage-green');
        resultBox.className = 'mt-6 p-4 rounded-lg bg-terracotta/10 text-terracotta block';
        resultBox.innerHTML = `<strong>Incorrect.</strong> ${explanation}`;
    }
    
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) nextBtn.disabled = false;
}

function nextSlide() {
    if (!currentModuleId) return;
    
    const module = courseData[currentModuleId];
    if (currentSlideIndex < module.slides.length - 1) {
        currentSlideIndex++;
        renderSlide();
    } else {
        completeModule();
    }
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        renderSlide();
    }
}

function completeModule() {
    // Save progress
    if (userProgress && currentModuleId) {
        userProgress[currentModuleId] = true;
        localStorage.setItem('wine101_progress', JSON.stringify(userProgress));
    }
    
    // Celebrate
    const stage = document.getElementById('content-stage');
    if (stage) {
        stage.innerHTML = `
            <div class="text-center py-12">
                <div class="w-20 h-20 bg-sage-green text-white rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
                <h2 class="font-display text-3xl font-bold text-charcoal mb-4">Module Complete!</h2>
                <p class="text-lg text-charcoal/70 mb-8">Progress saved.</p>
                <button onclick="closeCoursePlayer()" class="btn-primary px-8 py-3 rounded-lg font-medium">
                    Back to Dashboard
                </button>
            </div>
        `;
    }
}

// Generate unique certificate ID
function generateCertificateID(name) {
    // Simple hash function to create a "unique" looking ID like: AWP-2025-X7Z9
    const dateCode = new Date().getFullYear();
    const nameHash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const randomSegment = Math.floor(Math.random() * 10000).toString(16).toUpperCase();
    return `AWP-${dateCode}-${nameHash}-${randomSegment}`;
}

// Download certificate as PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const certificateElement = document.querySelector('#certificate-content');
    
    // Visual feedback that work is happening
    const btn = document.getElementById('download-btn');
    const originalText = btn.textContent;
    btn.textContent = "Generating PDF...";
    
    html2canvas(certificateElement, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape, A4
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("Arizona_Wine_Professional_Cert.pdf");
        
        btn.textContent = originalText;
    });
}

function showCertificate() {
    const studentName = prompt("Enter your full name for the certificate:");
    if (!studentName) return;

    const certID = generateCertificateID(studentName);
    const dateStr = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

    // Inject data into the modal
    const modalContent = document.getElementById('certificate-modal');
    modalContent.innerHTML = `
        <div class="bg-white rounded-2xl max-w-4xl w-full p-4 relative shadow-2xl reveal-up">
            <button onclick="closeCertificate()" class="absolute top-4 right-4 text-charcoal z-50 hover:text-terracotta">✕ Close</button>
            
            <div id="certificate-content" class="bg-white p-10 border-8 border-double border-wine-burgundy text-center relative overflow-hidden">
                <div class="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
                    <span class="text-[150px]">🍷</span>
                </div>
                
                <div class="relative z-10">
                    <div class="w-20 h-20 bg-wine-burgundy text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    
                    <h1 class="font-display text-5xl font-bold text-wine-burgundy mb-2">Certificate of Completion</h1>
                    <p class="text-charcoal/60 uppercase tracking-[0.3em] text-sm mb-12">Arizona Wine Professional Program</p>
                    
                    <p class="text-xl italic text-charcoal/80 mb-4">This certifies that</p>
                    <h2 class="text-4xl font-display font-bold text-charcoal border-b-2 border-charcoal/20 pb-4 mb-8 inline-block px-12">
                        ${studentName}
                    </h2>
                    
                    <p class="text-lg text-charcoal/70 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Has successfully completed the Wine 101 curriculum, demonstrating proficiency in 
                        <strong>Arizona Viticulture</strong>, <strong>Service Standards</strong>, and <strong>Sensory Analysis</strong>.
                    </p>
                    
                    <div class="flex justify-between items-end mt-12 px-12">
                        <div class="text-left">
                            <div class="h-px w-48 bg-charcoal mb-3"></div>
                            <p class="text-xs font-bold uppercase text-charcoal/60">Program Director</p>
                            <p class="font-display text-lg">Sonoran Wine Exp.</p>
                        </div>
                        <div class="text-right">
                            <p class="text-sm font-mono text-charcoal/40 mb-1">ID: ${certID}</p>
                            <p class="font-bold text-wine-burgundy">${dateStr}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center mt-6">
                <button id="download-btn" onclick="downloadPDF()" class="btn-primary px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                    Download Official PDF
                </button>
            </div>
        </div>
    `;
    
    modalContent.classList.remove('hidden');
    modalContent.classList.add('flex');
}

function closeCertificate() {
    const modal = document.getElementById('certificate-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// Export functions for use in other pages
window.SonoranWine = {
    initWinePairing,
    initBookingCalendar,
    initWine101,
    debounce
};

// Make Wine 101 functions globally available for onclick handlers
window.startModule = startModule;
window.closeCoursePlayer = closeCoursePlayer;
window.jumpToSlide = jumpToSlide;
window.checkAnswer = checkAnswer;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.showCertificate = showCertificate;
window.closeCertificate = closeCertificate;
window.generateCertificateID = generateCertificateID;
window.downloadPDF = downloadPDF;