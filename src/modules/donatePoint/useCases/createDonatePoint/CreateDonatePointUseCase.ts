import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { ICreateDonatePointDTO } from "@modules/donatePoint/dtos/ICreateDonatePointDTO";
import { ICreateDonatePointResponseDTO } from "@modules/donatePoint/dtos/ICreateDonatePointResponseDTO";
import { IDonatePointsRepository } from "@modules/donatePoint/repositories/IDonatePointsRepository";
import { AppError } from "@shared/errors/AppError";
import { filterString } from "@utils/filterString";
import { formatCEP } from "@utils/formatters";

@injectable()
class CreateDonatePointUseCase {
  constructor(
    @inject("DonatePointsRepository")
    private donatePointsRepository: IDonatePointsRepository
  ) {}

  async execute({
    tipoPontoDoacao,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    uf,
    cep,
    referenciaEndereco,
    descricao,
  }: ICreateDonatePointDTO): Promise<ICreateDonatePointResponseDTO> {
    const formattedTipoPontoDoacao = tipoPontoDoacao.toUpperCase().trim();

    if (formattedTipoPontoDoacao !== "G" && formattedTipoPontoDoacao !== "Q")
      throw new AppError("Tipo de ponto de doação inválido!", 422, 12);

    const tokenAcesso = uuidV4();

    const createdDonatePoint = await this.donatePointsRepository.create({
      tipoPontoDoacao: formattedTipoPontoDoacao,
      logradouro: filterString(logradouro),
      numero,
      complemento: complemento ? filterString(complemento) : null,
      bairro: filterString(bairro),
      cidade: filterString(cidade),
      uf: filterString(uf),
      cep: formatCEP(cep),
      referenciaEndereco: referenciaEndereco
        ? filterString(referenciaEndereco)
        : null,
      descricao: descricao.trim(),
      tokenAcesso,
    });

    return {
      id: createdDonatePoint.id,
      token_acesso: tokenAcesso,
    };
  }
}

export { CreateDonatePointUseCase };
