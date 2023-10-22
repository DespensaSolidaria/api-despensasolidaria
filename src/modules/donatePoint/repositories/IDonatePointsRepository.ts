import { ICreateDonatePointDTO } from "../dtos/ICreateDonatePointDTO";
import { DonatePoint } from "../infra/typeorm/entities/DonatePoint";

interface IDonatePointsRepository {
  create(data: ICreateDonatePointDTO): Promise<DonatePoint>;
  findByClientId(clientId: string): Promise<DonatePoint>;
  findById(id: string): Promise<DonatePoint>;
}

export { IDonatePointsRepository };
