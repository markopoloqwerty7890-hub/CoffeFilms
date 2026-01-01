import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavorites, removeFromFavorites } from "../../utils/favorites";
import Loader from "../../components/loader/Loader";

const FavoritesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const favorites = getFavorites();
    setMovies(favorites);
    setLoading(false);
  }, []);

  const handleRemove = (id) => {
    const confirmed = window.confirm("Удалить фильм из избранного?");
    if (!confirmed) return;

    removeFromFavorites(id);
    setMovies(getFavorites());
  };

  if (loading) {
    return <Loader />;
  }

  if (movies.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-10 text-lg">
        Избранное пусто 💔
      </p>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">
        ⭐ Избранные фильмы
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative bg-gray-900 rounded-xl overflow-hidden
                       shadow-lg transition-transform duration-300
                       hover:scale-105 hover:shadow-2xl"
          >
            {/* ❌ Удалить */}
            <button
              onClick={() => handleRemove(movie.id)}
              aria-label="Удалить из избранного"
              className="absolute top-2 right-2 z-10 text-xl
                         bg-black/60 rounded-full p-1 hover:bg-red-600 transition"
            >
              ❌
            </button>

            {/* 🎬 Постер */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="w-full h-64 object-cover cursor-pointer"
            />

            {/* 🎥 Название */}
            <div className="p-3 text-center">
              <h3 className="text-white font-semibold text-sm">
                {movie.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
