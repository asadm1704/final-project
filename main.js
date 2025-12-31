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
 * Validate contact form before submission
 */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('[name="name"]');
        const email = contactForm. querySelector('[name="email"]');
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
            // Form is valid, you can submit it
            console.log("Form is valid, submitting...");
            // contactForm.submit(); // Uncomment to actually submit
            showSuccess("Message sent successfully!");
        }
    });
}

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
    input. parentElement.appendChild(errorDiv);
    input.classList.add('error');
}

/**
 * Display success message
 */
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv. style.color = 'green';
    successDiv.style.padding = '1rem';
    successDiv.style.marginTop = '1rem';
    successDiv.style.borderRadius = '0.5rem';
    successDiv.style.backgroundColor = '#d4edda';
    successDiv.textContent = message;
    contactForm.appendChild(successDiv);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successDiv.remove();
        contactForm.reset();
    }, 3000);
}

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

console.log("✅ Main.js loaded successfully!");
