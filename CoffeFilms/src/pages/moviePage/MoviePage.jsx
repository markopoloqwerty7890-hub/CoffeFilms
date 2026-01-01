import { useParams } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/loader/Loader";
import { useMovie } from "../../hooks/useMovies";
import { useMovieTrailer } from "../../hooks/useMovieTrailer";

const MoviePage = () => {
  const { id } = useParams();
  const { movie, loading, error } = useMovie(id);
  const { trailer } = useMovieTrailer(id);

  const [open, setOpen] = useState(false);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!movie) return null;

  return (
    <div className="p-6 text-white max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* POSTER */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-2xl shadow-lg"
        />

        {/* INFO */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>

          <p className="text-gray-400 mb-4">{movie.tagline}</p>

          {/* META */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm">
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <span>🗳 {movie.vote_count}</span>
            <span>📅 {movie.release_date}</span>
            <span>⏱ {movie.runtime} мин</span>
            <span>🔥 {Math.round(movie.popularity)}</span>
          </div>

          {/* GENRES */}
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-white/10 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* MONEY */}
          <div className="flex gap-6 mb-4 text-sm text-gray-300">
            <span>💰 Бюджет: ${movie.budget.toLocaleString()}</span>
            <span>🏆 Сборы: ${movie.revenue.toLocaleString()}</span>
          </div>

          <p className="opacity-80 mb-6">{movie.overview}</p>

          {trailer && (
            <button
              onClick={() => setOpen(true)}
              className="px-6 py-3 bg-red-600 rounded-xl hover:bg-red-700 transition font-semibold"
            >
              ▶ Смотреть трейлер
            </button>
          )}
        </div>
      </div>

      {/* TRAILER MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-[90%] md:w-[70%] aspect-video">
            <iframe
              className="w-full h-full rounded-2xl"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              allowFullScreen
            />
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-2xl"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
