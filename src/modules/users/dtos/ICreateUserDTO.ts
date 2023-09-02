interface ICreateUserDTO {
  nome: string;
  nomePreferencial: string;
  documento: string;
  dataNascimento: string;
  email: string;
  senha: string;
  escopo?: string;
  nivel?: number;
  status?: number;
  id?: string;
}

export { ICreateUserDTO };
