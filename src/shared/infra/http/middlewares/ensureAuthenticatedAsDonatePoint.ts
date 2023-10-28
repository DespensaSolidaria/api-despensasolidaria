import { NextFunction, Request, Response } from "express";

import { DonatePointsRepository } from "@modules/donatePoint/infra/typeorm/repositories/DonatePointsRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAuthenticatedAsDonatePoint(
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
    const donatePointsRepository = new DonatePointsRepository();
    const donatePoint = await donatePointsRepository.findByTokenAcesso(token);

    if (donatePoint.status !== 1)
      throw new AppError("Ponto de doação bloqueado!", 401, 6);

    request.user = donatePoint;

    next();
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError("O token informado é inválido ou foi expirado!", 401, 2);
  }
}
