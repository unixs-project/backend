// Projeto: UniXs - Gestão do Conhecimento
// Programador: Paulo Griebler Júnior
// Data de início: 27/10/2023
// Objetivo:

import { Response, Request } from "express";
import { prismaClient } from "../../database/prismaClient";
import { validationResult } from "express-validator/src/validation-result";
import { hash } from "bcryptjs";
import IFlow from "../../interfaces/flowInterface";

export class DeleteFlow {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params; //
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const flow: IFlow | null = await prismaClient.flow.delete({
        where: { id },
      });

      if (!flow) {
        res.status(400).json({
          errors: [{ message: `O fluxo com a id:${id} não existe.` }],
        });
        return;
      }

      res.status(201).json({ message: `Fluxo ${id} excluído.`, flow: flow });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ errors: [{ message: "Erro interno do servidor!" }] });
    }
  }
}
