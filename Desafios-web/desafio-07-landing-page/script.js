const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const navigationLinks = document.querySelectorAll("#navigation a");
const header = document.querySelector(".header");
const currentYear = document.querySelector("#current-year");

function toggleMenu() {
  const isMenuOpen = navigation.classList.toggle("active");

  menuButton.classList.toggle("active", isMenuOpen);
  document.body.classList.toggle("menu-open", isMenuOpen);

  menuButton.setAttribute("aria-expanded", String(isMenuOpen));
  menuButton.setAttribute(
    "aria-label",
    isMenuOpen
      ? "Fechar menu de navegação"
      : "Abrir menu de navegação"
  );
}

function closeMenu() {
  navigation.classList.remove("active");
  menuButton.classList.remove("active");
  document.body.classList.remove("menu-open");

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute(
    "aria-label",
    "Abrir menu de navegação"
  );
}

function updateHeader() {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
    return;
  }

  header.classList.remove("scrolled");
}

menuButton.addEventListener("click", toggleMenu);

navigationLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", updateHeader);

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    closeMenu();
  }
});

currentYear.textContent = new Date().getFullYear();

updateHeader();