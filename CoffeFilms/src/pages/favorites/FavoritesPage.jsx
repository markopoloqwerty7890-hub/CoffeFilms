import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavorites, removeFromFavorites } from "../../utils/favorites";

const FavoritesPage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setMovies(getFavorites());
  }, []);

  const handleRemove = (id) => {
    removeFromFavorites(id);
    setMovies(getFavorites());
  };

  if (movies.length === 0) {
    return <p className="text-center text-gray-400">Избранное пусто 💔</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="relative bg-gray-800 rounded-md overflow-hidden"
        >
          <button
            onClick={() => handleRemove(movie.id)}
            className="absolute top-2 right-2 text-xl"
          >
            ❌
          </button>

          <img
            src={movie.poster_path}
            alt={movie.title}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="w-full h-60 object-cover cursor-pointer"
          />

          <h3 className="text-white font-semibold p-2 text-center">
            {movie.title}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default FavoritesPage;
