import { Router } from "express";

import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { CreateUserBiometryController } from "@modules/users/useCases/createUserBiometry/CreateUserBiometryController";
import { GetLoggedUserController } from "@modules/users/useCases/getLoggedUser/GetLoggedUserController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const getLoggedUserController = new GetLoggedUserController();
const createUserController = new CreateUserController();
const createUserBiometryController = new CreateUserBiometryController();

usersRoutes.get("/logged", ensureAuthenticated, getLoggedUserController.handle);

usersRoutes.post("/auth", authenticateUserController.handle);
usersRoutes.post(
  "/create",
  ensureAuthenticated,
  ensureAdmin,
  createUserController.handle
);
usersRoutes.post(
  "/:idUsuario/donate-point/:idPontoDoacao",
  ensureAuthenticated,
  createUserBiometryController.handle
);

export { usersRoutes };
