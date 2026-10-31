// ===== Частина 1: фігури =====

// Піраміда: на рівні i — (2 * i - 1) блоків, ліворуч пробіли для центрування
function pyramid(n) {
  for (let i = 1; i <= n; i++) {
    const spaces = ' '.repeat(n - i);
    const blocks = '█'.repeat(2 * i - 1);
    console.log(spaces + blocks);
  }
}

// Ялинка: крона — це pyramid(n), стовбур — один блок по центру
function christmasTree(n) {
  pyramid(n);
  console.log(' '.repeat(n - 1) + '█');
}

// Шахівниця: лівий верхній — завжди █, вибір за парністю (рядок + стовпець)
function chessboard(size) {
  for (let row = 0; row < size; row++) {
    let line = '';
    for (let col = 0; col < size; col++) {
      line += (row + col) % 2 === 0 ? '█' : '░';
    }
    console.log(line);
  }
}

// Демо фігур
console.log('pyramid(4):');
pyramid(4);

console.log('christmasTree(3):');
christmasTree(3);

console.log('chessboard(4):');
chessboard(4);

// ===== Частина 2: шифр Цезаря =====

const LATIN = 'abcdefghijklmnopqrstuvwxyz';

// Зсув одного символу; не-літери повертаємо без змін, регістр зберігаємо
function shiftChar(char, shift) {
  const lowerIndex = LATIN.indexOf(char);
  if (lowerIndex !== -1) {
    // ((x % n) + n) % n — щоб від'ємний зсув теж працював (z + 1 → a)
    return LATIN[(((lowerIndex + shift) % 26) + 26) % 26];
  }
  const upperIndex = LATIN.toUpperCase().indexOf(char);
  if (upperIndex !== -1) {
    return LATIN.toUpperCase()[(((upperIndex + shift) % 26) + 26) % 26];
  }
  return char;
}

function encrypt(text, shift) {
  let result = '';
  for (const char of text) {
    result += shiftChar(char, shift);
  }
  return result;
}

// Розшифрування — це шифрування з протилежним зсувом
function decrypt(text, shift) {
  return encrypt(text, -shift);
}

// Перебір усіх зсувів 1..25
function bruteForce(encrypted) {
  for (let shift = 1; shift <= 25; shift++) {
    console.log(`Зсув ${shift}: ${decrypt(encrypted, shift)}`);
  }
}

// Демо шифру
console.log('encrypt("Hello, World!", 3):', encrypt('Hello, World!', 3));
console.log('encrypt("xyz", 3):', encrypt('xyz', 3));
console.log('encrypt("Java Script 101", 13):', encrypt('Java Script 101', 13));
console.log('decrypt("Khoor, Zruog!", 3):', decrypt('Khoor, Zruog!', 3));
console.log('decrypt("Wnin Fpevcg 101", 13):', decrypt('Wnin Fpevcg 101', 13));
console.log('decrypt(encrypt("Test", 7), 7):', decrypt(encrypt('Test', 7), 7));

console.log('bruteForce("Fdhvdu"):');
bruteForce('Fdhvdu');
