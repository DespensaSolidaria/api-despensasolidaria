import { inject, injectable } from "tsyringe";

import { IDonatePointsRepository } from "@modules/donatePoint/repositories/IDonatePointsRepository";
import { ICreateUserBiometryDTO } from "@modules/users/dtos/ICreateUserBiometryDTO";
import { IUsersBiometricsRepository } from "@modules/users/repositories/IUsersBiometricsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserBiometryUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersBiometricsRepository")
    private usersBiometricsRepository: IUsersBiometricsRepository,
    @inject("DonatePointsRepository")
    private donatePointsRepository: IDonatePointsRepository
  ) {}

  async execute({
    idUsuario,
    idPontoDoacao,
    codigoBiometria,
  }: ICreateUserBiometryDTO): Promise<void> {
    const user = await this.usersRepository.findById(idUsuario);

    if (!user) throw new AppError("Usuário não encontrado", 404, 14);

    const donatePoint = await this.donatePointsRepository.findById(
      idPontoDoacao
    );

    if (!donatePoint)
      throw new AppError("Ponto de doação não encontrado", 404, 15);

    await this.usersBiometricsRepository.create({
      idUsuario,
      idPontoDoacao,
      codigoBiometria,
      status: 1,
    });
  }
}

export { CreateUserBiometryUseCase };
