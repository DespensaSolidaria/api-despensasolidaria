import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { formatEmail } from "@utils/formatters";
import { validateEmail } from "@utils/validateEmail";

interface IRequest {
  email: string;
  senha: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  expires_in: number;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, senha }: IRequest): Promise<IResponse> {
    const { expires_in_token, secret_token } = auth;

    const formattedEmail = formatEmail(email);

    if (!validateEmail(formattedEmail))
      throw new AppError("E-mail e/ou senha incorretos!", 401, 2);

    const user = await this.usersRepository.findByEmail(formattedEmail);

    if (!user) throw new AppError("E-mail e/ou senha incorretos!", 401, 2);

    if (user.nivel !== 1 && user.nivel !== 2)
      throw new AppError("E-mail e/ou senha incorretos!", 401, 2);

    const passwordMatch = await compare(senha, user.senha);

    if (!passwordMatch)
      throw new AppError("E-mail e/ou senha incorretos!", 401, 2);

    if (user.status !== 1)
      throw new AppError("Operação não permitida!", 403, 1);

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.nome,
        email: user.email,
      },
      expires_in: expires_in_token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
