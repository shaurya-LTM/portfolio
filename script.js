const cursor = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (isIntersecting) { target.classList.add('visible'); observer.unobserve(target); }
  });
}, { threshold: 0.15 });
reveals.forEach((item) => observer.observe(item));

const tabs = document.querySelectorAll('[data-role]');
const student = document.querySelector('.student-content');
const parent = document.querySelector('.parent-content');
const greeting = document.querySelector('#greeting');
tabs.forEach((tab) => tab.addEventListener('click', () => {
  const isStudent = tab.dataset.role === 'student';
  tabs.forEach((button) => button.classList.toggle('active', button === tab));
  student.classList.toggle('active', isStudent);
  parent.classList.toggle('active', !isStudent);
  greeting.textContent = isStudent ? 'Good evening, Shaurya' : 'Parent overview';
}));
