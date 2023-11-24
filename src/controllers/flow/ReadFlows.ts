import { Response, Request } from "express";
import { prismaClient } from "../../database/prismaClient";
import { validationResult } from "express-validator/src/validation-result";

export class ReadFlows {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const flows = await prismaClient.flow.findMany({
        include: {
          childFlow: true,
        },
      });

      if (!flows) {
        res.status(400).json({
          errors: [{ message: `Nenhum fluxo encontrado.` }],
        });
        return;
      }

      res.status(201).json({ message: `Fluxos encontrados.`, flows: flows });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ errors: [{ message: "Erro interno do servidor!" }] });
    }
  }
}
