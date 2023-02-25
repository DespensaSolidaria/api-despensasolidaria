import { Router } from "express";

import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController";
import { GetLoggedUserController } from "@modules/users/useCases/getLoggedUser/GetLoggedUserController";

// import { ensureAdmin } from "../middlewares/ensureAdmin";
// import { ensureApp } from "../middlewares/ensureApp";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
// import { ensureBackoffice } from "../middlewares/ensureBackoffice";

const usersRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const getLoggedUserController = new GetLoggedUserController();

usersRoutes.post("/auth", authenticateUserController.handle);
usersRoutes.get("/logged", ensureAuthenticated, getLoggedUserController.handle);

export { usersRoutes };
