import { ICreateLogDTO } from "../dtos/ICreateLogDTO";
import { IListLogsWhereDTO } from "../dtos/IListLogsWhereDTO";
import { Log } from "../infra/typeorm/entities/Log";

interface ILogsRepository {
  create(data: ICreateLogDTO): Promise<Log>;
  findById(id: string): Promise<Log>;
  findAll(where: IListLogsWhereDTO): Promise<Log[]>;
}

export { ILogsRepository };
