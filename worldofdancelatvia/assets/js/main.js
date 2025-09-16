/* ---- swiper ---- */

const swiper = new Swiper(".slider-wrapper", {
  loop: true,
  grabCursor: true,
  spaceBetween: 50,
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: 2,
  speed: 600,
  coverflowEffect: {
    rotate: -10,
    stretch: 20,
    depth: 100,
    modifier: 1,
    slideShadow: true,
  },
  on: {
    click(event) {
      swiper.slideTo(this.clickedIndex);
    },
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  // Responsive breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});



// Находим все ссылки внутри оффканваса
document.querySelectorAll(".offcanvas .nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    // Находим элемент offcanvas
    let offcanvasElement = document.getElementById("offcanvasNavbar");
    // Получаем экземпляр Bootstrap Offcanvas
    let bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
    // Закрываем Offcanvas
    bsOffcanvas.hide();
  });
});

 // Mobile Menu Toggle
      const navbarToggle = document.getElementById('navbar-toggle');
      const mobileMenu = document.getElementById('mobile-menu');
      const navbar = document.getElementById('navbar');
      
      navbarToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
      });
      
      // Close mobile menu when clicking on links
      document.querySelectorAll('.mobile-menu-links a').forEach(link => {
        link.addEventListener('click', () => {
          navbarToggle.classList.remove('active');
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
      
      // Navbar scroll effect
      let lastScrollY = window.scrollY;
      
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
        lastScrollY = window.scrollY;
      }, { passive: true });
      
      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
              navbarToggle.classList.remove('active');
              mobileMenu.classList.remove('active');
              document.body.style.overflow = '';
            }
          }
        });
      });
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !navbarToggle.contains(e.target)) {
          navbarToggle.classList.remove('active');
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
      
      // Handle window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 992) {
          // Close mobile menu on desktop
          navbarToggle.classList.remove('active');
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
      
      // Prevent scroll when mobile menu is open
      mobileMenu.addEventListener('touchmove', (e) => {
        e.preventDefault();
      }, { passive: false });
      
      // Enhanced touch interactions for mobile
      if ('ontouchstart' in window) {
        // Add touch feedback for interactive elements
        const touchElements = document.querySelectorAll('.navbar-icon, .hero-social-icon, .hero-btn, .mobile-menu-icon');
        
        touchElements.forEach(element => {
          element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
          }, { passive: true });
          
          element.addEventListener('touchend', function() {
            setTimeout(() => {
              this.style.transform = '';
            }, 150);
          }, { passive: true });
        });
      }
      
      // Performance optimization for animations
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--transition', 'none');
      }
      
      // Lazy load optimization for better performance
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);
      
      // Initialize intersection observer for fade-in animations
      document.addEventListener('DOMContentLoaded', () => {
        const animatedElements = document.querySelectorAll('.hero-content > *');
        animatedElements.forEach((el, index) => {
          if (index > 0) { // Skip first element as it has CSS animation
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.observe(el);
          }
        });
      });
      
      // Keyboard navigation support
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
          navbarToggle.classList.remove('active');
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
      
      // Focus management for accessibility
      navbarToggle.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
          // Focus first menu item when menu opens
          const firstMenuItem = mobileMenu.querySelector('.mobile-menu-links a');
          if (firstMenuItem) {
            setTimeout(() => firstMenuItem.focus(), 100);
          }
        }
      });
      
      // Trap focus within mobile menu when open
      const focusableElements = 'a, button, [tabindex]:not([tabindex="-1"])';
      
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && mobileMenu.classList.contains('active')) {
          const focusableContent = mobileMenu.querySelectorAll(focusableElements);
          const firstFocusable = focusableContent[0];
          const lastFocusable = focusableContent[focusableContent.length - 1];
          
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              e.preventDefault();
            }
          }
        }
      });
      
      // Update navbar height CSS variable dynamically
      function updateNavbarHeight() {
        const navbarHeight = navbar.offsetHeight;
        document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
      }
      
      // Update on load and resize
      updateNavbarHeight();
      window.addEventListener('resize', updateNavbarHeight);
      
      // Safari iOS viewport height fix
      function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
      
      setViewportHeight();
      window.addEventListener('resize', setViewportHeight);
      window.addEventListener('orientationchange', setViewportHeight);
      
      // Progressive Web App support
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          // Service worker registration would go here
          console.log('PWA support available');
        });
      }