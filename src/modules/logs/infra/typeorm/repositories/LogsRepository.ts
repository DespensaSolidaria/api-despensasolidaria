import { getRepository, Repository } from "typeorm";

import { ICreateLogDTO } from "@modules/logs/dtos/ICreateLogDTO";
import { IListLogsWhereDTO } from "@modules/logs/dtos/IListLogsWhereDTO";
import { ILogsRepository } from "@modules/logs/repositories/ILogsRepository";

import { Log } from "../entities/Log";

class LogsRepository implements ILogsRepository {
  private repository: Repository<Log>;

  constructor() {
    this.repository = getRepository(Log);
  }

  async create({
    idUsuario,
    idPontoDoacao,
    tipoLog,
    descricao,
  }: ICreateLogDTO): Promise<Log> {
    const log = this.repository.create({
      id_usuario: idUsuario,
      id_ponto_doacao: idPontoDoacao,
      tipo_log: tipoLog,
      descricao,
    });

    await this.repository.save(log);

    return log;
  }

  async findById(id: string): Promise<Log> {
    const log = await this.repository.findOne(id);
    return log;
  }

  async findAll(where: IListLogsWhereDTO): Promise<Log[]> {
    const logs = await this.repository.find({
      relations: ["usuario", "ponto_doacao"],
      where,
      order: {
        criado_em: "DESC",
      },
    });
    return logs;
  }
}

export { LogsRepository };
