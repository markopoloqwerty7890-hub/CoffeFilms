const Input = ({ label, error, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-300">{label}</label>
      <input
        {...props}
        className="px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default Input;
