import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUserResponseDTO } from "@modules/users/dtos/IUserResponseDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    nome,
    nomePreferencial,
    documento,
    dataNascimento,
    email,
    senha,
    escopo,
    nivel,
    status,
  }: ICreateUserDTO): Promise<IUserResponseDTO> {
    const user = this.repository.create({
      nome,
      nome_preferencial: nomePreferencial,
      documento,
      data_nascimento: dataNascimento,
      email,
      senha,
      escopo,
      nivel,
      status,
    });

    await this.repository.save(user);

    return user;
  }

  async updateUserStatus(userId: string, newStatus: number): Promise<void> {
    await this.repository.update({ id: userId }, { status: newStatus });
  }

  async updateUserLevel(userId: string, newLevel: number): Promise<void> {
    await this.repository.update({ id: userId }, { status: newLevel });
  }

  async findByEmail(email: string): Promise<IUserResponseDTO> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findByEmailAndScope(
    email: string,
    scope: string
  ): Promise<IUserResponseDTO> {
    const user = await this.repository.findOne({ email, escopo: scope });
    return user;
  }

  async findByDocument(documento: string): Promise<IUserResponseDTO> {
    const user = await this.repository.findOne({ documento });
    return user;
  }

  async findById(id: string): Promise<IUserResponseDTO> {
    const user = await this.repository.findOne(id);
    return user;
  }
}

export { UsersRepository };
