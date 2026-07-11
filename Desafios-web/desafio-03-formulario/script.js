const form = document.getElementById("registerForm");
const successMessage = document.getElementById("successMessage");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";

  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.textContent = isPassword ? "🙈" : "👁";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  successMessage.classList.add("active");

  form.reset();
  passwordInput.type = "password";
  togglePassword.textContent = "👁";

  setTimeout(() => {
    successMessage.classList.remove("active");
  }, 3000);
});