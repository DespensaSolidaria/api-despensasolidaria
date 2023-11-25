import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindLogsUseCase } from "./FindLogsUseCase";

class FindLogsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { di, df, idUsuario, idPontoDoacao, tipoLog } = request.query;

    const findLogsUseCase = container.resolve(FindLogsUseCase);

    const gottenLogs = await findLogsUseCase.execute({
      di: di ? di.toString() : null,
      df: df ? df.toString() : null,
      idUsuario: idUsuario ? idUsuario.toString() : null,
      idPontoDoacao: idPontoDoacao ? idPontoDoacao.toString() : null,
      tipoLog: tipoLog ? tipoLog.toString() : null,
    });

    return response.status(200).json(gottenLogs);
  }
}

export { FindLogsController };
