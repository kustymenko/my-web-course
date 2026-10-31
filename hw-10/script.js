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
