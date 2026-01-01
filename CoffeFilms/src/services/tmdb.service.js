const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getDiscoverMovies = async () => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ru-RU&page=1`
  );

  if (!res.ok) {
    throw new Error("Ошибка загрузки фильмов");
  }

  const data = await res.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ru-RU&query=${query}`
  );

  if (!res.ok) {
    throw new Error("Ошибка поиска");
  }

  const data = await res.json();
  return data.results;
};
