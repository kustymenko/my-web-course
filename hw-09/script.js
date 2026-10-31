// Округлення до 2 знаків, щоб уникнути проблем плаваючої коми (127.04999… → 127.05)
function round2(x) {
  return Math.round(x * 100) / 100;
}

// 1. Рахунок з чайовими, порівну на всіх
function splitBill(total, people, tipPercent) {
  // Валідація — першою
  if (total <= 0) {
    return 'Помилка: сума рахунку має бути більшою за 0';
  }
  if (people < 1) {
    return 'Помилка: людей має бути щонайменше 1';
  }

  const tip = round2((total * tipPercent) / 100);
  const grandTotal = round2(total + tip);
  const perPerson = Math.ceil(grandTotal / people);

  return { tip, grandTotal, perPerson };
}

// Демо splitBill
console.log('splitBill(1000, 4, 10):', splitBill(1000, 4, 10));
console.log('splitBill(847, 3, 15):', splitBill(847, 3, 15));
console.log('splitBill(500, 1, 0):', splitBill(500, 1, 0));
console.log('splitBill(1000, 0, 10):', splitBill(1000, 0, 10));
console.log('splitBill(-200, 3, 10):', splitBill(-200, 3, 10));

// 2. Надійність пароля
function passwordStrength(password) {
  const tips = [];
  let score = 0;

  // Довжина не менше 8 символів
  if (password.length >= 8) {
    score++;
  } else {
    tips.push('Додайте символів: довжина має бути щонайменше 8');
  }

  // Є цифра
  if (/[0-9]/.test(password)) {
    score++;
  } else {
    tips.push('Додайте хоча б одну цифру');
  }

  // Є і великі, і малі літери
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score++;
  } else {
    tips.push('Використайте і великі, і малі літери');
  }

  // Є спецсимвол з !@#$%^&*
  if (/[!@#$%^&*]/.test(password)) {
    score++;
  } else {
    tips.push('Додайте спецсимвол: ! @ # $ % ^ & *');
  }

  let level;
  if (score <= 2) {
    level = 'слабкий';
  } else if (score === 3) {
    level = 'середній';
  } else {
    level = 'надійний';
  }

  return { level, tips };
}

// Демо passwordStrength
console.log('passwordStrength("qwerty"):', passwordStrength('qwerty'));
console.log('passwordStrength("1234"):', passwordStrength('1234'));
console.log('passwordStrength("Korovai42"):', passwordStrength('Korovai42'));
console.log(
  'passwordStrength("Vechir#Kavi2026"):',
  passwordStrength('Vechir#Kavi2026'),
);
