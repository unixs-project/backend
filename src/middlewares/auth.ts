import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prismaClient } from "../database/prismaClient";
import IJWT from "../interfaces/jwtInterface";
import IUser from "../interfaces/userInterface";

declare module "express" {
  export interface Request {
    user?: Partial<IUser>;
  }
}

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({
      errors: [{ message: "Não autorizado! Por favor, realize seu login." }],
    });
    return;
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const { id } = verify(token, process.env.JWT_KEY as string) as IJWT;

    const user: IUser | null = await prismaClient.user.findUnique({
      where: { id },
    });

    if (user) {
      const { password: _, ...loggedUser } = user;
      req.user = loggedUser;
      return next();
    } else {
      res.status(404).json({
        errors: [
          { message: "Usuário não encontrado. Por favor, logue na sua conta." },
        ],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      errors: [{ message: "Não autorizado! Por favor, realize seu login." }],
    });
  }
};

export default auth;
