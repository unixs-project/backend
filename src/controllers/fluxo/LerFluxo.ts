// Projeto: UniXs - Gestão do Conhecimento
// Programador: Paulo Griebler Júnior
// Data de início: 27/10/2023
// Objetivo: 

import { Response, Request } from "express";
import { prismaClient } from "../../database/prismaClient";
import { validationResult } from "express-validator/src/validation-result";
import { hash } from "bcryptjs";
import IFluxo from "../../interfaces/fluxoInterface";

export class LerFluxo {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { authorization, id} = req.body; //
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      
      const fluxo: IFluxo | null = await prismaClient.fluxo.findUnique({
				where: { id },
			});

	    if (!fluxo) {
	      res.status(400).json({
	        errors: [
	          { message: `O fluxo {$id} não existe.` },
	        ],
	      });
	      return;
	    }
     

      res
        .status(201)
        .json({ message: `Fluxo {$id} encontrado!`, fluxo: fluxo });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ errors: [{ message: "Erro interno no servidor." }] });
    }
  }
}
