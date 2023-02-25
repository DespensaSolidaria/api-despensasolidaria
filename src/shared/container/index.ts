import { container } from "tsyringe";

import "@shared/container/providers";
import { UsersBiometricsRepository } from "@modules/users/infra/typeorm/repositories/UsersBiometricsRepository";
import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { IUsersBiometricsRepository } from "@modules/users/repositories/IUsersBiometricsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUsersBiometricsRepository>(
  "UsersBiometricsRepository",
  UsersBiometricsRepository
);
