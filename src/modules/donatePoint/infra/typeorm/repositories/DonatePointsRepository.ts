import { getRepository, Repository } from "typeorm";

import { ICreateDonatePointDTO } from "@modules/donatePoint/dtos/ICreateDonatePointDTO";
import { IDonatePointsRepository } from "@modules/donatePoint/repositories/IDonatePointsRepository";

import { DonatePoint } from "../entities/DonatePoint";

class DonatePointsRepository implements IDonatePointsRepository {
  private repository: Repository<DonatePoint>;

  constructor() {
    this.repository = getRepository(DonatePoint);
  }

  async create({
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
    clientId,
    clientSecret,
  }: ICreateDonatePointDTO): Promise<DonatePoint> {
    const donatePoint = this.repository.create({
      tipo_ponto_doacao: tipoPontoDoacao,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
      referencia_endereco: referenciaEndereco,
      descricao,
      client_id: clientId,
      client_secret: clientSecret,
    });

    await this.repository.save(donatePoint);

    return donatePoint;
  }

  async findByClientId(clientId: string): Promise<DonatePoint> {
    const donatePoint = await this.repository.findOne({ client_id: clientId });
    return donatePoint;
  }

  async findById(id: string): Promise<DonatePoint> {
    const donatePoint = await this.repository.findOne(id);
    return donatePoint;
  }
}

export { DonatePointsRepository };
