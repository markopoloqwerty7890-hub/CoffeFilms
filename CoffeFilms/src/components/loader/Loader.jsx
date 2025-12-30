const Loader = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-60 rounded-xl bg-gray-800 animate-pulse"
        />
      ))}
    </div>
  );
};

export default Loader;
