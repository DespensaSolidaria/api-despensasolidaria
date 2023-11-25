import { Request, Response } from "express";

import { IUserResponseDTO } from "@modules/users/dtos/IUserResponseDTO";

class GetLoggedUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = request.user as IUserResponseDTO;
    return response.status(200).json({
      ...user,
      senha: undefined,
      token: undefined,
    });
  }
}

export { GetLoggedUserController };
