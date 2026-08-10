const form = document.querySelector('#login-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const toggle = document.querySelector('.password-toggle');
const message = document.querySelector('#form-message');

toggle.addEventListener('click', () => {
  const isVisible = password.type === 'text';
  password.type = isVisible ? 'password' : 'text';
  toggle.setAttribute('aria-pressed', String(!isVisible));
  toggle.setAttribute('aria-label', isVisible ? 'Mostrar senha' : 'Ocultar senha');
  password.focus();
});

function showError(input, errorId, text) {
  input.classList.toggle('invalid', Boolean(text));
  input.setAttribute('aria-invalid', String(Boolean(text)));
  document.querySelector(`#${errorId}`).textContent = text;
}

function validateEmail() {
  if (!email.value.trim()) {
    showError(email, 'email-error', 'Informe seu e-mail.');
    return false;
  }
  if (!email.validity.valid) {
    showError(email, 'email-error', 'Digite um e-mail válido.');
    return false;
  }
  showError(email, 'email-error', '');
  return true;
}

function validatePassword() {
  if (!password.value) {
    showError(password, 'password-error', 'Informe sua senha.');
    return false;
  }
  if (password.value.length < 6) {
    showError(password, 'password-error', 'A senha precisa ter pelo menos 6 caracteres.');
    return false;
  }
  showError(password, 'password-error', '');
  return true;
}

email.addEventListener('blur', validateEmail);
password.addEventListener('blur', validatePassword);
email.addEventListener('input', () => email.classList.contains('invalid') && validateEmail());
password.addEventListener('input', () => password.classList.contains('invalid') && validatePassword());

form.addEventListener('submit', (event) => {
  event.preventDefault();
  message.textContent = '';

  const emailIsValid = validateEmail();
  const passwordIsValid = validatePassword();

  if (!emailIsValid || !passwordIsValid) {
    form.querySelector('.invalid')?.focus();
    return;
  }

  message.textContent = 'Login validado com sucesso!';
});
