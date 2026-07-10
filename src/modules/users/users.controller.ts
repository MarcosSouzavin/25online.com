import type { Request, Response } from "express";
import { registerUserSchema, loginSchema } from "./users.schema";
import { registerUser, login, UserAlreadyExistsError, InvalidCredentialsError } from "./users.service";

export async function registerHandler(req: Request, res: Response) {
  console.log("BODY RECEBIDO:", req.body); // temporário: log do corpo da requisição para depuração
  const parsed = registerUserSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: "Dados inválidos", details: parsed.error.flatten().fieldErrors });
  }

  try {
    const user = await registerUser(parsed.data);
    return res.status(201).json(user);
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(409).json({ error: err.message });
    }
    console.error(err);
    return res.status(500).json({ error: "Erro interno" });
  }
}

  

export async function loginHandler(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  try {
    const result = await login(parsed.data);
    return res.status(200).json(result);
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(401).json({ error: "E-mail ou senha incorretos" });
    }
    console.error(err);
    return res.status(500).json({ error: "Erro interno" });
  }
}