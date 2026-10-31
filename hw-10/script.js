// ===== Частина 1: фігури =====

// Піраміда: на рівні i — (2 * i - 1) блоків, ліворуч пробіли для центрування
function pyramid(n) {
  for (let i = 1; i <= n; i++) {
    const spaces = ' '.repeat(n - i);
    const blocks = '█'.repeat(2 * i - 1);
    console.log(spaces + blocks);
  }
}

// Демо фігур
console.log('pyramid(4):');
pyramid(4);
