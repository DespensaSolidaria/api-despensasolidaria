import moment from "moment";
import { inject, injectable } from "tsyringe";
import { Between } from "typeorm";

import { IFindLogsDTO } from "@modules/logs/dtos/IFindLogsDTO";
import { IListLogsWhereDTO } from "@modules/logs/dtos/IListLogsWhereDTO";
import { Log } from "@modules/logs/infra/typeorm/entities/Log";
import { ILogsRepository } from "@modules/logs/repositories/ILogsRepository";

@injectable()
class FindLogsUseCase {
  constructor(
    @inject("LogsRepository")
    private logsRepository: ILogsRepository
  ) {}

  async execute({
    di,
    df,
    idUsuario,
    idPontoDoacao,
    tipoLog,
  }: IFindLogsDTO): Promise<Log[]> {
    let where: IListLogsWhereDTO = {};

    let dataInicial = "2020-03-03T00:00:00.000Z";
    let dataFinal = `${moment()
      .add(30, "days")
      .format("YYYY-MM-DD")}T23:59:59.000Z`;

    if (di) dataInicial = `${di}T00:00:00.000Z`;
    if (df) dataFinal = `${df}T23:59:59.000Z`;

    where = { ...where, criado_em: Between(dataInicial, dataFinal) };

    if (idUsuario)
      where = {
        ...where,
        id_usuario: idUsuario.trim(),
      };

    if (idPontoDoacao)
      where = {
        ...where,
        id_ponto_doacao: idPontoDoacao.trim(),
      };

    if (tipoLog)
      where = {
        ...where,
        tipo_log: tipoLog.trim(),
      };

    const gottenLogs = await this.logsRepository.findAll(where);

    return gottenLogs;
  }
}

export { FindLogsUseCase };
