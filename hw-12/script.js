// Модальне вікно
const overlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalAuthor = overlay.querySelector('.modal__author');
const modalText = overlay.querySelector('.modal__text');

// Кнопка-відкривач: після закриття фокус повертається на неї
let lastOpener = null;

function openModal(button) {
  lastOpener = button;
  // Наповнюємо модалку даними з кнопки, на яку натиснули
  modalTitle.textContent = button.dataset.title;
  modalAuthor.textContent = button.dataset.author;
  modalText.textContent = button.dataset.description;
  overlay.classList.add('open');
  document.body.classList.add('no-scroll');
  // Фокус на перший інтерактивний елемент модалки
  getFocusable()[0].focus();
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.classList.remove('no-scroll');
  if (lastOpener) {
    lastOpener.focus();
  }
}

// Інтерактивні елементи всередині модалки
function getFocusable() {
  return [...overlay.querySelectorAll('button, a[href]')];
}

document.querySelectorAll('.open-modal').forEach((button) => {
  button.addEventListener('click', () => openModal(button));
});

// Закриття: хрестик
overlay.querySelector('.modal__close').addEventListener('click', closeModal);

// Закриття: клік по overlay (клік по самій модалці не закриває)
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    closeModal();
  }
});

// Закриття: клавіша Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('open')) {
    closeModal();
  }
});

// Фокус-пастка: Tab і Shift+Tab ходять колом лише всередині модалки
overlay.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') {
    return;
  }
  const focusable = getFocusable();
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

// Перехід за посиланням «Підписатися» теж закриває модалку
overlay.querySelector('.modal__cta').addEventListener('click', closeModal);

// Dropdown: відкритим може бути лише один
const dropdowns = document.querySelectorAll('.dropdown');

function closeDropdowns() {
  dropdowns.forEach((dropdown) => {
    dropdown.classList.remove('open');
    dropdown
      .querySelector('.dropdown__toggle')
      .setAttribute('aria-expanded', 'false');
  });
}

dropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector('.dropdown__toggle');
  toggle.addEventListener('click', () => {
    const wasOpen = dropdown.classList.contains('open');
    closeDropdowns();
    // Повторний клік закриває меню, інакше — відкриваємо це
    if (!wasOpen) {
      dropdown.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
});

// Клік поза dropdown закриває всі меню
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    closeDropdowns();
  }
});

// Escape закриває меню і повертає фокус на кнопку відкритого dropdown
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') {
    return;
  }
  const opened = document.querySelector('.dropdown.open');
  closeDropdowns();
  if (opened) {
    opened.querySelector('.dropdown__toggle').focus();
  }
});

// Фільтри й сортування полиці
const filters = { category: 'all', status: 'all', sort: 'title' };
const booksList = document.querySelector('.books');
const emptyMessage = document.querySelector('.books__empty');

function updateBooks() {
  const books = [...booksList.children];
  books.forEach((book) => {
    const wrongCategory =
      filters.category !== 'all' && book.dataset.category !== filters.category;
    const wrongStatus =
      filters.status !== 'all' && book.dataset.status !== filters.status;
    book.hidden = wrongCategory || wrongStatus;
  });

  books
    .sort((a, b) => {
      if (filters.sort === 'rating') {
        // Спершу вища оцінка, за однакової — за назвою
        const diff = Number(b.dataset.rating) - Number(a.dataset.rating);
        if (diff !== 0) {
          return diff;
        }
      }
      return a
        .querySelector('.book__title')
        .textContent.localeCompare(
          b.querySelector('.book__title').textContent,
          'uk',
        );
    })
    .forEach((book) => booksList.append(book));

  emptyMessage.hidden = books.some((book) => !book.hidden);
}

// Вибір пункту меню: запам'ятовуємо значення, оновлюємо підпис і закриваємо меню
document.querySelectorAll('.dropdown__item').forEach((item) => {
  item.addEventListener('click', () => {
    const dropdown = item.closest('.dropdown');
    filters[dropdown.dataset.key] = item.dataset.value;
    dropdown.querySelector('.dropdown__label').textContent =
      item.textContent.trim();
    dropdown
      .querySelectorAll('.dropdown__item')
      .forEach((other) =>
        other.classList.toggle('is-selected', other === item),
      );
    closeDropdowns();
    dropdown.querySelector('.dropdown__toggle').focus();
    updateBooks();
  });
});

updateBooks();
