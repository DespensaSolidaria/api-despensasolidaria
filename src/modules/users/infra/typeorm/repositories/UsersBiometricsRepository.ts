import { getRepository, Repository } from "typeorm";

import { ICreateUserBiometryDTO } from "@modules/users/dtos/ICreateUserBiometryDTO";
import { IUserBiometryResponseDTO } from "@modules/users/dtos/IUserBiometryResponseDTO";
import { IUsersBiometricsRepository } from "@modules/users/repositories/IUsersBiometricsRepository";

import { UserBiometry } from "../entities/UserBiometry";

class UsersBiometricsRepository implements IUsersBiometricsRepository {
  private repository: Repository<UserBiometry>;

  constructor() {
    this.repository = getRepository(UserBiometry);
  }

  async create({
    idUsuario,
    idPontoDoacao,
    codigoBiometria,
    status,
  }: ICreateUserBiometryDTO): Promise<IUserBiometryResponseDTO> {
    const userBiometry = this.repository.create({
      id_usuario: idUsuario,
      id_ponto_doacao: idPontoDoacao,
      codigo_biometria: codigoBiometria,
      status,
    });

    await this.repository.save(userBiometry);

    return userBiometry;
  }

  async updateUserBiometryStatus(
    biometryId: string,
    newStatus: number
  ): Promise<void> {
    await this.repository.update({ id: biometryId }, { status: newStatus });
  }

  async findByUserId(userId: string): Promise<IUserBiometryResponseDTO[]> {
    const userBiometrics = await this.repository.find({ id_usuario: userId });
    return userBiometrics;
  }

  async findById(id: string): Promise<IUserBiometryResponseDTO> {
    const userBiometry = await this.repository.findOne(id);
    return userBiometry;
  }

  async findByDonatePointIdAndBiometryCode(
    donatePointId: string,
    biometryCode: string
  ): Promise<IUserBiometryResponseDTO> {
    const userBiometry = await this.repository.findOne({
      id_ponto_doacao: donatePointId,
      codigo_biometria: biometryCode,
    });
    return userBiometry;
  }
}

export { UsersBiometricsRepository };
