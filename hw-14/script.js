const STORAGE_KEY = 'booknook-items';

const addForm = document.getElementById('add-form');
const newItemInput = document.getElementById('new-item');
const list = document.getElementById('list');
const emptyMessage = document.getElementById('empty');
const filtersBox = document.getElementById('filters');
const counter = document.getElementById('counter');
const clearButton = document.getElementById('clear-completed');

// Масив — єдине джерело правди: { id, text, completed }
let items = loadItems();
let currentFilter = 'all';

function loadItems() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveItems() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Кожна дія: змінили дані → перемалювали → зберегли
function update() {
  render();
  saveItems();
}

// Книги, які проходять поточний фільтр
function getVisibleItems() {
  if (currentFilter === 'active') {
    return items.filter((item) => !item.completed);
  }
  if (currentFilter === 'completed') {
    return items.filter((item) => item.completed);
  }
  return items;
}

// Відмінювання: 1 книга, 2 книги, 5 книг (11–14 — «книг»)
function pluralize(n) {
  const lastTwo = n % 100;
  const last = n % 10;
  if (lastTwo >= 11 && lastTwo <= 14) {
    return 'книг';
  }
  if (last === 1) {
    return 'книга';
  }
  if (last >= 2 && last <= 4) {
    return 'книги';
  }
  return 'книг';
}

function render() {
  const visible = getVisibleItems();
  list.replaceChildren();

  visible.forEach((item) => {
    const li = document.createElement('li');
    li.className = item.completed ? 'item completed' : 'item';
    li.dataset.id = item.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.completed;
    checkbox.setAttribute('aria-label', `Прочитано: ${item.text}`);

    // Текст вставляємо через textContent, щоб не виконати чужу розмітку
    const text = document.createElement('span');
    text.className = 'item__text';
    text.textContent = item.text;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete';
    deleteButton.setAttribute('aria-label', `Видалити: ${item.text}`);
    deleteButton.textContent = '✕';

    li.append(checkbox, text, deleteButton);
    list.append(li);
  });

  emptyMessage.hidden = visible.length > 0;

  // Лічильник рахує всі непрочитані книги, незалежно від фільтра
  const activeCount = items.filter((item) => !item.completed).length;
  counter.textContent = `Залишилось прочитати: ${activeCount} ${pluralize(activeCount)}`;

  // Кнопка «Очистити прочитані» видима лише коли є прочитані
  clearButton.hidden = !items.some((item) => item.completed);

  // Підсвічуємо активний фільтр
  filtersBox.querySelectorAll('.filter').forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', isActive);
  });
}

// Додавання: submit спрацьовує і на клік «Додати», і на Enter
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = newItemInput.value.trim();
  if (text === '') {
    return;
  }
  items.push({ id: Date.now(), text, completed: false });
  newItemInput.value = '';
  newItemInput.focus();
  update();
});

function toggleItem(id) {
  const item = items.find((entry) => entry.id === id);
  item.completed = !item.completed;
  update();
}

function deleteItem(id) {
  // Видаляємо з масиву, а не лише з DOM
  items = items.filter((entry) => entry.id !== id);
  update();
}

// Один слухач на весь список (делегування подій)
list.addEventListener('click', (e) => {
  const li = e.target.closest('.item');
  if (!li) {
    return;
  }
  const id = Number(li.dataset.id);

  if (e.target.closest('.delete')) {
    deleteItem(id);
  } else if (e.target.matches('input[type="checkbox"]')) {
    toggleItem(id);
  } else if (e.target.closest('.item__text')) {
    toggleItem(id);
  }
});

// Фільтри змінюють лише відображення, дані в масиві лишаються
filtersBox.addEventListener('click', (e) => {
  const button = e.target.closest('.filter');
  if (!button) {
    return;
  }
  currentFilter = button.dataset.filter;
  render();
});

clearButton.addEventListener('click', () => {
  items = items.filter((item) => !item.completed);
  update();
});

render();
