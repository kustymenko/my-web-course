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
