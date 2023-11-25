interface ICreateUserDTO {
  nome: string;
  nomePreferencial: string;
  documento: string;
  dataNascimento: string;
  email: string;
  senha: string;
  nivel?: number;
  status?: number;
  id?: string;
}

export { ICreateUserDTO };
