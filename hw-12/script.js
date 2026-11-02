// Модальне вікно
const overlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalAuthor = overlay.querySelector('.modal__author');
const modalText = overlay.querySelector('.modal__text');

function openModal(button) {
  // Наповнюємо модалку даними з кнопки, на яку натиснули
  modalTitle.textContent = button.dataset.title;
  modalAuthor.textContent = button.dataset.author;
  modalText.textContent = button.dataset.description;
  overlay.classList.add('open');
  document.body.classList.add('no-scroll');
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.classList.remove('no-scroll');
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

// Перехід за посиланням «Підписатися» теж закриває модалку
overlay.querySelector('.modal__cta').addEventListener('click', closeModal);
