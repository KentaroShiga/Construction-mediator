document.documentElement.classList.add("js-enhanced");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const progressBar = document.querySelector(".scroll-progress__bar");
const revealTargets = document.querySelectorAll(
  ".section-heading, .hero__body, .hero-panel, .stat-card, .card, .stack-link, .news-item, .timeline-item, .qa-item, .contact-card, .profile-figure, .profile-identity, .profile-quote, .roadmap-card, .comparison-card, .cta-band"
);

function updateScrollProgress() {
  if (!progressBar) {
    return;
  }

  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
  progressBar.style.transform = `scaleX(${progress})`;
}

if (progressBar) {
  let ticking = false;

  const handleScroll = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(() => {
      updateScrollProgress();
      ticking = false;
    });
  };

  updateScrollProgress();
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll);
}

if (!reducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12,
    }
  );

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal-target");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 60}ms`);
    observer.observe(element);
  });
} else {
  revealTargets.forEach((element) => {
    element.classList.add("is-visible");
  });
}
