/**
 * Main JavaScript File for Final Project
 * Handles navigation, animations, and interactive features
 */

// ===========================
// CONSTANTS
// ===========================
const ANIMATION_DELAYS = {
  SHORT: 500,
  MEDIUM: 1000,
  LONG: 1500,
  EXTRA_LONG: 2000
};

const SCROLL_REVEAL_DISTANCE = "50px";
const SCROLL_REVEAL_DURATION = 1000;

// ===========================
// PAGE LOADER
// ===========================
/**
 * Hides the page loader after window load event
 */
window. addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.classList.add("hide");
    } else {
        console.warn("Loader element not found");
    }
});

// ===========================
// NAVIGATION MENU
// ===========================
/**
 * Mobile Navigation Menu Toggle Handler
 * Manages the hamburger menu open/close state and icon changes
 */
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

if (menuBtn && navLinks) {
    const menuBtnIcon = menuBtn.querySelector("i");

    /**
     * Toggle navigation menu on button click
     */
    menuBtn.addEventListener("click", (e) => {
        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");
        if (menuBtnIcon) {
            menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
            // Update ARIA label for accessibility
            menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
            menuBtn.setAttribute("aria-expanded", isOpen);
        }
    });

    /**
     * Close navigation menu when a link is clicked
     */
    navLinks.addEventListener("click", (e) => {
        navLinks.classList.remove("open");
        if (menuBtnIcon) {
            menuBtnIcon.setAttribute("class", "ri-menu-line");
            menuBtn.setAttribute("aria-label", "Open menu");
            menuBtn.setAttribute("aria-expanded", "false");
        }
    });

    // Close menu on Escape key press (accessibility)
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navLinks.classList.contains("open")) {
            navLinks.classList.remove("open");
            if (menuBtnIcon) {
                menuBtnIcon.setAttribute("class", "ri-menu-line");
                menuBtn.setAttribute("aria-label", "Open menu");
                menuBtn.setAttribute("aria-expanded", "false");
            }
        }
    });
} else {
    console.error("Navigation elements (menu-btn or nav-links) not found");
}

// ===========================
// SCROLL REVEAL ANIMATIONS
// ===========================
/**
 * Default configuration for ScrollReveal animations
 */
const scrollRevealOption = {
    distance: SCROLL_REVEAL_DISTANCE,
    origin: "bottom",
    duration: SCROLL_REVEAL_DURATION,
};

// Check if ScrollReveal is available
if (typeof ScrollReveal !== 'undefined') {
    /**
     * Header Section Animations
     */
    ScrollReveal().reveal(".header__content h4", {
        ...scrollRevealOption,
    });
    ScrollReveal().reveal(".header__content h1", {
        ...scrollRevealOption,
        delay: ANIMATION_DELAYS. SHORT,
    });
    ScrollReveal().reveal(".header__content h2", {
        ...scrollRevealOption,
        delay:  ANIMATION_DELAYS.MEDIUM,
    });
    ScrollReveal().reveal(".header__content p", {
        ...scrollRevealOption,
        delay: ANIMATION_DELAYS.LONG,
    });
    ScrollReveal().reveal(".header__btn", {
        ...scrollRevealOption,
        delay: ANIMATION_DELAYS.EXTRA_LONG,
    });

    /**
     * Introduction Cards Animation
     */
    ScrollReveal().reveal(".intro__card", {
        ...scrollRevealOption,
        interval: ANIMATION_DELAYS.SHORT,
    });

    /**
     * About Section Animations
     */
    ScrollReveal().reveal(
        ".about__row:nth-child(3) .about__image img, .about__row:nth-child(5) .about__image img",
        {
            ...scrollRevealOption,
            origin: "left",
        }
    );
    ScrollReveal().reveal(".about__row:nth-child(4) .about__image img", {
        ...scrollRevealOption,
        origin: "right",
    });
    ScrollReveal().reveal(".about__content span", {
        ...scrollRevealOption,
        delay: ANIMATION_DELAYS. SHORT,
    });
    ScrollReveal().reveal(".about__content h4", {
        ...scrollRevealOption,
        delay:  ANIMATION_DELAYS.MEDIUM,
    });
    ScrollReveal().reveal(".about__content p", {
        ...scrollRevealOption,
        delay: ANIMATION_DELAYS.LONG,
    });

    /**
     * Product Cards Animation
     */
    ScrollReveal().reveal(".product__card", {
        ...scrollRevealOption,
        interval: ANIMATION_DELAYS.SHORT,
    });

    /**
     * Service Cards Animation
     */
    ScrollReveal().reveal(".service__card", {
        duration: SCROLL_REVEAL_DURATION,
        interval: ANIMATION_DELAYS.SHORT,
    });

    /**
     * Instagram Grid Animation
     */
    ScrollReveal().reveal(".instagram__grid img", {
        duration: SCROLL_REVEAL_DURATION,
        interval: ANIMATION_DELAYS.SHORT,
    });
} else {
    console.warn("ScrollReveal library not loaded");
}

// ===========================
// SWIPER SLIDER
// ===========================
/**
 * Initialize Swiper slider with responsive configuration
 */
if (typeof Swiper !== 'undefined') {
    const swiper = new Swiper(".swiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        // Responsive breakpoints
        breakpoints: {
            // When window width is >= 640px
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // When window width is >= 1024px
            1024: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        },
        // Optional: Add pagination
        pagination: {
            el: '. swiper-pagination',
            clickable: true,
        },
        // Optional: Add navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '. swiper-button-prev',
        },
        // Accessibility
        a11y: {
            enabled: true,
        },
    });
} else {
    console.warn("Swiper library not loaded");
}

// ===========================
// SMOOTH SCROLL
// ===========================
/**
 * Enable smooth scrolling for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignore empty anchors
        if (href === '#' || href === '#! ') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// BACK TO TOP BUTTON
// ===========================
/**
 * Show/hide back to top button based on scroll position
 */
const backToTopBtn = document.getElementById("back-to-top");

if (backToTopBtn) {
    // Show button when user scrolls down 300px
    window.addEventListener("scroll", () => {
        if (window. pageYOffset > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    // Scroll to top when button is clicked
    backToTopBtn.addEventListener("click", () => {
        window. scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ===========================
// DARK MODE TOGGLE
// ===========================
/**
 * Toggle between light and dark mode
 */
const darkModeToggle = document.getElementById("dark-mode-toggle");

if (darkModeToggle) {
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);

    // Update toggle button state
    if (currentTheme === "dark") {
        darkModeToggle.classList.add("active");
    }

    darkModeToggle.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        
        if (theme === "light") {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            darkModeToggle.classList.add("active");
        } else {
            document. documentElement.setAttribute("data-theme", "light");
            localStorage. setItem("theme", "light");
            darkModeToggle. classList.remove("active");
        }
    });
}

// ===========================
// FORM VALIDATION
// ===========================
/**
 * Display error message for form field
 */
function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
    input.classList.add('error');
}

/**
 * Validate contact form before submission
 * Note: Form validation will be enhanced with toast notifications below
 */
const contactForm = document.getElementById("contact-form");

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================
/**
 * Debounce function to limit rate of function calls
 */
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Example:  Debounced scroll handler for better performance
// window.addEventListener('scroll', debounce(() => {
//     console.log('Scroll event');
// }));

// ===========================
// MODERN UI/UX FEATURES
// ===========================

// ===========================
// 1. NAVBAR SCROLL EFFECT
// ===========================
/**
 * Add background color and shadow to navbar when user scrolls down
 * Activates after scrolling 100px with smooth transitions
 */
const navbar = document.querySelector('nav');

if (navbar) {
    const handleNavbarScroll = () => {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    };

    // Use debounced scroll for better performance
    window.addEventListener('scroll', debounce(handleNavbarScroll, 10));
    
    // Initial check
    handleNavbarScroll();
} else {
    console.warn("Navbar element not found for scroll effect");
}

// ===========================
// 2. SCROLL PROGRESS BAR
// ===========================
/**
 * Shows reading/scroll progress as a gradient bar at the top
 * Updates smoothly as user scrolls
 */
const createScrollProgressBar = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-label', 'Page scroll progress');
    document.body.prepend(progressBar);
    return progressBar;
};

const scrollProgressBar = createScrollProgressBar();

if (scrollProgressBar) {
    const updateScrollProgress = () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgressBar.style.width = `${scrolled}%`;
        scrollProgressBar.setAttribute('aria-valuenow', Math.round(scrolled));
    };

    window.addEventListener('scroll', debounce(updateScrollProgress, 10));
    
    // Initial update
    updateScrollProgress();
}

// ===========================
// 3. TOAST NOTIFICATION SYSTEM
// ===========================
/**
 * Creates a reusable toast notification
 * @param {string} message - The message to display
 * @param {string} type - Type of toast: 'success', 'error', or 'info'
 * @param {number} duration - Auto-dismiss duration in milliseconds (default: 3000)
 */
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    
    const icon = {
        success: '<i class="ri-check-line"></i>',
        error: '<i class="ri-close-line"></i>',
        info: '<i class="ri-information-line"></i>'
    };
    
    toast.innerHTML = `
        ${icon[type] || icon.info}
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Auto dismiss
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Update contact form to use toast notifications
if (contactForm) {
    // Remove old success function and update form handler
    const originalSubmitHandler = contactForm.onsubmit;
    
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('[name="name"]');
        const email = contactForm.querySelector('[name="email"]');
        const message = contactForm.querySelector('[name="message"]');
        
        let isValid = true;
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Validate name
        if (name && name.value.trim() === "") {
            showError(name, "Please enter your name");
            isValid = false;
        }
        
        // Validate email
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === "") {
                showError(email, "Please enter your email");
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                showError(email, "Please enter a valid email");
                isValid = false;
            }
        }
        
        // Validate message
        if (message && message.value.trim() === "") {
            showError(message, "Please enter a message");
            isValid = false;
        }
        
        if (isValid) {
            // Use toast notification instead of inline message
            showToast("Message sent successfully!", "success");
            contactForm.reset();
        } else {
            showToast("Please fix the errors in the form", "error");
        }
    });
}

// ===========================
// 4. PARALLAX SCROLLING EFFECT
// ===========================
/**
 * Adds parallax effect to elements with class .parallax
 * Supports custom speed via data-speed attribute
 */
const parallaxElements = document.querySelectorAll('.parallax');

if (parallaxElements.length > 0) {
    const handleParallax = () => {
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
            const yPos = -(window.scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    };

    window.addEventListener('scroll', debounce(() => {
        requestAnimationFrame(handleParallax);
    }, 10));
} else {
    console.warn("No parallax elements found with class .parallax");
}

// ===========================
// 5. LAZY LOADING WITH SKELETON SCREENS
// ===========================
/**
 * Implements intersection observer for images with lazy loading
 * Images should have data-src attribute for lazy loading
 */
const lazyImages = document.querySelectorAll('img[data-src]');

if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.add('lazy-loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    lazyImages.forEach(img => {
        img.classList.add('lazy-loading');
        imageObserver.observe(img);
    });
} else if (lazyImages.length === 0) {
    console.warn("No lazy loading images found with data-src attribute");
}

// ===========================
// 6. COUNT-UP ANIMATION FOR STATISTICS
// ===========================
/**
 * Animates numbers counting up when they come into view
 * Elements should have class .stat-number and data-target attribute
 */
const statNumbers = document.querySelectorAll('.stat-number');

if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    const animateCount = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target;
            }
        };
        
        updateCount();
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-target')) || 0;
                animateCount(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    }, {
        threshold: 0.5
    });

    statNumbers.forEach(stat => statsObserver.observe(stat));
} else if (statNumbers.length === 0) {
    console.warn("No stat numbers found with class .stat-number");
}

// ===========================
// 7. INTERACTIVE CUSTOM CURSOR (Desktop Only)
// ===========================
/**
 * Creates custom cursor with follower element
 * Only active on desktop devices
 */
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (!isMobile && window.innerWidth > 768) {
    const createCustomCursor = () => {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        
        const follower = document.createElement('div');
        follower.className = 'cursor-follower';
        
        document.body.appendChild(cursor);
        document.body.appendChild(follower);
        
        return { cursor, follower };
    };
    
    const { cursor, follower } = createCustomCursor();
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower movement
    const animateFollower = () => {
        const delay = 0.1;
        followerX += (mouseX - followerX) * delay;
        followerY += (mouseY - followerY) * delay;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    };
    
    animateFollower();
    
    // Change cursor on hover over links/buttons
    const interactiveElements = document.querySelectorAll('a, button, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            follower.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            follower.classList.remove('cursor-hover');
        });
    });
}

// ===========================
// 8. IMAGE ZOOM ON HOVER
// ===========================
/**
 * Add zoom effect to images with class .zoomable
 * CSS handles the actual zoom transition
 */
const zoomableImages = document.querySelectorAll('.zoomable');
if (zoomableImages.length === 0) {
    console.warn("No zoomable images found with class .zoomable");
}

// ===========================
// 9. SEARCH/FILTER FUNCTIONALITY
// ===========================
/**
 * Search filter for elements with class .searchable-item
 * Debounced input with case-insensitive search
 */
const searchInput = document.getElementById('search-input');
const searchableItems = document.querySelectorAll('.searchable-item');

if (searchInput && searchableItems.length > 0) {
    const performSearch = debounce((searchTerm) => {
        const term = searchTerm.toLowerCase();
        
        searchableItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            const matches = text.includes(term);
            
            if (matches) {
                item.style.display = '';
                item.classList.add('search-fade-in');
                item.classList.remove('search-fade-out');
            } else {
                item.classList.add('search-fade-out');
                item.classList.remove('search-fade-in');
                setTimeout(() => {
                    if (item.classList.contains('search-fade-out')) {
                        item.style.display = 'none';
                    }
                }, 300);
            }
        });
    }, 300);
    
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });
} else if (searchInput && searchableItems.length === 0) {
    console.warn("Search input found but no searchable items with class .searchable-item");
} else if (!searchInput && searchableItems.length > 0) {
    console.warn("Searchable items found but no search input with id 'search-input'");
}

// ===========================
// 10. TYPING ANIMATION
// ===========================
/**
 * Adds typewriter effect for hero title
 * Speed: 80ms per character
 */
const typewriterElement = document.querySelector('.header__content h1');

if (typewriterElement) {
    const originalText = typewriterElement.textContent;
    typewriterElement.textContent = '';
    typewriterElement.style.opacity = '1';
    
    let charIndex = 0;
    const typeSpeed = 80;
    
    const typeWriter = () => {
        if (charIndex < originalText.length) {
            typewriterElement.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                typewriterElement.classList.add('typing-complete');
            }, 1000);
        }
    };
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
} else {
    console.warn("Typewriter element (.header__content h1) not found");
}

console.log("✅ Main.js loaded successfully!");
