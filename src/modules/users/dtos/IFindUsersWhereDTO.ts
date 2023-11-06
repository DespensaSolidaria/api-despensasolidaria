import { FindOperator } from "typeorm";

interface IFindUsersWhereDTO {
  id?: string;
  criado_em?: FindOperator<string>;
  nome?: FindOperator<string>;
  documento?: string;
  email?: FindOperator<string>;
  status?: number;
  nivel?: number;
}

export { IFindUsersWhereDTO };
