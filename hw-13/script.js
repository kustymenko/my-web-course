const form = document.getElementById('signup-form');
const password = document.getElementById('password');
const confirmInput = document.getElementById('confirm');

// Правила: кожне повертає текст помилки або порожній рядок, якщо поле коректне
const validators = {
  name: (input) =>
    input.value.trim().length >= 2 ? '' : "Ім'я має містити мінімум 2 символи",
  email: (input) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())
      ? ''
      : 'Введіть коректний email',
  password: (input) =>
    input.value.length >= 8 && /\d/.test(input.value)
      ? ''
      : 'Пароль: мінімум 8 символів та 1 цифра',
  confirm: (input) =>
    input.value !== '' && input.value === password.value
      ? ''
      : 'Паролі не збігаються',
  age: (input) => {
    const age = Number(input.value);
    return input.value !== '' &&
      Number.isInteger(age) &&
      age >= 16 &&
      age <= 100
      ? ''
      : 'Вік має бути від 16 до 100';
  },
  agree: (input) => (input.checked ? '' : 'Необхідно погодитись з умовами'),
};

// Поля, які перевіряються (select тарифу не потребує перевірки)
const fields = Object.keys(validators).map((id) => document.getElementById(id));

// Перевіряє одне поле: показує помилку (червона рамка) або позначає коректним (зелена)
function validateField(input) {
  const message = validators[input.id](input);
  document.getElementById(`${input.id}-error`).textContent = message;
  input.classList.toggle('invalid', message !== '');
  input.classList.toggle('valid', message === '');
  input.setAttribute('aria-invalid', message !== '');
  return message === '';
}

fields.forEach((input) => {
  // blur: перевірити поле, коли користувач його залишив
  input.addEventListener('blur', () => validateField(input));

  // input: якщо поле вже з помилкою — перевіряємо на кожен символ
  input.addEventListener('input', () => {
    if (input.classList.contains('invalid')) {
      validateField(input);
    }
  });
});

// Змінили пароль — підтвердження теж треба перевірити заново
password.addEventListener('input', () => {
  if (
    confirmInput.classList.contains('valid') ||
    confirmInput.classList.contains('invalid')
  ) {
    validateField(confirmInput);
  }
});
