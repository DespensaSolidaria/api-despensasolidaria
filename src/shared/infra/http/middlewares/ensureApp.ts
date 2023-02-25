import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureApp(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (user.escopo !== "APP") {
    throw new AppError("Operação não permitida!", 403, 1);
  }

  return next();
}
