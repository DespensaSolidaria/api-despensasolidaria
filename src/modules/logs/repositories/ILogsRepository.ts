import { ICreateLogDTO } from "../dtos/ICreateLogDTO";
import { Log } from "../infra/typeorm/entities/Log";

interface ILogsRepository {
  create(data: ICreateLogDTO): Promise<Log>;
  findById(id: string): Promise<Log>;
}

export { ILogsRepository };
