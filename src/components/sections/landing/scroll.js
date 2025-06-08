document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in-up").forEach((element) => {
    observer.observe(element);
  });

  const section = document.querySelector("section");
  const handleScroll = () => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
      section.classList.add("dark-section");
    } else {
      section.classList.remove("dark-section");
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();
});
