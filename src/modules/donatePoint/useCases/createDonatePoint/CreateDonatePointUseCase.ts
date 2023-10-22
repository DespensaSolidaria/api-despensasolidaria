import { hash } from "bcrypt";
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

    const clientId = uuidV4();
    const clientSecret = uuidV4();

    const clientSecretHash = await hash(clientSecret, 8);

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
      clientId,
      clientSecret: clientSecretHash,
    });

    return {
      id: createdDonatePoint.id,
      client_id: clientId,
      client_secret: clientSecret,
    };
  }
}

export { CreateDonatePointUseCase };
