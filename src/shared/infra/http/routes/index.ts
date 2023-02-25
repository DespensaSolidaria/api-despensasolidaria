import { Router, Request } from "express";

import { AppError } from "@shared/errors/AppError";

import { usersRoutes } from "./users.routes";

const router = Router();

router.get("/", (request, response) => {
  return response.status(200).send("Geladeira Solidária!");
});

router.use("/users", usersRoutes);

router.use((request: Request): void => {
  throw new AppError(`Rota ${request.originalUrl} não encontrada!`, 404, 7);
});

export { router };
