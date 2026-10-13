
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const dropdowns = document.querySelectorAll(".dropdown");
const faqItems = document.querySelectorAll(".faq-item");
const backToTop = document.getElementById("backToTop");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });
}

dropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector(".dropdown-toggle");

  if (!toggle) return;

  toggle.setAttribute("aria-expanded", "false");

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();

    const willOpen = !dropdown.classList.contains("open");

    dropdowns.forEach((item) => {
      item.classList.remove("open");
      const button = item.querySelector(".dropdown-toggle");
      if (button) button.setAttribute("aria-expanded", "false");
    });

    if (willOpen) {
      dropdown.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
    }
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".dropdown")) {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("open");
      const button = dropdown.querySelector(".dropdown-toggle");
      if (button) button.setAttribute("aria-expanded", "false");
    });
  }
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    }

    dropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
  });
});

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  if (!question) return;

  question.addEventListener("click", () => {
    const shouldOpen = !item.classList.contains("active");

    faqItems.forEach((otherItem) => {
      otherItem.classList.remove("active");
      const otherButton = otherItem.querySelector(".faq-question");
      if (otherButton) otherButton.setAttribute("aria-expanded", "false");
    });

    if (shouldOpen) {
      item.classList.add("active");
      question.setAttribute("aria-expanded", "true");
    }
  });
});

function updateBackToTop() {
  if (backToTop) {
    backToTop.classList.toggle("visible", window.scrollY > 450);
  }
}

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
