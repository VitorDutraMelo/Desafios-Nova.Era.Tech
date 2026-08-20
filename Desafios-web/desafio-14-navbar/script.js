const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-content');
const dropdown = document.querySelector('.dropdown');
const dropdownButton = document.querySelector('.dropdown-toggle');
const navigationLinks = document.querySelectorAll('.nav-links a:not(.submenu a)');

function closeMenu() {
  menuButton.classList.remove('active');
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.classList.toggle('active', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

dropdownButton.addEventListener('click', () => {
  const isOpen = dropdown.classList.toggle('open');
  dropdownButton.setAttribute('aria-expanded', String(isOpen));
});

navigationLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navigationLinks.forEach((item) => {
      item.classList.remove('active');
      item.removeAttribute('aria-current');
    });
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
    closeMenu();
  });
});

document.addEventListener('click', (event) => {
  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove('open');
    dropdownButton.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    dropdown.classList.remove('open');
    dropdownButton.setAttribute('aria-expanded', 'false');
    closeMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) closeMenu();
});
