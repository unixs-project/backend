// Projeto: UniXs - Gestão do Conhecimento
// Programador: Paulo Griebler Júnior
// Data de início: 29/10/2023
// Objetivo: 

import { Response, Request } from "express";
import { prismaClient } from "../../database/prismaClient";
import { validationResult } from "express-validator/src/validation-result";
import { hash } from "bcryptjs";
import ITexto from "../../interfaces/textoInterface";

export class EditarTexto {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { authorization, id, html} = req.body; //
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      
      const texto: ITexto | null = await prismaClient.texto.update({
				where: { id: id },
				data: {
					html: html,
					},
			});

	    if (!texto) {
	      res.status(400).json({
	        errors: [
	          { message: `O texto {$id} não existe.` },
	        ],
	      });
	      return;
	    }
     

      res
        .status(201)
        .json({ message: 'Texto {$id} atualizado!', texto: texto });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ errors: [{ message: "Erro interno no servidor." }] });
    }
  }
}
