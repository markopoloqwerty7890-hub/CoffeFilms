import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

/* ===================== */
/* СПИСОК ФИЛЬМОВ */
/* ===================== */
export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (query = "") => {
    try {
      setLoading(true);
      setError(null);

      const url = query
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ru-RU&query=${query}`
        : `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ru-RU`;

      const res = await fetch(url);
      const data = await res.json();

      setMovies(data.results || []);
    } catch {
      setError("Ошибка загрузки фильмов");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return {
    movies,
    loading,
    error,
    search: fetchMovies,
  };
};

/* ===================== */
/* ОДИН ФИЛЬМ */
/* ===================== */
export const useMovie = (id) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ru-RU`
        );

        if (!res.ok) throw new Error("Фильм не найден");

        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  return { movie, loading, error };
};
