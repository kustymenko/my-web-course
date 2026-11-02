// Датасет (boxOffice — млн $)
const movies = [
  {
    title: 'Темний лицар',
    year: 2008,
    genre: 'бойовик',
    rating: 9.0,
    boxOffice: 1006,
    director: 'Крістофер Нолан',
  },
  {
    title: 'Початок',
    year: 2010,
    genre: 'фантастика',
    rating: 8.8,
    boxOffice: 837,
    director: 'Крістофер Нолан',
  },
  {
    title: 'Інтерстеллар',
    year: 2014,
    genre: 'фантастика',
    rating: 8.7,
    boxOffice: 701,
    director: 'Крістофер Нолан',
  },
  {
    title: 'Оппенгеймер',
    year: 2023,
    genre: 'драма',
    rating: 8.3,
    boxOffice: 976,
    director: 'Крістофер Нолан',
  },
  {
    title: 'Матриця',
    year: 1999,
    genre: 'фантастика',
    rating: 8.7,
    boxOffice: 467,
    director: 'Лана і Ліллі Вачовскі',
  },
  {
    title: 'Форрест Ґамп',
    year: 1994,
    genre: 'драма',
    rating: 8.8,
    boxOffice: 678,
    director: 'Роберт Земекіс',
  },
  {
    title: 'Паразити',
    year: 2019,
    genre: 'драма',
    rating: 8.5,
    boxOffice: 263,
    director: 'Пон Джун Хо',
  },
  {
    title: 'Аватар',
    year: 2009,
    genre: 'фантастика',
    rating: 7.9,
    boxOffice: 2923,
    director: 'Джеймс Кемерон',
  },
  {
    title: 'Титанік',
    year: 1997,
    genre: 'драма',
    rating: 7.9,
    boxOffice: 2264,
    director: 'Джеймс Кемерон',
  },
  {
    title: 'Джокер',
    year: 2019,
    genre: 'драма',
    rating: 8.4,
    boxOffice: 1074,
    director: 'Тодд Філліпс',
  },
  {
    title: 'Вовк з Волл-стріт',
    year: 2013,
    genre: 'драма',
    rating: 8.2,
    boxOffice: 407,
    director: 'Мартін Скорсезе',
  },
  {
    title: 'Гладіатор',
    year: 2000,
    genre: 'бойовик',
    rating: 8.5,
    boxOffice: 465,
    director: 'Рідлі Скотт',
  },
  {
    title: 'Шалений Макс: Дорога люті',
    year: 2015,
    genre: 'бойовик',
    rating: 8.1,
    boxOffice: 380,
    director: 'Джордж Міллер',
  },
  {
    title: 'Король Лев',
    year: 1994,
    genre: 'анімація',
    rating: 8.5,
    boxOffice: 968,
    director: 'Роджер Аллерс і Роб Мінкофф',
  },
  {
    title: 'Захар Беркут',
    year: 2019,
    genre: 'бойовик',
    rating: 6.7,
    boxOffice: 1.5,
    director: 'Ахтем Сеітаблаєв',
  },
  {
    title: 'Мавка. Лісова пісня',
    year: 2023,
    genre: 'анімація',
    rating: 6.9,
    boxOffice: 21,
    director: 'Олег Маламуж і Олександра Рубан',
  },
  {
    title: 'Памфір',
    year: 2023,
    genre: 'драма',
    rating: 7.1,
    boxOffice: 0.2,
    director: 'Дмитро Сухолиткий-Собчук',
  },
];

// 1. Топ-n фільмів за рейтингом (назви). Сортуємо копію, оригінал не чіпаємо
function topRated(movies, n) {
  return [...movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, n)
    .map((movie) => movie.title);
}

// 2. Фільми, випущені строго після вказаного року
function releasedAfter(movies, year) {
  return movies.filter((movie) => movie.year > year);
}

// Округлення до 2 знаків, щоб прибрати похибку плаваючої коми
function round2(x) {
  return Math.round(x * 100) / 100;
}

// 3. Загальні збори по жанрах (млн $) через reduce
function boxOfficeByGenre(movies) {
  const totals = movies.reduce((acc, movie) => {
    acc[movie.genre] = (acc[movie.genre] || 0) + movie.boxOffice;
    return acc;
  }, {});
  // Округлюємо суми вже після підрахунку
  return Object.fromEntries(
    Object.entries(totals).map(([genre, sum]) => [genre, round2(sum)]),
  );
}

// 4. Середній рейтинг режисера (2 знаки) або повідомлення, якщо його немає
function directorRating(movies, director) {
  const films = movies.filter((movie) => movie.director === director);
  if (films.length === 0) {
    return 'Режисера не знайдено';
  }
  const sum = films.reduce((acc, movie) => acc + movie.rating, 0);
  return round2(sum / films.length);
}

// 5. Найкасовіший рік: { year, total }
function bestYear(movies) {
  const byYear = movies.reduce((acc, movie) => {
    acc[movie.year] = (acc[movie.year] || 0) + movie.boxOffice;
    return acc;
  }, {});
  // Ключі об'єкта — рядки, тому рік переводимо назад у число
  const [year, total] = Object.entries(byYear).reduce((best, entry) =>
    entry[1] > best[1] ? entry : best,
  );
  return { year: Number(year), total: round2(total) };
}

// 6. Пошук за назвою: підрядок без урахування регістру
function searchByTitle(movies, query) {
  const q = query.toLowerCase();
  return movies.filter((movie) => movie.title.toLowerCase().includes(q));
}

// 7. Випадкова рекомендація жанру з рейтингом строго вищим за minRating
function recommend(movies, genre, minRating) {
  const suitable = movies.filter(
    (movie) => movie.genre === genre && movie.rating > minRating,
  );
  if (suitable.length === 0) {
    return 'Нічого не знайдено';
  }
  return suitable[Math.floor(Math.random() * suitable.length)];
}

// Бонус: топ-3 драми 2010-х за касою — один ланцюжок без проміжних змінних
function top3DramasOf2010s(movies) {
  return movies
    .filter(
      (movie) =>
        movie.genre === 'драма' && movie.year >= 2010 && movie.year <= 2019,
    )
    .sort((a, b) => b.boxOffice - a.boxOffice)
    .slice(0, 3)
    .map((movie) => movie.title);
}

// ===== Звіт для керівника =====
console.log('===== Звіт для керівника =====');
console.log('Топ-5 за рейтингом:', topRated(movies, 5));
console.log('Топ-3 за рейтингом:', topRated(movies, 3));
console.log(
  'Вийшли після 2018:',
  releasedAfter(movies, 2018).map((m) => m.title),
);
console.log('Вийшли після 2023:', releasedAfter(movies, 2023));
console.log('Збори по жанрах (млн $):', boxOfficeByGenre(movies));
console.log('Рейтинг Нолана:', directorRating(movies, 'Крістофер Нолан'));
console.log('Рейтинг Кемерона:', directorRating(movies, 'Джеймс Кемерон'));
console.log('Рейтинг Спілберга:', directorRating(movies, 'Спілберг'));
console.log('Найкасовіший рік:', bestYear(movies));
console.log(
  'Пошук «ар»:',
  searchByTitle(movies, 'ар').map((m) => m.title),
);
console.log(
  'Пошук «МАВ»:',
  searchByTitle(movies, 'МАВ').map((m) => m.title),
);
console.log('Пошук «хоббіт»:', searchByTitle(movies, 'хоббіт'));
console.log('Рекомендація (драма, > 8.4):', recommend(movies, 'драма', 8.4));
console.log('Рекомендація (анімація, > 9):', recommend(movies, 'анімація', 9));
console.log('Бонус — топ-3 драми 2010-х:', top3DramasOf2010s(movies));
