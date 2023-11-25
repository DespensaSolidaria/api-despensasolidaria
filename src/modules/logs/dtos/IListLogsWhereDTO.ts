import { FindOperator } from "typeorm";

interface IListLogsWhereDTO {
  id?: string;
  criado_em?: FindOperator<string>;
  id_usuario?: string;
  id_ponto_doacao?: string;
  tipo_log?: string;
}

export { IListLogsWhereDTO };
