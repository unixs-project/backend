// Projeto: UniXs - Gestão do Conhecimento
// Programador: Paulo Griebler Júnior
// Data de início: 27/10/2023
// Objetivo: 

import { Response, Request } from "express";
import { prismaClient } from "../../database/prismaClient";
import { validationResult } from "express-validator/src/validation-result";
import { hash } from "bcryptjs";
import IFluxo from "../../interfaces/fluxoInterface";
import IFluxoFilho from "../../interfaces/fluxofilhoInterface";

export class InserirFluxo {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { authorization, titulo, paiId, html} = req.body; // Não precisa o campo 'id' porque é uma inserção
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }     
      
      // Se o 'paiId' é diferente de 'null' então esse fluxo que está sendo inserido é um fluxo filho e deve ser cadastrado como tal na tabela 'fluxosfilhos'
      let fluxoPai: IFluxo | null;
      if (paiId !== null) {
				//1° deve procurar se o fluxo Pai já existe (se existe uma 'id' em 'fluxos' que corresponde ao valor de paiId):
				//const fluxoPai: IFluxo | null = await prismaClient.fluxo.findUnique({
				fluxoPai = await prismaClient.fluxo.findUnique({
				where: { id: paiId },
				});
				
				console.log("fluxoPai="+fluxoPai); // Debug
				//console.log("fluxoPai.id="+fluxoPai.id); // Debug

		    if (!fluxoPai) {
		      res.status(400)
						.json({
							errors: [
								{ message: `Não foi possível inserir este fluxo determinando o seu fluxo Pai (id =${paiId}), pois este fluxo Pai não existe !` },
		        ],
		      });
		      return;
		    }
			}
		    
	    // E finalmente cria o fluxo propriamente dito
			const fluxo: IFluxo | null = await prismaClient.fluxo.create({
        data: {
          titulo,
          paiId,
          html,
        },
      });
      
      console.log("Id do Fluxo inserido ="+fluxo.id); // Debug
		    
	   //2° agora, se existe o fluxo Pai, deve criar uma relação entre o fluxo Filho e o fluxo Pai:
			if (fluxoPai) {
				const fluxofilho: IFluxoFilho | null = await prismaClient.fluxofilho.create({
					data: {
						id_fluxo_pai: paiId,
						id_fluxo_filho: fluxo.id, // Usa a 'id' do fluxo recém-criado para atualizar como id do filho
					},
				});
			}

      res
        .status(201)
        .json({ message: "Fluxo inserido com sucesso!", fluxo: fluxo });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ errors: [{ message: "Erro interno no servidor." }] });
    }
  }
}
