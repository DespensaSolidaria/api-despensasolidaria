import { ICreateDonatePointDTO } from "../dtos/ICreateDonatePointDTO";
import { IFindDonatePointsWhereDTO } from "../dtos/IFindDonatePointsWhereDTO";
import { DonatePoint } from "../infra/typeorm/entities/DonatePoint";

interface IDonatePointsRepository {
  create(data: ICreateDonatePointDTO): Promise<DonatePoint>;
  findByTokenAcesso(tokenAcesso: string): Promise<DonatePoint>;
  findById(id: string): Promise<DonatePoint>;
  findByIdWithRelations(id: string): Promise<DonatePoint>;
  findAll(where: IFindDonatePointsWhereDTO): Promise<DonatePoint[]>;
}

export { IDonatePointsRepository };
