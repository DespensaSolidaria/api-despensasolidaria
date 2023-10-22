import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      nome_preferencial,
      documento,
      data_nascimento,
      email,
      senha,
      nivel,
    } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      nome,
      nomePreferencial: nome_preferencial,
      documento,
      dataNascimento: data_nascimento,
      email,
      senha,
      nivel,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
