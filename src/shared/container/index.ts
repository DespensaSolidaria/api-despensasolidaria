import { container } from "tsyringe";

import "@shared/container/providers";
import { DonatePointsRepository } from "@modules/donatePoint/infra/typeorm/repositories/DonatePointsRepository";
import { IDonatePointsRepository } from "@modules/donatePoint/repositories/IDonatePointsRepository";
import { LogsRepository } from "@modules/logs/infra/typeorm/repositories/LogsRepository";
import { ILogsRepository } from "@modules/logs/repositories/ILogsRepository";
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

container.registerSingleton<IDonatePointsRepository>(
  "DonatePointsRepository",
  DonatePointsRepository
);

container.registerSingleton<ILogsRepository>("LogsRepository", LogsRepository);
