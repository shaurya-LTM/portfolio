// Only three simple interactions: mobile navigation, reveal effects, and background dots.

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#main-nav');

menuButton.addEventListener('click', () => {
  navigation.classList.toggle('open');
});

document.querySelectorAll('#main-nav a').forEach((link) => {
  link.addEventListener('click', () => navigation.classList.remove('open'));
});

const sectionsToReveal = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

sectionsToReveal.forEach((section) => revealObserver.observe(section));

const canvas = document.querySelector('#particles');
const context = canvas.getContext('2d');
let dots = [];

function createDots() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  dots = [];

  const amount = Math.min(70, Math.floor(window.innerWidth / 18));
  for (let i = 0; i < amount; i++) {
    dots.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.8 + 0.4,
      speedX: (Math.random() - 0.5) * 0.22,
      speedY: (Math.random() - 0.5) * 0.22
    });
  }
}

function drawDots() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  dots.forEach((dot, index) => {
    dot.x += dot.speedX;
    dot.y += dot.speedY;
    if (dot.x < 0 || dot.x > canvas.width) dot.speedX *= -1;
    if (dot.y < 0 || dot.y > canvas.height) dot.speedY *= -1;

    context.fillStyle = '#19d5dc';
    context.beginPath();
    context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
    context.fill();

    // Draw a faint line only when two dots are near each other.
    dots.slice(index + 1).forEach((otherDot) => {
      const distance = Math.hypot(dot.x - otherDot.x, dot.y - otherDot.y);
      if (distance < 115) {
        context.strokeStyle = `rgba(38, 216, 233, ${0.12 - distance / 1100})`;
        context.beginPath();
        context.moveTo(dot.x, dot.y);
        context.lineTo(otherDot.x, otherDot.y);
        context.stroke();
      }
    });
  });

  requestAnimationFrame(drawDots);
}

createDots();
drawDots();
window.addEventListener('resize', createDots);
