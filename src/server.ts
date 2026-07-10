import express from "express";
import { usersRouter } from "./modules/users/users.routes";

const app = express();
const PORT = 3000;

app.use(express.json());         

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/users", usersRouter);   

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});