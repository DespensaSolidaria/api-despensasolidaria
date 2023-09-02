import { Router } from "express";

import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { GetLoggedUserController } from "@modules/users/useCases/getLoggedUser/GetLoggedUserController";

// import { ensureAdmin } from "../middlewares/ensureAdmin";
// import { ensureApp } from "../middlewares/ensureApp";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
// import { ensureBackoffice } from "../middlewares/ensureBackoffice";

const usersRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const getLoggedUserController = new GetLoggedUserController();
const createUserController = new CreateUserController();

usersRoutes.get("/logged", ensureAuthenticated, getLoggedUserController.handle);

usersRoutes.post("/auth", authenticateUserController.handle);
usersRoutes.post("/create", ensureAuthenticated, createUserController.handle);

export { usersRoutes };
