import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../utils/auth";

const schema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

const onSubmit = (data) => {
  const user = {
    email: data.email,
    name: data.name,
  };

  loginUser(user);
  navigate("/");
};

  

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-800 mb-2"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input
          type="password"
          {...register("password")}
          placeholder="Пароль"
          className="w-full p-3 rounded bg-gray-800 mt-4 mb-2"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <input
          type="password"
          {...register("confirmPassword")}
          placeholder="Повторите пароль"
          className="w-full p-3 rounded bg-gray-800 mt-4 mb-2"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )}

        <button className="w-full mt-6 py-3 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition">
          Зарегистрироваться
        </button>

        <p className="text-center text-sm mt-4 text-gray-400">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
