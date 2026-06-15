const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");
const openingScreen = document.getElementById("openingScreen");
const openInvitationButton = document.getElementById("openInvitationButton");

let isPlaying = false;
let invitationOpened = false;

function setPlayingState() {
  isPlaying = true;
  musicIcon.innerHTML = '<i class="bi bi-pause-fill"></i>';
  musicButton.classList.add("playing");
}

function setPausedState() {
  isPlaying = false;
  musicIcon.innerHTML = '<i class="bi bi-play-fill"></i>';
  musicButton.classList.remove("playing");
}

async function playMusic() {
  try {
    await music.play();
    setPlayingState();
  } catch (error) {
    console.log("El navegador bloqueó la reproducción automática:", error);
  }
}

function openInvitation() {
  if (invitationOpened) return;

  invitationOpened = true;

  openingScreen.classList.add("opening-active");

  playMusic();

  setTimeout(() => {
    openingScreen.classList.add("opening-hide");
    document.body.classList.remove("has-opening");
  }, 900);

  setTimeout(() => {
    openingScreen.remove();
  }, 1900);
}

openInvitationButton.addEventListener("click", openInvitation);
openInvitationButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  openInvitation();
}, { passive: false });

/* Botón Play / Pause */
musicButton.addEventListener("click", async (event) => {
  event.stopPropagation();

  if (!isPlaying) {
    await playMusic();
  } else {
    music.pause();
    setPausedState();
  }
});

/* Contador al 5 de septiembre de 2026, 1:00 p.m. Ciudad de México */
const weddingDate = new Date("2026-09-05T13:00:00-06:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance <= 0) {
    daysEl.textContent = "000";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysEl.textContent = String(days).padStart(3, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
/* ============================= */
/* ANIMACIONES AL HACER SCROLL */
/* ============================= */

const revealSelectors = [
  ".hero-content",
  ".hero-border",
  ".section-kicker",
  ".section h2",
  ".divider",
  ".countdown-card",
  ".soft-text",
  ".family-card",
  ".family-block",
  ".location-icon",
  ".location-city",
  ".location-card",
  ".location-row",
  ".map-box",
  ".btn-location",
  ".timeline-item",
  ".gallery-text",
  ".carousel",
  ".swipe-text",
  ".album-icon",
  ".album-section p",
  ".btn-album",
  ".initials",
  ".initials-section p"
];

const revealElements = document.querySelectorAll(revealSelectors.join(","));

revealElements.forEach((element, index) => {
  element.classList.add("reveal-item");

  const isHeroElement =
    element.classList.contains("hero-content") ||
    element.classList.contains("hero-border");

  if (!isHeroElement) {
    const delayClass = `reveal-delay-${(index % 4) + 1}`;
    element.classList.add(delayClass);
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px"
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* ============================= */
/* ESTRELLAS DECORATIVAS */
/* ============================= */

function createSparkles() {
  const sparklesLayer = document.createElement("div");
  sparklesLayer.classList.add("sparkles-layer");
  document.body.appendChild(sparklesLayer);

  const sparkleColors = [
    "rgba(255, 255, 255, 0.95)",
    "rgba(216, 192, 154, 0.95)",
    "rgba(183, 138, 76, 0.95)"
  ];

  const totalSparkles = 42;

  for (let i = 0; i < totalSparkles; i++) {
    const sparkle = document.createElement("span");

    const size = Math.floor(Math.random() * 10) + 5;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 2.8 + 2.4;
    const floatDuration = Math.random() * 4 + 3;
    const delay = Math.random() * 5;
    const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];

    sparkle.classList.add("sparkle");

    if (Math.random() > 0.65) {
      sparkle.classList.add("round");
    }

    if (Math.random() > 0.5) {
      sparkle.classList.add("soft");
    }

    sparkle.style.setProperty("--sparkle-size", `${size}px`);
    sparkle.style.setProperty("--sparkle-left", `${left}%`);
    sparkle.style.setProperty("--sparkle-top", `${top}%`);
    sparkle.style.setProperty("--sparkle-duration", `${duration}s`);
    sparkle.style.setProperty("--sparkle-float", `${floatDuration}s`);
    sparkle.style.setProperty("--sparkle-delay", `${delay}s`);
    sparkle.style.setProperty("--sparkle-color", color);

    sparklesLayer.appendChild(sparkle);
  }
}

createSparkles();


/* ============================= */
/* PIROTECNIA / FUEGOS ARTIFICIALES */
/* ============================= */

function createFireworksLayer() {
  const fireworksLayer = document.createElement("div");
  fireworksLayer.classList.add("fireworks-layer");
  document.body.appendChild(fireworksLayer);
  return fireworksLayer;
}

const fireworksLayer = createFireworksLayer();

function createFirework() {
  const firework = document.createElement("div");
  firework.classList.add("firework");

  const left = Math.random() * 86 + 7;
  const top = Math.random() * 55 + 8;

  firework.style.setProperty("--firework-left", `${left}%`);
  firework.style.setProperty("--firework-top", `${top}%`);

  const colors = [
    "rgba(255, 255, 255, 0.95)",
    "rgba(216, 192, 154, 0.95)",
    "rgba(183, 138, 76, 0.95)",
    "rgba(245, 226, 190, 0.95)"
  ];

  const particles = Math.floor(Math.random() * 10) + 16;
  const distanceBase = Math.floor(Math.random() * 34) + 38;

  for (let i = 0; i < particles; i++) {
    const particle = document.createElement("span");

    const angle = (360 / particles) * i;
    const distance = distanceBase + Math.random() * 28;
    const size = Math.random() * 5 + 3;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const delay = Math.random() * 0.08;

    particle.classList.add("firework-particle");

    if (Math.random() > 0.65) {
      particle.classList.add("star");
    }

    particle.style.setProperty("--particle-angle", `${angle}deg`);
    particle.style.setProperty("--particle-distance", `${distance}px`);
    particle.style.setProperty("--particle-size", `${size}px`);
    particle.style.setProperty("--particle-color", color);
    particle.style.setProperty("--particle-delay", `${delay}s`);

    firework.appendChild(particle);
  }

  fireworksLayer.appendChild(firework);

  setTimeout(() => {
    firework.remove();
  }, 1600);
}

function startFireworks() {
  createFirework();

  setInterval(() => {
    createFirework();
  }, 1800);
}

startFireworks();

/* ============================= */
/* CARRUSEL: SWIPE + TRACKPAD */
/* ============================= */

function initBetterCarousel() {
  const carouselElement = document.getElementById("weddingCarousel");

  if (!carouselElement || typeof bootstrap === "undefined") return;

  const carousel = bootstrap.Carousel.getOrCreateInstance(carouselElement, {
    interval: false,
    touch: true,
    wrap: true
  });

  let startX = 0;
  let startY = 0;
  let isDragging = false;
  let lastWheelTime = 0;

  carouselElement.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
    startY = event.clientY;
    isDragging = true;
  });

  carouselElement.addEventListener("pointerup", (event) => {
    if (!isDragging) return;

    const diffX = event.clientX - startX;
    const diffY = event.clientY - startY;

    isDragging = false;

    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        carousel.next();
      } else {
        carousel.prev();
      }
    }
  });

  carouselElement.addEventListener("pointercancel", () => {
    isDragging = false;
  });

  /* Trackpad horizontal */
  carouselElement.addEventListener("wheel", (event) => {
    const now = Date.now();

    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    if (Math.abs(event.deltaX) < 20) return;
    if (now - lastWheelTime < 650) return;

    event.preventDefault();

    if (event.deltaX > 0) {
      carousel.next();
    } else {
      carousel.prev();
    }

    lastWheelTime = now;
  }, { passive: false });
}

initBetterCarousel();