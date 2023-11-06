import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindDonatePointsUseCase } from "./FindDonatePointsUseCase";

class FindDonatePointsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { di, df, idPontoDoacao, tipoPontoDoacao, status } = request.query;

    const findUsersUseCase = container.resolve(FindDonatePointsUseCase);

    const gottenDonatePoints = await findUsersUseCase.execute({
      di: di ? di.toString() : null,
      df: df ? df.toString() : null,
      idPontoDoacao: idPontoDoacao ? idPontoDoacao.toString() : null,
      tipoPontoDoacao: tipoPontoDoacao ? tipoPontoDoacao.toString() : null,
      status: status ? status.toString() : null,
    });

    return response.status(200).json(gottenDonatePoints);
  }
}

export { FindDonatePointsController };
