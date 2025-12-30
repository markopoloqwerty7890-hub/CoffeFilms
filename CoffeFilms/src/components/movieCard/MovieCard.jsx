const MovieCard = memo(({ movie, onToggle }) => {
  return (
    <div>
      <h3>{movie.title}</h3>
      <button onClick={() => onToggle(movie)}>
        ⭐
      </button>
    </div>
  );
});
export default MovieCard