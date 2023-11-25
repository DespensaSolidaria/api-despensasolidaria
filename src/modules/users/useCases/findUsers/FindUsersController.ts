import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindUsersUseCase } from "./FindUsersUseCase";

class FindUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      di,
      df,
      idUsuario,
      nome,
      documento,
      email,
      status,
      nivel,
    } = request.query;

    const findUsersUseCase = container.resolve(FindUsersUseCase);

    const gottenUsers = await findUsersUseCase.execute({
      di: di ? di.toString() : null,
      df: df ? df.toString() : null,
      idUsuario: idUsuario ? idUsuario.toString() : null,
      nome: nome ? nome.toString() : null,
      documento: documento ? documento.toString() : null,
      email: email ? email.toString() : null,
      status: status ? status.toString() : null,
      nivel: nivel ? nivel.toString() : null,
    });

    return response.status(200).json(gottenUsers);
  }
}

export { FindUsersController };
