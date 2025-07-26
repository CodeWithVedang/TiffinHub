// Ensure DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function () {
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav a, .header .cta-button, .hero-content .cta-button');
    if (navLinks.length === 0) {
        console.warn('No navigation links or CTA buttons found.');
    }
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') {
                console.warn(`Invalid or empty href on element:`, this);
                return;
            }
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
            } else {
                console.warn('Navigation element not found.');
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
                console.log('Hamburger menu toggled');
            } else {
                console.warn('Navigation element not found.');
            }
        });
    } else {
        console.warn('Hamburger menu element not found.');
    }

    // Order Popup and Form Handling
    const orderButtons = document.querySelectorAll('.order-button');
    const orderPopup = document.getElementById('order-popup');
    const orderForm = document.getElementById('order-form');
    const orderItemInput = document.getElementById('order-item');
    const orderQuantityInput = document.getElementById('order-quantity');
    const orderAddressInput = document.getElementById('order-address');
    const orderPopupMessage = document.getElementById('order-popup-message');

    if (orderButtons.length > 0 && orderPopup && orderForm) {
        orderButtons.forEach(button => {
            button.addEventListener('click', function () {
                const itemName = this.getAttribute('data-item');
                orderItemInput.value = itemName;
                orderPopupMessage.textContent = '';
                orderQuantityInput.value = '';
                orderAddressInput.value = '';
                orderPopup.style.display = 'flex';
                console.log(`Order popup opened for ${itemName}`);
            });
        });

        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log('Order form submission triggered');

            const quantity = parseInt(orderQuantityInput.value);
            const address = orderAddressInput.value.trim();

            if (!quantity || quantity < 1) {
                orderPopupMessage.textContent = 'Please enter a valid quantity (1 or more).';
                console.log('Showing order popup: Invalid quantity');
                return;
            }

            if (!address) {
                orderPopupMessage.textContent = 'Please enter a delivery address.';
                console.log('Showing order popup: Empty address');
                return;
            }

            orderPopupMessage.textContent = `Order placed successfully for ${quantity} x ${orderItemInput.value}!`;
            console.log('Showing order popup: Success');
            orderForm.reset();
            orderItemInput.value = ''; // Clear read-only field
        });
    } else {
        console.error('Order buttons, popup, or form not found.');
    }

    // Close Order Popup
    const orderPopupClose = document.getElementById('order-popup-close');
    if (orderPopupClose) {
        orderPopupClose.addEventListener('click', function () {
            if (orderPopup) {
                orderPopup.style.display = 'none';
                console.log('Order popup closed via close button');
            }
        });
    } else {
        console.warn('Order popup close button not found.');
    }

    // Close Order Popup on Outside Click
    if (orderPopup) {
        orderPopup.addEventListener('click', function (e) {
            if (e.target === this) {
                this.style.display = 'none';
                console.log('Order popup closed via outside click');
            }
        });
    }

    // Contact Form Validation and Popup
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log('Contact form submission triggered');

            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();
            const popup = document.getElementById('popup');
            const popupMessage = document.getElementById('popup-message');

            if (!popup || !popupMessage) {
                console.error('Contact popup or popup-message element not found.');
                alert('Error: Contact popup element not found. Please check the HTML structure.');
                return;
            }

            if (!name || !email || !message) {
                popupMessage.textContent = 'Please fill in all fields.';
                popup.style.display = 'flex';
                console.log('Showing contact popup: Empty fields');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                popupMessage.textContent = 'Please enter a valid email address.';
                popup.style.display = 'flex';
                console.log('Showing contact popup: Invalid email');
                return;
            }

            popupMessage.textContent = 'Message sent successfully!';
            popup.style.display = 'flex';
            console.log('Showing contact popup: Success');
            this.reset();
        });
    } else {
        console.error('Contact form element not found.');
        alert('Error: Contact form not found. Please check the HTML structure.');
    }

    // Close Contact Popup
    const popupClose = document.getElementById('popup-close');
    if (popupClose) {
        popupClose.addEventListener('click', function () {
            const popup = document.getElementById('popup');
            if (popup) {
                popup.style.display = 'none';
                console.log('Contact popup closed via close button');
            }
        });
    } else {
        console.warn('Contact popup close button not found.');
    }

    // Close Contact Popup on Outside Click
    const popup = document.getElementById('popup');
    if (popup) {
        popup.addEventListener('click', function (e) {
            if (e.target === this) {
                this.style.display = 'none';
                console.log('Contact popup closed via outside click');
            }
        });
    } else {
        console.warn('Contact popup element not found.');
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