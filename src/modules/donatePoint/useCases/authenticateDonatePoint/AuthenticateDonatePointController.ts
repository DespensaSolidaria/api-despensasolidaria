import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateDonatePointUseCase } from "./AuthenticateDonatePointUseCase";

class AuthenticateDonatePointController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { client_id, client_secret } = request.body;

    const authenticateUserUseCase = container.resolve(
      AuthenticateDonatePointUseCase
    );

    const token = await authenticateUserUseCase.execute({
      clientId: client_id,
      clientSecret: client_secret,
    });

    return response.status(200).json(token);
  }
}

export { AuthenticateDonatePointController };
