import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IDonatePointsRepository } from "@modules/donatePoint/repositories/IDonatePointsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  clientId: string;
  clientSecret: string;
}

interface IResponse {
  token: string;
  expires_in: number;
}

@injectable()
class AuthenticateDonatePointUseCase {
  constructor(
    @inject("DonatePointsRepository")
    private donatePointsRepository: IDonatePointsRepository
  ) {}

  async execute({ clientId, clientSecret }: IRequest): Promise<IResponse> {
    const { expires_in_token, secret_token } = auth;

    const donatePoint = await this.donatePointsRepository.findByClientId(
      clientId
    );

    if (!donatePoint)
      throw new AppError("client_id e/ou client_secret incorretos!", 401, 2);

    const passwordMatch = await compare(
      clientSecret,
      donatePoint.client_secret
    );

    if (!passwordMatch)
      throw new AppError("client_id e/ou client_secret incorretos!", 401, 2);

    const token = sign({}, secret_token, {
      subject: donatePoint.id,
      expiresIn: expires_in_token,
    });

    const tokenReturn: IResponse = {
      token,
      expires_in: expires_in_token,
    };

    return tokenReturn;
  }
}

export { AuthenticateDonatePointUseCase };
