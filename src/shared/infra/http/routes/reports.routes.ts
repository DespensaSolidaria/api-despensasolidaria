import { Router } from "express";

import { FindDonatePointsController } from "@modules/donatePoint/useCases/findDonatePoints/FindDonatePointsController";
import { FindLogsController } from "@modules/logs/useCases/findLogs/FindLogsController";
import { FindUsersController } from "@modules/users/useCases/findUsers/FindUsersController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const reportsRoutes = Router();

const findLogsController = new FindLogsController();
const findUsersController = new FindUsersController();
const findDonatePointsController = new FindDonatePointsController();

reportsRoutes.get("/logs", ensureAuthenticated, findLogsController.handle);
reportsRoutes.get("/users", ensureAuthenticated, findUsersController.handle);
reportsRoutes.get(
  "/donate-points",
  ensureAuthenticated,
  findDonatePointsController.handle
);

export { reportsRoutes };
