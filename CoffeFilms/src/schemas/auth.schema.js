import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

export const registerSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Пароли не совпадают",
});
