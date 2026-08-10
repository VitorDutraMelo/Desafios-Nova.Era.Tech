const body = document.body;
const themeButton = document.querySelector('.theme-button');
const themeIcon = document.querySelector('.theme-icon');
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

function setTheme(theme) {
  const isLight = theme === 'light';
  body.classList.toggle('light', isLight);
  themeIcon.textContent = isLight ? '☾' : '☀';
  localStorage.setItem('portfolio-theme', theme);
}

setTheme(localStorage.getItem('portfolio-theme') || 'dark');
themeButton.addEventListener('click', () => setTheme(body.classList.contains('light') ? 'dark' : 'light'));

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.pending-link').forEach(link => link.addEventListener('click', event => event.preventDefault()));
document.querySelector('#year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
