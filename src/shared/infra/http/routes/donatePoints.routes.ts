import { Router } from "express";

import { CreateDonatePointController } from "@modules/donatePoint/useCases/createDonatePoint/CreateDonatePointController";
import { UnlockDonatePointController } from "@modules/donatePoint/useCases/unlockDonatePoint/UnlockDonatePointController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAuthenticatedAsDonatePoint } from "../middlewares/ensureAuthenticatedAsDonatePoint";

const donatePointsRoutes = Router();

const createDonatePointController = new CreateDonatePointController();
const unlockDonatePointController = new UnlockDonatePointController();

donatePointsRoutes.post(
  "/create",
  ensureAuthenticated,
  ensureAdmin,
  createDonatePointController.handle
);

donatePointsRoutes.put(
  "/unlock/:codigoBiometria",
  ensureAuthenticatedAsDonatePoint,
  unlockDonatePointController.handle
);

export { donatePointsRoutes };
