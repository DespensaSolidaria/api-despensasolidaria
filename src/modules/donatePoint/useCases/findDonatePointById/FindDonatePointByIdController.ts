import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindDonatePointByIdUseCase } from "./FindDonatePointByIdUseCase";

class FindDonatePointByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { idPontoDoacao } = request.params;

    const findDonatePointByIdUseCase = container.resolve(
      FindDonatePointByIdUseCase
    );

    const gottenDonatePoint = await findDonatePointByIdUseCase.execute(
      idPontoDoacao
    );

    return response.status(200).json(gottenDonatePoint);
  }
}

export { FindDonatePointByIdController };
