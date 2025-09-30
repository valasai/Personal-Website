// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Smooth scrolling for anchor links
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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Animate stats on scroll
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const finalValue = stat.textContent;
                const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
                
                if (!isNaN(numericValue)) {
                    animateNumber(stat, 0, numericValue, 2000, finalValue);
                }
                observer.unobserve(stat);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration, originalText) {
    const startTime = performance.now();
    const suffix = originalText.replace(/[\d]/g, '');
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    animateStats();
});

// Form validation and submission (for contact form)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Enhanced Publication filter functionality
function filterPublications() {
    const yearFilter = document.getElementById('yearFilter');
    const typeFilter = document.getElementById('typeFilter');
    const topicFilter = document.getElementById('topicFilter');
    const publications = document.querySelectorAll('.publication-item');
    
    if (!yearFilter || !typeFilter || !topicFilter) return;
    
    function applyFilters() {
        const selectedYear = yearFilter.value;
        const selectedType = typeFilter.value;
        const selectedTopic = topicFilter.value;
        
        publications.forEach(publication => {
            const year = publication.dataset.year;
            const category = publication.dataset.category || '';
            const type = publication.dataset.type || '';
            
            let show = true;
            
            // Year filter
            if (selectedYear !== 'all' && year !== selectedYear) {
                show = false;
            }
            
            // Type filter
            if (selectedType !== 'all' && !type.includes(selectedType)) {
                show = false;
            }
            
            // Topic filter
            if (selectedTopic !== 'all' && !category.includes(selectedTopic)) {
                show = false;
            }
            
            if (show) {
                publication.style.display = 'block';
                publication.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                publication.style.display = 'none';
            }
        });
    }
    
    // Apply filters when any filter changes
    [yearFilter, typeFilter, topicFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', applyFilters);
        }
    });
}

// Sort publications functionality
function sortPublications() {
    const sortSelect = document.getElementById('sortBy');
    const publicationsContainer = document.querySelector('.publications-container');
    
    if (!sortSelect || !publicationsContainer) return;
    
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        const yearSections = Array.from(document.querySelectorAll('.year-section'));
        
        // Sort year sections based on selected criteria
        yearSections.sort((a, b) => {
            const yearA = parseInt(a.querySelector('.year-header').textContent);
            const yearB = parseInt(b.querySelector('.year-header').textContent);
            
            switch (sortValue) {
                case 'year-desc':
                    return yearB - yearA;
                case 'year-asc':
                    return yearA - yearB;
                case 'citations-desc':
                    // Sort by citations (would need citation data in HTML)
                    return 0;
                case 'title-asc':
                    // Sort by title alphabetically
                    return 0;
                default:
                    return yearB - yearA;
            }
        });
        
        // Re-append sorted sections
        yearSections.forEach(section => {
            publicationsContainer.appendChild(section);
        });
    });
}

// Search functionality for publications
function searchPublications() {
    const searchInput = document.getElementById('publication-search');
    const publications = document.querySelectorAll('.publication-item');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            publications.forEach(publication => {
                const title = publication.querySelector('.publication-title').textContent.toLowerCase();
                const authors = publication.querySelector('.publication-authors').textContent.toLowerCase();
                const abstract = publication.querySelector('.publication-abstract').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || authors.includes(searchTerm) || abstract.includes(searchTerm)) {
                    publication.style.display = 'block';
                } else {
                    publication.style.display = 'none';
                }
            });
        });
    }
}

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
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
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', function() {
    lazyLoadImages();
});

// Back to top button
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', function() {
    createBackToTopButton();
});

// Add CSS for back to top button
const backToTopCSS = `
.back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: var(--shadow-lg);
}

.back-to-top.show {
    opacity: 1;
    visibility: visible;
}

.back-to-top:hover {
    background-color: var(--secondary-color);
    transform: translateY(-2px);
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.error {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = backToTopCSS;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

// Carousel functionality for featured papers
let currentSlide = 0;
const slides = document.querySelectorAll('.paper-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    if (slides.length === 0) return;
    
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Calculate current slide index
    currentSlide = (n + slides.length) % slides.length;
    
    // Show current slide
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
    }
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function moveCarousel(direction) {
    showSlide(currentSlide + direction);
}

function currentSlide(n) {
    showSlide(n - 1);
}

// Auto-advance carousel
function autoAdvanceCarousel() {
    if (slides.length > 1) {
        setInterval(() => {
            moveCarousel(1);
        }, 5000); // Change slide every 5 seconds
    }
}

// Initialize all functionality safely
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize all features
        filterPublications();
        searchPublications();
        sortPublications();
        autoAdvanceCarousel();
        
        // Add loading states
        document.body.classList.add('loaded');
        
    } catch (error) {
        console.error('Error initializing website:', error);
    }
});

// Service Worker registration for PWA capabilities (optional)
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
