import moment from "moment";
import { inject, injectable } from "tsyringe";
import { Between } from "typeorm";

import { IFindDonatePointsDTO } from "@modules/donatePoint/dtos/IFindDonatePointsDTO";
import { IFindDonatePointsWhereDTO } from "@modules/donatePoint/dtos/IFindDonatePointsWhereDTO";
import { DonatePoint } from "@modules/donatePoint/infra/typeorm/entities/DonatePoint";
import { IDonatePointsRepository } from "@modules/donatePoint/repositories/IDonatePointsRepository";

@injectable()
class FindDonatePointsUseCase {
  constructor(
    @inject("DonatePointsRepository")
    private donatePointsRepository: IDonatePointsRepository
  ) {}

  async execute({
    di,
    df,
    idPontoDoacao,
    tipoPontoDoacao,
    status,
  }: IFindDonatePointsDTO): Promise<DonatePoint[]> {
    let where: IFindDonatePointsWhereDTO = {};

    let dataInicial = "2020-03-03T00:00:00.000Z";
    let dataFinal = `${moment()
      .add(30, "days")
      .format("YYYY-MM-DD")}T23:59:59.000Z`;

    if (di) dataInicial = `${di}T00:00:00.000Z`;
    if (df) dataFinal = `${df}T23:59:59.000Z`;

    where = { ...where, criado_em: Between(dataInicial, dataFinal) };

    if (idPontoDoacao)
      where = {
        ...where,
        id: idPontoDoacao.trim(),
      };

    if (tipoPontoDoacao)
      where = {
        ...where,
        tipo_ponto_doacao: tipoPontoDoacao.toUpperCase(),
      };

    if (status)
      where = {
        ...where,
        status: parseFloat(status),
      };

    const donatePoints = await this.donatePointsRepository.findAll(where);

    return donatePoints;
  }
}

export { FindDonatePointsUseCase };
