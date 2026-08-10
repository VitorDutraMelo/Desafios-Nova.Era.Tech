const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-menu');

function setMenu(open) {
  toggle.classList.toggle('is-open', open);
  menu.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}

toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenu(false);
});

document.addEventListener('click', event => {
  if (menu.classList.contains('is-open') && !menu.contains(event.target) && !toggle.contains(event.target)) setMenu(false);
});
