// Ensure DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function () {
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav a, .cta-button');
    if (navLinks.length === 0) {
        console.warn('No navigation links or CTA buttons found.');
    }
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            } else {
                console.warn(`Target element with ID ${targetId} not found.`);
            }
            // Close mobile menu if open
            const nav = document.querySelector('.nav');
            if (nav) {
                nav.classList.remove('active');
            }
        });
    });

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            const nav = document.querySelector('.nav');
            if (nav) {
                nav.classList.toggle('active');
            } else {
                console.warn('Navigation element not found.');
            }
        });
    } else {
        console.warn('Hamburger menu element not found.');
    }

    // Contact Form Validation and Popup
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log('Form submitted'); // Debug log

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const popup = document.getElementById('popup');
            const popupMessage = document.getElementById('popup-message');

            if (!popup || !popupMessage) {
                console.error('Popup or popup-message element not found.');
                return;
            }

            if (name === '' || email === '' || message === '') {
                popupMessage.textContent = 'Please fill in all fields.';
                popup.style.display = 'flex';
                console.log('Showing popup: Empty fields');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                popupMessage.textContent = 'Please enter a valid email address.';
                popup.style.display = 'flex';
                console.log('Showing popup: Invalid email');
                return;
            }

            popupMessage.textContent = 'Message sent successfully!';
            popup.style.display = 'flex';
            console.log('Showing popup: Success');
            this.reset();
        });
    } else {
        console.error('Contact form element not found.');
    }

    // Close Popup
    const popupClose = document.getElementById('popup-close');
    if (popupClose) {
        popupClose.addEventListener('click', function () {
            const popup = document.getElementById('popup');
            if (popup) {
                popup.style.display = 'none';
                console.log('Popup closed via close button');
            }
        });
    } else {
        console.warn('Popup close button not found.');
    }

    // Close Popup on Outside Click
    const popup = document.getElementById('popup');
    if (popup) {
        popup.addEventListener('click', function (e) {
            if (e.target === this) {
                this.style.display = 'none';
                console.log('Popup closed via outside click');
            }
        });
    } else {
        console.warn('Popup element not found.');
    }
});

// Skeleton Loader Simulation
window.addEventListener('load', function () {
    setTimeout(() => {
        // Hide skeleton loaders
        document.querySelectorAll('.menu-item.skeleton').forEach(item => {
            item.style.display = 'none';
        });
        // Show actual content
        document.querySelectorAll('.menu-item.actual-content').forEach(item => {
            item.style.display = 'block';
        });
    }, 2000); // Simulate 2-second loading delay
});