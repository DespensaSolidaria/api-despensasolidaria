import { FindOperator } from "typeorm";

interface IFindDonatePointsWhereDTO {
  id?: string;
  criado_em?: FindOperator<string>;
  tipo_ponto_doacao?: string;
  status?: number;
}

export { IFindDonatePointsWhereDTO };
