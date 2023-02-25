import { IUserResponseDTO } from "./IUserResponseDTO";

interface IUserBiometryResponseDTO {
  id: string;
  id_usuario: string;
  usuario?: IUserResponseDTO;
  codigo_biometria: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}

export { IUserBiometryResponseDTO };
