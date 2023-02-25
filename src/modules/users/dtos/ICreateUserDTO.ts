interface ICreateUserDTO {
  nome: string;
  nomePreferencial: string;
  cpfcnpj: string;
  dataNascimento: Date;
  email: string;
  senha: string;
  escopo?: string;
  nivel?: number;
  status?: number;
  id?: string;
}

export { ICreateUserDTO };
