interface IUserResponseDTO {
  id: string;
  nome: string;
  nome_preferencial: string;
  cpfcnpj: string;
  data_nascimento: Date;
  email: string;
  senha: string;
  escopo: string;
  nivel: number;
  status: number;
  created_at: Date;
  updated_at: Date;
}

export { IUserResponseDTO };
