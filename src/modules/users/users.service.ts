import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import type { RegisterUserInput, LoginInput } from "./users.schema";

const SALT_ROUNDS = 12;

type User = {
  id: string;
  cpf: string;
  username: string;
  email: string;
  passwordHash: string;
};

// Array em memória só pra testar o fluxo — troca por Prisma depois
const users: User[] = [];

export class UserAlreadyExistsError extends Error {}
export class InvalidCredentialsError extends Error {}

export async function registerUser(input: RegisterUserInput) {
  const exists = users.find(
    (u) => u.cpf === input.cpf || u.email === input.email || u.username === input.username
  );

  if (exists) {
    throw new UserAlreadyExistsError("CPF, e-mail ou usuário já cadastrado");
  }

  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);

  const user: User = {
    id: crypto.randomUUID(),
    cpf: input.cpf,
    username: input.username,
    email: input.email,
    passwordHash,
  };

  users.push(user);

  const { passwordHash: _omit, ...safeUser } = user;
  return safeUser;
}

export async function login(input: LoginInput) {
  const user = users.find((u) => u.email === input.email);

  if (!user) throw new InvalidCredentialsError();

  const matches = await bcrypt.compare(input.password, user.passwordHash);
  if (!matches) throw new InvalidCredentialsError();

  const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, { expiresIn: "1h" });
  return { token };
}