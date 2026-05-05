document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const hamburger = document.querySelector(".hamburger");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();
    hamburger.classList.toggle("active");
    dropdownMenu.classList.toggle("active");
  });

  document.querySelectorAll(".dropdown-items a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      dropdownMenu.classList.remove("active");
    });
  });

  document.addEventListener("click", function (e) {
    if (!hamburgerMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      dropdownMenu.classList.remove("active");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && dropdownMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      dropdownMenu.classList.remove("active");
    }
  });
});

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

document.querySelectorAll(".timeline-item").forEach((item) => {
  observer.observe(item);
});

document
  .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in")
  .forEach((item) => {
    observer.observe(item);
  });

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const teamPhotos = document.querySelectorAll(".team-photo");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filterYear = this.getAttribute("data-year");

      teamPhotos.forEach((photo) => {
        if (filterYear === "all" || photo.getAttribute("data-year") === filterYear) {
          photo.classList.remove("hidden");
          photo.style.display = "";
        } else {
          photo.classList.add("hidden");
          photo.style.display = "none";
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".projects-carousel");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const cardWidth = 336;

  if (prevBtn && nextBtn && carousel) {
    prevBtn.addEventListener("click", function () {
      carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", function () {
      carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
    });
  }
});

function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const duration = 1800;
    const increment = target / (duration / 16);
    let current = 0;

    const update = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    update();
  });
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounters();
      counterObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const impactSection = document.querySelector(".impact-section");
if (impactSection) {
  counterObserver.observe(impactSection);
}

window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".hero-grid");
  if (parallax) {
    parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

function revealOnScroll() {
  const reveals = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right, .scale-in"
  );

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 120) {
      element.classList.add("visible");
    }
  });
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

window.addEventListener("scroll", throttle(revealOnScroll, 100));
revealOnScroll();

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => { loader.style.display = "none"; }, 500);
  }
});
