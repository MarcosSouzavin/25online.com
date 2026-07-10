import { z } from "zod";
import { isValidCpf } from "./cpf";

export const registerUserSchema = z.object({
  cpf: z.string().refine(isValidCpf, { message: "CPF inválido" }),
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8, "Senha precisa de pelo menos 8 caracteres"),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;