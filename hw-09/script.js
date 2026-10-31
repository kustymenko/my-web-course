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

// 3. Генератор паролів
// Випадковий символ із рядка
function randomChar(chars) {
  return chars[Math.floor(Math.random() * chars.length)];
}

function generatePassword(length, options) {
  if (length < 4) {
    return 'Помилка: мінімальна довжина пароля — 4';
  }

  const { useUppercase, useDigits, useSymbols } = options || {};

  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const symbols = '!@#$%^&*';

  // Малі літери — завжди; решта — за опціями
  const sets = [lower];
  if (useUppercase) sets.push(upper);
  if (useDigits) sets.push(digits);
  if (useSymbols) sets.push(symbols);

  // Спочатку по одному символу кожного увімкненого типу — гарантія
  const chars = sets.map(randomChar);

  // Решту довжини добираємо з усіх дозволених символів
  const allChars = sets.join('');
  while (chars.length < length) {
    chars.push(randomChar(allChars));
  }

  // Перемішуємо (Фішера — Єйтса), щоб гарантовані символи не стояли на початку
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join('');
}

// Демо generatePassword
const allOptions = { useUppercase: true, useDigits: true, useSymbols: true };
const strongPassword = generatePassword(12, allOptions);
console.log('generatePassword(12, усі опції):', strongPassword);
console.log(
  'passwordStrength для нього:',
  passwordStrength(strongPassword).level,
);
console.log(
  'generatePassword(8, малі літери + цифри):',
  generatePassword(8, {
    useUppercase: false,
    useDigits: true,
    useSymbols: false,
  }),
);
console.log('generatePassword(3, усі опції):', generatePassword(3, allOptions));

// Бонус: нерівний поділ рахунку (напої — лише на тих, хто пив)
function splitBillUneven(foodTotal, drinksTotal, people, drinkers, tipPercent) {
  // Їжа — на всіх
  const foodShare = foodTotal / people;
  // Напої — на тих, хто пив
  const drinksShare = drinkers > 0 ? drinksTotal / drinkers : 0;
  // Чайові від (їжа + напої) — на всіх
  const tipShare = ((foodTotal + drinksTotal) * tipPercent) / 100 / people;

  const drinkerPays = Math.ceil(round2(foodShare + drinksShare + tipShare));
  const nonDrinkerPays = Math.ceil(round2(foodShare + tipShare));

  return { drinkerPays, nonDrinkerPays };
}

// Демо splitBillUneven
console.log(
  'splitBillUneven(800, 400, 4, 2, 10):',
  splitBillUneven(800, 400, 4, 2, 10),
);
