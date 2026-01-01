import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const useMovieTrailer = (id) => {
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchTrailer = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=ru-RU`
        );

        const data = await res.json();

        const youtubeTrailer = data.results.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );

        setTrailer(youtubeTrailer);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [id]);

  return { trailer, loading };
};
