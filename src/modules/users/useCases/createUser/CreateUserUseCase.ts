import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { filterString } from "@utils/filterString";
import { formatDocument, formatEmail } from "@utils/formatters";
import { validateDate } from "@utils/validateDate";
import { validateCNPJ, validateCPF } from "@utils/validateDocument";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    nome,
    nomePreferencial,
    documento,
    dataNascimento,
    email,
    senha,
    nivel,
  }: ICreateUserDTO): Promise<void> {
    const formattedDocument = formatDocument(documento);
    const validatedDocument =
      formattedDocument.length <= 11
        ? validateCPF(formattedDocument)
        : validateCNPJ(formattedDocument);

    if (!validatedDocument)
      throw new AppError(
        "O número do documento informado é inválido!",
        422,
        10
      );

    const birthDateValid = validateDate(dataNascimento);

    if (!birthDateValid)
      throw new AppError("A data de nascimento informada é inválida!", 422, 11);

    const formattedEmail = formatEmail(email);

    const userAlreadyExists = await this.usersRepository.findByEmail(
      formattedEmail
    );

    if (userAlreadyExists) {
      throw new AppError(
        "E-mail informado já utilizado anteriormente!",
        409,
        11
      );
    }

    if ((nivel === 1 || nivel === 2) && !senha)
      throw new AppError(
        "Uma senha deve ser informada para o usuário!",
        422,
        13
      );

    let passwordHash: string;

    if (nivel !== 1 && nivel !== 2) passwordHash = null;
    else passwordHash = await hash(senha, 8);

    await this.usersRepository.create({
      nome: filterString(nome),
      nomePreferencial: filterString(nomePreferencial),
      documento: formattedDocument,
      dataNascimento,
      email: formattedEmail,
      senha: passwordHash,
      nivel,
      status: 1,
    });
  }
}

export { CreateUserUseCase };
