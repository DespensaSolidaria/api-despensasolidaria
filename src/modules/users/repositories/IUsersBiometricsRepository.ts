import { ICreateUserBiometryDTO } from "../dtos/ICreateUserBiometryDTO";
import { IUserBiometryResponseDTO } from "../dtos/IUserBiometryResponseDTO";

interface IUsersBiometricsRepository {
  create(data: ICreateUserBiometryDTO): Promise<IUserBiometryResponseDTO>;
  updateUserBiometryStatus(
    biometryId: string,
    newStatus: number
  ): Promise<void>;
  findByUserId(userId: string): Promise<IUserBiometryResponseDTO[]>;
  findById(id: string): Promise<IUserBiometryResponseDTO>;
}

export { IUsersBiometricsRepository };
