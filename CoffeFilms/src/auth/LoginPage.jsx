import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";

import { loginUser, getUser } from "../utils/auth";

const schema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    const user = getUser();

    if (!user || user.email !== data.email) {
      setError("email", {
        message: "Неверный email или пароль",
      });
      return;
    }

    // логинимся
    loginUser(user);
    navigate("/favorites");
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Вход</h2>

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-800 mb-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          {...register("password")}
          placeholder="Пароль"
          className="w-full p-3 rounded bg-gray-800 mt-4 mb-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button className="w-full mt-6 py-3 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition">
          Войти
        </button>

        <p className="text-center text-sm mt-4 text-gray-400">
          Нет аккаунта?{" "}
          <Link to="/register" className="text-red-500 hover:underline">
            Регистрация
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
