import moment from "moment";
import { inject, injectable } from "tsyringe";
import { Between, Like } from "typeorm";

import { IFindUsersDTO } from "@modules/users/dtos/IFindUsersDTO";
import { IFindUsersWhereDTO } from "@modules/users/dtos/IFindUsersWhereDTO";
import { IUserResponseDTO } from "@modules/users/dtos/IUserResponseDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { formatDocument } from "@utils/formatters";

@injectable()
class FindUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    di,
    df,
    idUsuario,
    nome,
    documento,
    email,
    status,
    nivel,
  }: IFindUsersDTO): Promise<IUserResponseDTO[]> {
    let where: IFindUsersWhereDTO = {};

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
        id: idUsuario.trim(),
      };

    if (nome)
      where = {
        ...where,
        nome: Like(`%${nome.toLowerCase().trim()}%`),
      };

    if (documento) {
      const formattedDocument = formatDocument(documento);
      where = {
        ...where,
        documento: formattedDocument,
      };
    }

    if (email)
      where = {
        ...where,
        email: Like(`%${email.toLowerCase().trim()}%`),
      };

    if (status)
      where = {
        ...where,
        status: parseFloat(status),
      };

    if (nivel)
      where = {
        ...where,
        nivel: parseFloat(nivel),
      };

    const gottenUsers = await this.usersRepository.findAll(where);

    const formattedGottenUsers = [];

    gottenUsers.forEach((user) => {
      const formattedUser = user;
      delete formattedUser.senha;
      formattedGottenUsers.push(formattedUser);
    });

    return formattedGottenUsers;
  }
}

export { FindUsersUseCase };
