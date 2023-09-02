interface IUserResponseDTO {
  id: string;
  nome: string;
  nome_preferencial: string;
  documento: string;
  data_nascimento: Date;
  email: string;
  senha: string;
  escopo: string;
  nivel: number;
  status: number;
  criado_em: Date;
  atualizado_em: Date;
}

export { IUserResponseDTO };
