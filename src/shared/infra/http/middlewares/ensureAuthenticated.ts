import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token de autenticação não informado!", 401, 3);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: id } = verify(token, auth.secret_token) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    if (user.status !== 1) throw new AppError("Usuário bloqueado!", 401, 6);

    const userData = {
      ...user,
      token,
    };

    request.user = {
      ...userData,
      id: userData.id.toString(),
    };

    next();
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError("O token informado é inválido ou foi expirado!", 401, 2);
  }
}
