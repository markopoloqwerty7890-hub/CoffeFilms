const fakeMovies = {
  results: [
    {
      id: 1,
      title: "Venom",
      overview: "A team of explorers travel through a wormhole in space.",
      poster_path: "/public/img/Без названия.jpg",
      vote_average: 8.6
    },
    {
      id: 2,
      title: "Inception",
      overview: "A thief who steals corporate secrets through dream-sharing.",
      poster_path: "/public/img/Inception.jpg",
      vote_average: 8.8
    },
    {
      id: 3,
      title: "TheDarkKnight",
      overview: "Batman faces the Joker in Gotham City.",
      poster_path: "/public/img/The Dark Knight.jpg",
      vote_average: 9.0
    }
  ]
};

export const getPopularMovies = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fakeMovies), 500);
  });
};

export const searchMovies = async (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        results: fakeMovies.results.filter(movie =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        )
      });
    }, 300);
  });
};

export const getMovieTrailer = async () => {
  return {
    key: "dQw4w9WgXcQ" // fake YouTube трейлер
  };
};
