interface ICreateDonatePointDTO {
  tipoPontoDoacao: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  referenciaEndereco: string;
  descricao: string;
  tokenAcesso?: string;
}

export { ICreateDonatePointDTO };
