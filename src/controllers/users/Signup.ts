import { Response, Request } from "express";
import { prismaClient } from "../../database/prismaClient";
import { validationResult } from "express-validator/src/validation-result";
import { hash } from "bcryptjs";
import IUser from "../../interfaces/userInterface";

export class Signup {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const userAlreadyExists: IUser | null = await prismaClient.user.findFirst(
        {
          where: {
            email: email,
          },
        }
      );

      if (userAlreadyExists) {
        res.status(422).json({
          errors: [
            {
              message: "Esse usuário já existe. Por favor, tente acessá-lo.",
            },
          ],
        });
      }

      const hashedPassword = await hash(password, 8);

      const user: IUser | null = await prismaClient.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      res
        .status(201)
        .json({ message: "Usuário criado com sucesso!", user: user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ errors: [{ message: "Erro interno no servidor." }] });
    }
  }
}
