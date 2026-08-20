const body = document.body;
const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav');
const themeButton = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-toggle__icon');
const form = document.querySelector('.newsletter');
const formMessage = document.querySelector('.form-message');

const savedTheme = localStorage.getItem('astroverse-theme');
if (savedTheme === 'light') {
  body.classList.add('light');
  themeIcon.textContent = '☾';
}

themeButton.addEventListener('click', () => {
  body.classList.toggle('light');
  const isLight = body.classList.contains('light');
  themeIcon.textContent = isLight ? '☾' : '☀';
  localStorage.setItem('astroverse-theme', isLight ? 'light' : 'dark');
});

menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

form.addEventListener('submit', event => {
  event.preventDefault();
  const email = form.querySelector('input').value;
  formMessage.textContent = `Bem-vindo à jornada! Novidades serão enviadas para ${email}.`;
  form.reset();
});
