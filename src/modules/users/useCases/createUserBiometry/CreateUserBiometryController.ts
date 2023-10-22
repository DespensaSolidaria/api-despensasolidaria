import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserBiometryUseCase } from "./CreateUserBiometryUseCase";

class CreateUserBiometryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { idUsuario, idPontoDoacao } = request.params;
    const { codigo_biometria } = request.body;

    const createUserBiometryUseCase = container.resolve(
      CreateUserBiometryUseCase
    );

    await createUserBiometryUseCase.execute({
      idUsuario,
      idPontoDoacao,
      codigoBiometria: codigo_biometria,
    });

    return response.status(201).send();
  }
}

export { CreateUserBiometryController };
