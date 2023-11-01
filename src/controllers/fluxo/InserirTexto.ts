// Projeto: UniXs - Gestão do Conhecimento
// Programador: Paulo Griebler Júnior
// Data de início: 29/10/2023
// Objetivo: 

import { Response, Request } from "express";
import { prismaClient } from "../../database/prismaClient";
import { validationResult } from "express-validator/src/validation-result";
import { hash } from "bcryptjs";
import ITexto from "../../interfaces/textoInterface";
import IFluxoTexto from "../../interfaces/fluxotextoInterface";


export class InserirTexto {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { authorization, fluxoId, html} = req.body; // Precisa definir de qual fluxo (por isso 'fluxoId') que o texto pertence
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }


      /*const texto: ITexto | null = await prismaClient.texto.create({
        data: {
          html: html
        },
      });*/ // Argument `html` is missing.
      
      const texto: ITexto | null = await prismaClient.texto.create({
        data: {
          html
        },
      });
      
      console.log("texto.id ="+texto.id); // Debug

			const fluxotexto: IFluxoTexto | null = await prismaClient.fluxotexto.create({
			data: {
				id_fluxo: fluxoId,
				id_texto_: texto.id, // Usa a 'id' do texto recém-criado para atualizar como id do texto
				},
			});
			
			console.log("fluxotexto.id ="+fluxotexto.id); // Debug

      res
        .status(201)
        .json({ message: "Texto inserido com sucesso!", texto: texto , fluxotexto: fluxotexto});
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ errors: [{ message: "Erro interno no servidor." }] });
    }
  }
}
