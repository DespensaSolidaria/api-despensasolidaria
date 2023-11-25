import { inject, injectable } from "tsyringe";

import { IDonatePointsRepository } from "@modules/donatePoint/repositories/IDonatePointsRepository";
import { ILogsRepository } from "@modules/logs/repositories/ILogsRepository";
import { IUsersBiometricsRepository } from "@modules/users/repositories/IUsersBiometricsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UnlockDonatePointUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersBiometricsRepository")
    private usersBiometricsRepository: IUsersBiometricsRepository,
    @inject("DonatePointsRepository")
    private donatePointsRepository: IDonatePointsRepository,
    @inject("LogsRepository")
    private logsRepository: ILogsRepository
  ) {}

  async execute(codigoBiometria: string, donatePointId: string): Promise<void> {
    const pontoDoacao = await this.donatePointsRepository.findById(
      donatePointId
    );

    const biometria = await this.usersBiometricsRepository.findByDonatePointIdAndBiometryCode(
      pontoDoacao.id,
      codigoBiometria
    );

    if (!biometria) throw new AppError("Usuário não encontrado!", 404, 14);

    const usuario = await this.usersRepository.findById(biometria.id_usuario);

    if (usuario.status !== 1) throw new AppError("Usuário bloqueado!", 401, 6);

    await this.logsRepository.create({
      idUsuario: usuario.id,
      idPontoDoacao: pontoDoacao.id,
      tipoLog: "ABERTURA_PONTO_DOACAO",
      descricao: `Usuário ${usuario.nome} abriu o ponto de doacao de ID ${pontoDoacao.id}.`,
    });
  }
}

export { UnlockDonatePointUseCase };
