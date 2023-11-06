import { inject, injectable } from "tsyringe";

import { DonatePoint } from "@modules/donatePoint/infra/typeorm/entities/DonatePoint";
import { IDonatePointsRepository } from "@modules/donatePoint/repositories/IDonatePointsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class FindDonatePointByIdUseCase {
  constructor(
    @inject("DonatePointsRepository")
    private donatePointsRepository: IDonatePointsRepository
  ) {}

  async execute(idPontoDoacao: string): Promise<DonatePoint> {
    const donatePoint = await this.donatePointsRepository.findByIdWithRelations(
      idPontoDoacao
    );

    if (!donatePoint)
      throw new AppError("Ponto de doação não encontrado", 404, 15);

    return donatePoint;
  }
}

export { FindDonatePointByIdUseCase };
