import { useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import Loader from "../../components/loader/Loader";
import { useMovies } from "../../hooks/useMovies";

import {
  addToFavorites,
  removeFromFavorites,
  isFavorite,
} from "../../utils/favorites";

const MovieList = () => {
  const { movies, loading, error, search } = useMovies();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <SearchBar onSearch={search} />

      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="group relative rounded-xl overflow-hidden cursor-pointer
                       bg-gray-900 shadow-lg
                       transition-transform duration-300 hover:scale-105"
          >
            {/* ❤️ ИЗБРАННОЕ */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                isFavorite(movie.id)
                  ? removeFromFavorites(movie.id)
                  : addToFavorites(movie);
              }}
              className="absolute top-2 right-2 text-2xl z-10"
            >
              {isFavorite(movie.id) ? "❤️" : "🤍"}
            </button>

            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-60 object-cover group-hover:brightness-75"
            />

            <div className="absolute inset-0 flex items-end
                            bg-gradient-to-t from-black/80 via-black/20 to-transparent
                            opacity-0 group-hover:opacity-100 transition">
              <h3 className="text-white font-bold text-lg p-3">
                {movie.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
