import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<IUserResponseDTO>;
  updateUserStatus(userId: string, newStatus: number): Promise<void>;
  updateUserLevel(userId: string, newLevel: number): Promise<void>;
  findByEmail(email: string): Promise<IUserResponseDTO>;
  findByEmailAndScope(email: string, scope: string): Promise<IUserResponseDTO>;
  findByDocument(cpfcnpj: string): Promise<IUserResponseDTO>;
  findById(id: string): Promise<IUserResponseDTO>;
}

export { IUsersRepository };
