import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import bcryptjs from "bcryptjs";
import IUser from "../../interfaces/userInterface";
import { sign } from "jsonwebtoken";

export class Login {
  async handle(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const user: IUser | null = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(400).json({
        errors: [
          { message: "Usuário não encontrado. Por favor, cadastre-se." },
        ],
      });
      return;
    }

    const isPasswordCorrect: boolean = await bcryptjs.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      res
        .status(400)
        .json({ errors: [{ message: "Senha incorreta. Tente novamente." }] });
    }

    const token = sign({ id: user.id }, process.env.JWT_KEY as string, {
      // expiresIn: "1d",
    });

    console.log(user);

    res
      .status(200)
      .json({ message: "Bem-vindo(a) de volta!", token: token, user: user });
  }
}
