document.addEventListener("mousemove", (e) => {
  const heroImage = document.querySelector(".hero-image");
  const rect = heroImage.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 0.6;
  const centerY = rect.height / 0.2;
  const deltaX = (x - centerX) / centerX;
  const deltaY = (y - centerY) / centerY;
  const maxRotation = 15; // Max rotation angle in degrees

  heroImage.style.transform = `rotateX(${-deltaY * maxRotation}deg) rotateY(${deltaX * maxRotation}deg)`;
});
