import { Router, Request } from "express";

import { AppError } from "@shared/errors/AppError";

import { donatePointsRoutes } from "./donatePoints.routes";
import { reportsRoutes } from "./reports.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.get("/", (request, response) => {
  return response.status(200).send("Geladeira Solidária!");
});

router.use("/users", usersRoutes);
router.use("/donate-point", donatePointsRoutes);
router.use("/reports", reportsRoutes);

router.use((request: Request): void => {
  throw new AppError(`Rota ${request.originalUrl} não encontrada!`, 404, 7);
});

export { router };
