import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import Loader from "../loader/Loader";

import {
  addToFavorites,
  removeFromFavorites,
  isFavorite,
} from "../../utils/favorites";

const fakeMovies = [
  {
    id: 1,
    title: "Venom",
    poster_path: "/src/img/Venom.jpg",
  },
  {
    id: 2,
    title: "Inception",
    poster_path: "/src/img/Inception.jpg",
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster_path: "/src/img/TheDarkKnight.jpg",
  },
];

const MovieList = () => {
  const [movies, setMovies] = useState(fakeMovies);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔎 ПОИСК (по фейкам)
  const handleSearch = (query) => {
    if (!query) {
      setMovies(fakeMovies);
      return;
    }

    const filtered = fakeMovies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );

    setMovies(filtered);
  };

  return (
    <div className="p-6">
      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {movies.map((movie) => (
            <div
  key={movie.id}
  onClick={() => navigate(`/movie/${movie.id}`)}
  className="group relative rounded-xl overflow-hidden cursor-pointer 
             bg-gray-900 shadow-lg 
             transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
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
  src={movie.poster_path}
  alt={movie.title}
  className="w-full h-60 object-cover transition duration-300 
             group-hover:brightness-75"
/>
<div
  className="absolute inset-0 flex items-end 
             bg-gradient-to-t from-black/80 via-black/20 to-transparent
             opacity-0 group-hover:opacity-100 transition duration-300"
>
  <h3 className="text-white font-bold text-lg p-3">
    {movie.title}
  </h3>
</div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
