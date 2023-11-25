import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateDonatePointUseCase } from "./CreateDonatePointUseCase";

class CreateDonatePointController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      tipo_ponto_doacao,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
      referencia_endereco,
      descricao,
    } = request.body;

    const createDonatePointUseCase = container.resolve(
      CreateDonatePointUseCase
    );

    const createdDonatePoint = await createDonatePointUseCase.execute({
      tipoPontoDoacao: tipo_ponto_doacao,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
      referenciaEndereco: referencia_endereco,
      descricao,
    });

    return response.status(201).json(createdDonatePoint);
  }
}

export { CreateDonatePointController };
