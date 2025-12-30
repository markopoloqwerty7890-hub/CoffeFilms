const KEY = "favorites";

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const addToFavorites = (movie) => {
  const favorites = getFavorites();
  if (!favorites.find((m) => m.id === movie.id)) {
    localStorage.setItem(KEY, JSON.stringify([...favorites, movie]));
  }
};

export const removeFromFavorites = (id) => {
  const favorites = getFavorites().filter((m) => m.id !== id);
  localStorage.setItem(KEY, JSON.stringify(favorites));
};

export const isFavorite = (id) => {
  return getFavorites().some((m) => m.id === id);
};
