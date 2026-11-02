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
