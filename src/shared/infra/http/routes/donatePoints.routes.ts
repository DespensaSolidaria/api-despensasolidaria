import { Router } from "express";

import { AuthenticateDonatePointController } from "@modules/donatePoint/useCases/authenticateDonatePoint/AuthenticateDonatePointController";
import { CreateDonatePointController } from "@modules/donatePoint/useCases/createDonatePoint/CreateDonatePointController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const donatePointsRoutes = Router();

const authenticateDonatePointController = new AuthenticateDonatePointController();
const createDonatePointController = new CreateDonatePointController();

donatePointsRoutes.post("/auth", authenticateDonatePointController.handle);
donatePointsRoutes.post(
  "/create",
  ensureAuthenticated,
  ensureAdmin,
  createDonatePointController.handle
);

export { donatePointsRoutes };
