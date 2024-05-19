// Function to create a continuous starfall animation
function createStarfallAnimation() {
  const numStars = 200; // Adjust the number of stars
  const maxDuration = 13; // Max duration for falling animation

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const randomX = Math.random() * window.innerWidth;
    const randomDelay = Math.random() * maxDuration;
    const randomDuration = Math.random() * maxDuration;

    star.style.left = `${randomX}px`;
    star.style.animationDuration = `${randomDuration}s`;
    star.style.animationDelay = `${randomDelay}s`;

    document.body.appendChild(star);
  }
}

// Initialize starfall animation when the page loads
window.addEventListener("load", function () {
  createStarfallAnimation();
});

// Function to create and animate a comet
function createComet() {
  const comet = document.createElement("div");
  comet.classList.add("comet");

  // Random starting position at the bottom of the viewport
  const startX = Math.random() * window.innerWidth;
  comet.style.left = `${startX}px`;
  comet.style.bottom = "0";

  document.body.appendChild(comet);

  // Remove the comet after the animation completes
  comet.addEventListener("animationend", () => {
    comet.remove();
  });
}

// Function to create comets at random intervals
function generateComets() {
  // Create a comet immediately
  createComet();

  // Then create comets at random intervals
  setInterval(() => {
    createComet();
  }, Math.random() * 5000 + 3000); // Random interval between 3 and 8 seconds
}

// Initialize comet generation when the page loads
window.addEventListener("load", function () {
  generateComets();
});
