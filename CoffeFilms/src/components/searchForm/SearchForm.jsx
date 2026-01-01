import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const searchSchema = z.object({
  query: z
    .string()
    .min(2, "Минимум 2 символа")
    .max(50, "Слишком длинный запрос"),
});

const SearchForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchSchema),
  });

  const submitHandler = (data) => {
    onSubmit(data.query);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-2 max-w-md"
    >
      <input
        {...register("query")}
        placeholder="Поиск фильма..."
        className="p-3 rounded bg-gray-900 text-white border border-gray-700"
      />

      {errors.query && (
        <span className="text-red-500 text-sm">
          {errors.query.message}
        </span>
      )}

      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 transition p-3 rounded text-white"
      >
        🔍 Найти
      </button>
    </form>
  );
};

export default SearchForm;
