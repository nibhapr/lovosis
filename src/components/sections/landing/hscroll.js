document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".wrapper");
  const container = document.querySelector(".container");
  let scrollAmount = 0;
  let containerScrolled = false;
  let isHorizontalScroll = false;

  const handleScroll = (event) => {
    if (wrapper.getBoundingClientRect().top <= 0 && !containerScrolled) {
      if (!isHorizontalScroll) {
        event.preventDefault();
        scrollAmount += event.deltaY * 0.5;
        if (scrollAmount < 0) scrollAmount = 0;
        if (scrollAmount > container.scrollWidth - window.innerWidth) {
          scrollAmount = container.scrollWidth - window.innerWidth;
          containerScrolled = true;
        }
        container.style.transform = `translateX(-${scrollAmount}px)`;
        if (scrollAmount >= container.scrollWidth - window.innerWidth) {
          isHorizontalScroll = true;
          window.removeEventListener("wheel", handleScroll);
          window.addEventListener("wheel", handleVerticalScroll);
        }
      }
    }
  };

  const handleVerticalScroll = (event) => {
    if (isHorizontalScroll) {
      containerScrolled = true;
      window.scrollBy(0, event.deltaY);
    }
  };

  window.addEventListener("wheel", handleScroll);
});
