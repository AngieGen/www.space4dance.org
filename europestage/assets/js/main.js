// Mobile Menu Toggle
const navbarToggle = document.getElementById("navbar-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const navbar = document.getElementById("navbar");

navbarToggle.addEventListener("click", function () {
  this.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "";
});

// Mobile dropdown functionality
const mobileDropdown = document.querySelector(".mobile-dropdown");
const mobileDropdownToggle = document.querySelector(".mobile-dropdown-toggle");

if (mobileDropdownToggle) {
  mobileDropdownToggle.addEventListener("click", (e) => {
    if (window.innerWidth <= 991) {
      e.preventDefault();
      mobileDropdown.classList.toggle("active");
    }
  });
}

// Close mobile menu when clicking on regular links
document
  .querySelectorAll(".mobile-menu-links a:not(.mobile-dropdown-toggle)")
  .forEach((link) => {
    link.addEventListener("click", () => {
      navbarToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
      mobileDropdown.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

// Close mobile menu when clicking dropdown items
document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", () => {
    navbarToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    mobileDropdown.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Navbar scroll effect
let lastScrollY = window.scrollY;

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    lastScrollY = window.scrollY;
  },
  { passive: true }
);

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    mobileMenu.classList.contains("active") &&
    !mobileMenu.contains(e.target) &&
    !navbarToggle.contains(e.target)
  ) {
    navbarToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    mobileDropdown.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth >= 992) {
    navbarToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    mobileDropdown.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
    navbarToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    mobileDropdown.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// Countdown Timer Function
function updateCountdown(targetDate, prefix) {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const timeLeft = target - now;

  if (timeLeft > 0) {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById(`${prefix}-days`).textContent = String(
      days
    ).padStart(2, "0");
    document.getElementById(`${prefix}-hours`).textContent = String(
      hours
    ).padStart(2, "0");
    document.getElementById(`${prefix}-minutes`).textContent = String(
      minutes
    ).padStart(2, "0");
    document.getElementById(`${prefix}-seconds`).textContent = String(
      seconds
    ).padStart(2, "0");
  } else {
    document.getElementById(`${prefix}-days`).textContent = "00";
    document.getElementById(`${prefix}-hours`).textContent = "00";
    document.getElementById(`${prefix}-minutes`).textContent = "00";
    document.getElementById(`${prefix}-seconds`).textContent = "00";
  }
}

// Set countdown target dates (adjust these dates as needed)
const rigaDeadline = "2026-02-01T23:59:59";
const turkeyDeadline = "2026-03-01T23:59:59";

// Update countdowns every second
setInterval(() => {
  updateCountdown(rigaDeadline, "riga");
  updateCountdown(turkeyDeadline, "turkey");
}, 1000);

// Initialize countdowns immediately
updateCountdown(rigaDeadline, "riga");
updateCountdown(turkeyDeadline, "turkey");

// Simulate dynamic spots update (you would replace this with real data)
function updateSpots() {
  // Simulate random spot decreases (replace with actual API calls)
  const rigaSpots = document.getElementById("riga-spots");
  const turkeySpots = document.getElementById("turkey-spots");

  // You can update these values from your backend/API
  // rigaSpots.textContent = newRigaSpotCount;
  // turkeySpots.textContent = newTurkeySpotCount;
}

// Auto-play videos when they come into view (optional)
const videos = document.querySelectorAll(".event-video");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    });
  },
  {
    threshold: 0.5,
  }
);

videos.forEach((video) => {
  observer.observe(video);
});

// Handle video fallback if video fails to load
videos.forEach((video) => {
  video.addEventListener("error", function () {
    // Show fallback image if video fails
    const img = this.nextElementSibling;
    if (img && img.tagName === "IMG") {
      img.style.display = "block";
      this.style.display = "none";
    }
  });
});
