import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieTrailer } from "../../services/tmdb.service";
import Loader from "../../components/loader/Loader";
import ErrorMessage from "../../ui/ErrorMessage";
import VenomImg from "../../assets/img/Venom.jpg"
import InceptionImg from "../../assets/img/Inception.jpg"
import darkKnightImg from "../../assets/img/dark-knight.jpg"


// ФЕЙКОВЫЕ ФИЛЬМЫ
const fakeMovies = [
  {
    id: 1,
    title: "Venom",
    overview: "A team of explorers travel through a wormhole in space.",
    poster_path: VenomImg,
    vote_average: 8.6,
    release_date: "2014-11-07"
  },
  {
    id: 2,
    title: "Inception",
    overview: "A thief who steals secrets through dream-sharing.",
    poster_path: InceptionImg,
    vote_average: 8.8,
    release_date: "2010-07-16"
  },
      {
      id: 3,
      title: "dark-knight.jpg",
      overview: "Batman faces the Joker in Gotham City.",
      poster_path: darkKnightImg,
      vote_average: 9.0,
      release_date: "2010-07-16"
    }
];

const MoviePage = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        setError(null);

        const foundMovie = fakeMovies.find(m => m.id === Number(id));
        if (!foundMovie) {
          throw new Error("Фильм не найден");
        }

        setMovie(foundMovie);

        const trailerData = await getMovieTrailer(id);
        setTrailer(trailerData);

      } catch (err) {
        setError(err.message || "Ошибка загрузки фильма");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);


  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  

  useEffect(() => {
    const foundMovie = fakeMovies.find(m => m.id === Number(id));
    setMovie(foundMovie);
  }, [id]);

  useEffect(() => {
    getMovieTrailer(id).then(setTrailer);
  }, [id]);

  if (!movie) return <p className="text-white">Фильм не найден</p>;

  return (
    <div className="p-6 text-white flex gap-6">
      <img
        src={movie.poster_path}
        className="w-72 rounded"
      />

      <div>
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <p className="mt-3 text-gray-300">{movie.overview}</p>
        <p className="mt-3">⭐ Рейтинг: {movie.vote_average}</p>
        <p>📅 Дата выхода: {movie.release_date}</p>

        {trailer && (
          <button
            onClick={() => setOpen(true)}
            className="mt-4 px-5 py-2 bg-red-600 rounded hover:bg-red-700"
          >
            ▶ Смотреть трейлер
          </button>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-[80%] h-[70%]">
            <iframe
              className="w-full h-full rounded"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              allowFullScreen
            />
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-white text-2xl"
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
