import { DonatePoint } from "@modules/donatePoint/infra/typeorm/entities/DonatePoint";

import { IUserResponseDTO } from "./IUserResponseDTO";

interface IUserBiometryResponseDTO {
  id: string;
  id_usuario: string;
  id_ponto_doacao: string;
  usuario?: IUserResponseDTO;
  ponto_doacao?: DonatePoint;
  codigo_biometria: string;
  status: number;
  criado_em: Date;
  atualizado_em: Date;
}

export { IUserBiometryResponseDTO };
