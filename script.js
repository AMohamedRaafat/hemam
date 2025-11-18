// Drawer Menu Functionality
const menuToggle = document.getElementById('menu-toggle');
const drawerMenu = document.getElementById('drawer-menu');
const drawerOverlay = document.getElementById('drawer-overlay');
const closeMenu = document.getElementById('close-menu');

// Check if elements exist before adding event listeners
if (menuToggle && drawerMenu && drawerOverlay && closeMenu) {
    // Open drawer menu
    menuToggle.addEventListener('click', () => {
        drawerMenu.classList.add('active');
        drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close drawer menu
    function closeDrawerMenu() {
        drawerMenu.classList.remove('active');
        drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeMenu.addEventListener('click', closeDrawerMenu);
    drawerOverlay.addEventListener('click', closeDrawerMenu);

    // Close drawer when clicking on a link
    const drawerLinks = drawerMenu.querySelectorAll('a');
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeDrawerMenu();
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .drawer-menu a');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Animation on scroll - Enhanced for all elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation - All sections and elements
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.why-card, .service-item, .step, .partner-logo, .why-section, .services-section, .how-section, .partners-section, .franchise-section, .download-section, .footer, .hero-section, .section-title, .why-header, .why-image-container, .download-content, .download-left, .download-visual, .franchise-content, .franchise-text, .franchise-image-wrapper, .contact-item, .footer-top, .social-icons'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        closeDrawerMenu();
    }
});

// Partners Carousel Functionality with Owl Carousel
$(document).ready(function () {
    if ($('#partnersCarousel').length) {
        $('#partnersCarousel').owlCarousel({
            loop: true,
            margin: 24,
            nav: true,
            dots: false,
            autoplay: false,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            freeDrag: false,
            stagePadding: 0,
            rtl: true, // RTL support for Arabic
            responsive: {
                0: {
                    items: 1,
                    center: true,
                    stagePadding: 100
                },
                768: {
                    items: 3,
                    center: false,
                    stagePadding: 0
                },
                1024: {
                    items: 5,
                    center: true,
                    stagePadding: 100
                }
            },
            navText: [
                `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g g clip - path="url(#clip0_172_20255)" >
<path d="M0.5 8H15.5" stroke="#0D0723" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 13L15.5 8L10.5 3" stroke="#0D0723" stroke-linecap="round" stroke-linejoin="round"/>
</g >
                <defs>
                    <clipPath id="clip0_172_20255">
                        <rect width="16" height="16" fill="white" transform="matrix(-1 0 0 1 16 0)" />
                    </clipPath>
                </defs>
</svg >
                `,
                `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_172_20250)">
<path d="M15.5 8H0.5" stroke="#0D0723" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.5 13L0.5 8L5.5 3" stroke="#0D0723" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_172_20250">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

`]
        });
    }



    // Registration Modal Functionality
    const signupBtn = $("#signup-btn");
    const registrationOverlay = $("#registration-overlay");
    const registrationModal = $("#registration-modal");
    const closeRegistration = $("#close-registration");
    const registrationForm = $("#registration-form");
    const phoneInput = $("#phone-number");
    const phoneError = $("#phone-error");
    const citySelect = $("#city");
    const cityError = $("#city-error");

    const successOverlay = $("#success-overlay");
    const successModal = $("#success-modal");
    const closeSuccess = $("#close-success");

    // Open registration modal
    signupBtn.on("click", function () {
        registrationOverlay.addClass("active");
        $("body").css("overflow", "hidden");
    });

    // Close registration modal
    closeRegistration.on("click", function () {
        registrationOverlay.removeClass("active");
        $("body").css("overflow", "auto");
        registrationForm[0].reset();
        phoneError.text("");
        cityError.text("");
    });

    // Close registration modal when clicking overlay
    registrationOverlay.on("click", function (e) {
        if ($(e.target).is(registrationOverlay)) {
            registrationOverlay.removeClass("active");
            $("body").css("overflow", "auto");
            registrationForm[0].reset();
            phoneError.text("");
            cityError.text("");
        }
    });

    // Close success modal
    closeSuccess.on("click", function () {
        successOverlay.removeClass("active");
        $("body").css("overflow", "auto");
    });

    // Close success modal when clicking overlay
    successOverlay.on("click", function (e) {
        if ($(e.target).is(successOverlay)) {
            successOverlay.removeClass("active");
            $("body").css("overflow", "auto");
        }
    });

    // Phone number validation - only allow numbers, no formatting, with real-time validation
    phoneInput.on("input", function () {
        let value = $(this).val();
        // Remove any non-digit characters
        value = value.replace(/\D/g, "");

        // Limit to 9 digits
        if (value.length > 9) {
            value = value.substring(0, 9);
        }
        // Set value without any formatting/spaces - plain text
        $(this).val(value);

        // Real-time validation
        if (value.length === 0) {
            phoneError.text("");
        } else if (value.length > 0 && value[0] !== "5") {
            phoneError.text("رقم الهاتف السعودي يجب أن يبدأ بـ 5");
        } else if (value.length > 0 && value.length < 9) {
            phoneError.text("رقم الهاتف يجب أن يكون 9 أرقام");
        } else if (value.length === 9 && value[0] === "5") {
            phoneError.text("");
        }
    });

    // Phone number validation on blur (additional check)
    phoneInput.on("blur", function () {
        let value = $(this).val().replace(/\s/g, "");
        if (value.length > 0 && value[0] !== "5") {
            phoneError.text("رقم الهاتف السعودي يجب أن يبدأ بـ 5");
        } else if (value.length > 0 && value.length < 9) {
            phoneError.text("رقم الهاتف يجب أن يكون 9 أرقام");
        } else if (value.length === 9 && value[0] === "5") {
            phoneError.text("");
        } else if (value.length === 9 && value[0] !== "5") {
            phoneError.text("رقم الهاتف السعودي يجب أن يبدأ بـ 5");
        }
    });

    // Form submission
    registrationForm.on("submit", function (e) {
        e.preventDefault();

        let isValid = true;
        let phoneValue = phoneInput.val().replace(/\s/g, "");
        let cityValue = citySelect.val();

        // Validate phone number
        if (phoneValue.length === 0) {
            phoneError.text("يرجى إدخال رقم الهاتف");
            isValid = false;
        } else if (phoneValue[0] !== "5") {
            phoneError.text("رقم الهاتف السعودي يجب أن يبدأ بـ 5");
            isValid = false;
        } else if (phoneValue.length < 9) {
            phoneError.text("رقم الهاتف يجب أن يكون 9 أرقام");
            isValid = false;
        } else if (phoneValue.length === 9 && phoneValue[0] === "5") {
            phoneError.text("");
        } else {
            phoneError.text("رقم الهاتف السعودي يجب أن يبدأ بـ 5");
            isValid = false;
        }

        // City is optional, no validation needed

        if (isValid) {
            // Close registration modal
            registrationOverlay.removeClass("active");

            // Small delay for smooth transition
            setTimeout(function () {
                // Open success modal
                successOverlay.addClass("active");
            }, 300);
        }
    });
});

