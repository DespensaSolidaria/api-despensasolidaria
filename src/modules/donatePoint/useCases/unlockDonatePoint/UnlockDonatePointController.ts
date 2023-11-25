import { Request, Response } from "express";
import { container } from "tsyringe";

import { UnlockDonatePointUseCase } from "./UnlockDonatePointUseCase";

class UnlockDonatePointController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { codigoBiometria } = request.params;

    const unlockDonatePointUseCase = container.resolve(
      UnlockDonatePointUseCase
    );

    await unlockDonatePointUseCase.execute(codigoBiometria, request.user.id);

    return response.status(204).send();
  }
}

export { UnlockDonatePointController };
