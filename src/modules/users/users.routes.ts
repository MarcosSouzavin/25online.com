import { Router } from "express";
import { registerHandler, loginHandler } from "./users.controller";

export const usersRouter = Router();

usersRouter.post("/register", registerHandler);
usersRouter.post("/login", loginHandler);