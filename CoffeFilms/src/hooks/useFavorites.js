import { useEffect, useState } from "react";

const STORAGE_KEY = "favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // загрузка из localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setFavorites(saved);
  }, []);

  // сохранение
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== id));
  };

  const isFavorite = (id) => {
    return favorites.some((movie) => movie.id === id);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
};
