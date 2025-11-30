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

// FAQ Toggle Functionality with Video Integration
const faqItems = document.querySelectorAll(".faq-item");
const desktopVideo = document.getElementById("faq-video");
const videoContainer = document.getElementById("main-video-container");
let currentVideoSrc = null;
let isVideoVisible = true;

// Initialize first FAQ item as active and load its video
if (faqItems.length > 0 && desktopVideo) {
  const firstItem = faqItems[0];
  const firstVideo = firstItem.getAttribute("data-video");
  
  // Set initial active state
  firstItem.classList.add("active");
  currentVideoSrc = firstVideo;
  
  // Load initial video with animation
  if (firstVideo) {
    loadVideo(firstVideo, false); // Don't animate on initial load
  }
}

function animateVideoOut() {
  return new Promise((resolve) => {
    if (!videoContainer) {
      resolve();
      return;
    }
    
    videoContainer.classList.add("video-hiding");
    videoContainer.classList.remove("video-showing", "video-loaded");
    
    setTimeout(() => {
      videoContainer.classList.add("video-hidden");
      videoContainer.classList.remove("video-hiding");
      isVideoVisible = false;
      resolve();
    }, 400); // Match CSS transition duration
  });
}

function animateVideoIn() {
  return new Promise((resolve) => {
    if (!videoContainer) {
      resolve();
      return;
    }
    
    videoContainer.classList.remove("video-hidden", "video-hiding");
    videoContainer.classList.add("video-showing");
    
    // Force reflow to ensure animation starts
    videoContainer.offsetHeight;
    
    setTimeout(() => {
      videoContainer.classList.remove("video-showing");
      videoContainer.classList.add("video-loaded");
      isVideoVisible = true;
      resolve();
    }, 400); // Match CSS transition duration
  });
}

function loadVideo(videoSrc, animate = true) {
  if (!desktopVideo || !videoContainer) return;
  
  const loadProcess = async () => {
    // If same video and visible, just return
    if (currentVideoSrc === videoSrc && isVideoVisible) {
      return;
    }
    
    // If animating, hide current video first
    if (animate && isVideoVisible) {
      await animateVideoOut();
    }
    
    // Add loading animation
    videoContainer.classList.add("video-loading");
    videoContainer.classList.remove("video-loaded");
    
    // Pause current video
    desktopVideo.pause();
    
    // Change video source
    desktopVideo.src = videoSrc;
    currentVideoSrc = videoSrc;
    
    // Load new video
    desktopVideo.load();
    
    // When video is loaded, show it with animation
    desktopVideo.addEventListener("loadeddata", async () => {
      videoContainer.classList.remove("video-loading");
      
      if (animate) {
        await animateVideoIn();
      } else {
        videoContainer.classList.add("video-loaded");
        isVideoVisible = true;
      }
    }, { once: true });
  };
  
  loadProcess();
}

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  if (question) {
    question.addEventListener("click", async () => {
      const isCurrentlyActive = item.classList.contains("active");
      
      // Close all FAQ items
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
      });
      
      // Pause all mobile videos
      const allMobileVideos = document.querySelectorAll(".mobile-video-container video");
      allMobileVideos.forEach(video => {
        video.pause();
      });
      
      if (!isCurrentlyActive) {
        // Open clicked item
        item.classList.add("active");
        
        // Update desktop video
        const videoSrc = item.getAttribute("data-video");
        if (videoSrc && desktopVideo) {
          loadVideo(videoSrc);
        }
        
        // Play mobile video if exists
        const mobileVideo = item.querySelector(".mobile-video-container video");
        if (mobileVideo) {
          mobileVideo.play().catch(e => console.log("Video play failed:", e));
        }
      } else {
        // If clicking the same item, close it and hide video
        if (desktopVideo && isVideoVisible) {
          animateVideoOut();
        }
      }
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

// Testimonials Carousel Functionality with Owl Carousel
$(document).ready(function () {
  if ($("#testimonialsCarousel").length) {
    $("#testimonialsCarousel").owlCarousel({
      loop: true,
      margin: 24,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
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
        },
        768: {
          items: 1,
          center: true,
        },
        1024: {
          items: 1,
          center: true,
        },
      },
      navText: [
        `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_172_20255)">
            <path d="M0.5 8H15.5" stroke="#0D0723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.5 13L15.5 8L10.5 3" stroke="#0D0723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_172_20255">
              <rect width="16" height="16" fill="white" transform="matrix(-1 0 0 1 16 0)" />
            </clipPath>
          </defs>
        </svg>`,
        `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_172_20250)">
            <path d="M15.5 8H0.5" stroke="#0D0723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.5 13L0.5 8L5.5 3" stroke="#0D0723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_172_20250">
              <rect width="16" height="16" fill="white"/>
            </clipPath>
          </defs>
        </svg>`,
      ],
    });
  }
});

