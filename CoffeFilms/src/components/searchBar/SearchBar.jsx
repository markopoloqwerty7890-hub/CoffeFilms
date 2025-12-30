import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="Поиск фильма..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 px-4 py-2 rounded bg-gray-800 text-white outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700"
      >
        Поиск
      </button>
    </form>
  );
};

export default SearchBar;
