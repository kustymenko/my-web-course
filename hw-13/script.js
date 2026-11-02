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

// Підписники: зберігаємо в localStorage масив { name, email, age, registeredAt }
const STORAGE_KEY = 'subscribers';
const subscribersList = document.getElementById('subscribers-list');
const subscribersEmpty = document.getElementById('subscribers-empty');
const successMessage = document.getElementById('success-message');

function loadSubscribers() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

// Малюємо список; дані користувача вставляємо через textContent, не innerHTML
function renderSubscribers() {
  const subscribers = loadSubscribers();
  subscribersList.replaceChildren();
  subscribers.forEach((person) => {
    const item = document.createElement('li');

    const name = document.createElement('span');
    name.className = 'subscribers__name';
    name.textContent = person.name;

    const details = document.createElement('div');
    details.textContent = `${person.email} · ${person.age} р. · ${person.registeredAt}`;

    item.append(name, details);
    subscribersList.append(item);
  });
  subscribersEmpty.hidden = subscribers.length > 0;
}

// Після успішної відправки: очистити форму і прибрати всі стани полів
function resetForm() {
  form.reset();
  fields.forEach((input) => {
    input.classList.remove('valid', 'invalid');
    input.removeAttribute('aria-invalid');
    document.getElementById(`${input.id}-error`).textContent = '';
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Перевіряємо ВСІ поля (map, а не some, щоб помилки показались у кожного)
  const results = fields.map((input) => validateField(input));
  if (results.includes(false)) {
    fields.find((input) => input.classList.contains('invalid')).focus();
    return;
  }

  const subscribers = loadSubscribers();
  // Пароль нікуди не зберігаємо
  subscribers.push({
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    age: Number(document.getElementById('age').value),
    registeredAt: new Date().toLocaleString('uk-UA'),
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers));

  resetForm();
  renderSubscribers();

  successMessage.classList.add('visible');
  setTimeout(() => successMessage.classList.remove('visible'), 3000);
});

renderSubscribers();
