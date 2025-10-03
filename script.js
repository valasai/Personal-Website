// ===== COMPLETE WEBSITE REDESIGN - JAVASCRIPT =====

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initAnimations();
    initMobileMenu();
    initEmailObfuscation();
    initResearchChips();
    initPublicationInteractions();
    initPerformanceOptimizations();
    initAccessibility();
});

// ===== NAVIGATION =====
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Active navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        const progressBarElement = document.querySelector('.scroll-progress-bar');
        if (progressBarElement) {
            progressBarElement.style.width = scrollPercent + '%';
        }
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .stat-item, .publication-item, .research-chip');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Staggered animations for grid items
    const gridItems = document.querySelectorAll('.grid > *');
    gridItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        // Hamburger animation
        navToggle.addEventListener('click', function() {
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navToggle.classList.contains('active')) {
                    // Close animation
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    // Open animation
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
        
        // Close menu on link click
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// ===== EMAIL OBFUSCATION =====
function initEmailObfuscation() {
    const emailElements = document.querySelectorAll('.email-obfuscated');
    
    emailElements.forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.textContent.replace(' [at] ', '@');
            window.location.href = `mailto:${email}`;
        });
    });
}

// ===== RESEARCH CHIPS =====
function initResearchChips() {
    const researchChips = document.querySelectorAll('.research-chip');
    
    researchChips.forEach(chip => {
        chip.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Track interaction
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'Research',
                    event_label: this.textContent.trim()
                });
            }
        });
    });
}

// ===== PUBLICATION INTERACTIONS =====
function initPublicationInteractions() {
    const publicationItems = document.querySelectorAll('.publication-item');
    
    publicationItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = 'var(--shadow-2xl)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function initPerformanceOptimizations() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounced scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            // Scroll-based functionality here
        }, 100);
    });
    
    // Preload critical resources
    const criticalResources = [
        'styles.css',
        'script.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
}

// ===== ACCESSIBILITY =====
function initAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Keyboard navigation for mobile menu
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Trap focus in mobile menu when open
        document.addEventListener('keydown', function(e) {
            if (navMenu.classList.contains('active') && e.key === 'Escape') {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.focus();
            }
        });
    }
    
    // Focus management for modals and dropdowns
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const activeElement = document.activeElement;
            const focusableElements = document.querySelectorAll(
                'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
            );
            const focusableArray = Array.from(focusableElements);
            const firstFocusable = focusableArray[0];
            const lastFocusable = focusableArray[focusableArray.length - 1];
            
            if (e.shiftKey) {
                if (activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// ===== UTILITY FUNCTIONS =====

// Debounce function
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Get element offset
function getOffset(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== GLOBAL SEARCH FUNCTIONALITY =====
function initGlobalSearch() {
    const searchData = [
        { title: "Energy Security Assessment", type: "publication", url: "publications.html" },
        { title: "Wind Energy Potential", type: "publication", url: "publications.html" },
        { title: "Green Hydrogen Economics", type: "research", url: "research.html" },
        { title: "Energy Systems Modeling", type: "research", url: "research.html" },
        { title: "Teaching Materials", type: "teaching", url: "teaching.html" },
        { title: "Contact Information", type: "contact", url: "contact.html" }
    ];
    
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', debounce(function(e) {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 2) {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
                return;
            }
            
            const filtered = searchData.filter(item => 
                item.title.toLowerCase().includes(query)
            );
            
            if (filtered.length > 0) {
                searchResults.innerHTML = filtered.map(item => `
                    <div class="search-result-item">
                        <div class="search-result-title">${item.title}</div>
                        <div class="search-result-meta">${item.type}</div>
                    </div>
                `).join('');
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
                searchResults.style.display = 'block';
            }
        }, 300));
        
        // Hide results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
}

// ===== CITATION CHART =====
function initCitationChart() {
    const chartCanvas = document.getElementById('citation-chart');
    
    if (chartCanvas && typeof Chart !== 'undefined') {
        const ctx = chartCanvas.getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                datasets: [{
                    label: 'Citations',
                    data: [12, 19, 25, 42, 58, 89, 125, 167, 189, 212],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Could send to error tracking service
});

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initScrollEffects,
        initAnimations,
        initMobileMenu,
        initEmailObfuscation,
        initResearchChips,
        initPublicationInteractions,
        initPerformanceOptimizations,
        initAccessibility,
        debounce,
        throttle,
        formatNumber,
        getOffset,
        isInViewport
    };
}