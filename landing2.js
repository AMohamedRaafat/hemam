// Drawer Menu Functionality
const menuToggle = document.getElementById("menu-toggle");
const drawerMenu = document.getElementById("drawer-menu");
const drawerOverlay = document.getElementById("drawer-overlay");
const closeMenu = document.getElementById("close-menu");

// Check if elements exist before adding event listeners
if (menuToggle && drawerMenu && drawerOverlay && closeMenu) {
  // Open drawer menu
  menuToggle.addEventListener("click", () => {
    drawerMenu.classList.add("active");
    drawerOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // Close drawer menu
  function closeDrawerMenu() {
    drawerMenu.classList.remove("active");
    drawerOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  closeMenu.addEventListener("click", closeDrawerMenu);
  drawerOverlay.addEventListener("click", closeDrawerMenu);

  // Close drawer when clicking on a link
  const drawerLinks = drawerMenu.querySelectorAll("a");
  drawerLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeDrawerMenu();
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !navbar.classList.contains("scroll-down")) {
    navbar.classList.remove("scroll-up");
    navbar.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    navbar.classList.contains("scroll-down")
  ) {
    navbar.classList.remove("scroll-down");
    navbar.classList.add("scroll-up");
  }
  lastScroll = currentScroll;
});

// Active link highlighting
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a, .drawer-menu a");

function highlightActiveLink() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", highlightActiveLink);

// FAQ Toggle Functionality
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  if (question) {
    question.addEventListener("click", () => {
      // Close other FAQ items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current FAQ item
      item.classList.toggle("active");
    });
  }
});

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".feature-card, .step-card, .testimonial-card, .faq-item"
  );
  animateElements.forEach((el) => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });
});

// Testimonial Navigation (if needed)
const testimonialPrev = document.querySelector(".nav-arrow-prev");
const testimonialNext = document.querySelector(".nav-arrow-next");

if (testimonialPrev && testimonialNext) {
  // This can be extended to implement testimonial carousel functionality
  testimonialPrev.addEventListener("click", () => {
    console.log("Previous testimonial");
    // Add carousel logic here if needed
  });

  testimonialNext.addEventListener("click", () => {
    console.log("Next testimonial");
    // Add carousel logic here if needed
  });
}

