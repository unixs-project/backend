// Projeto: UniXs - Gestão do Conhecimento
// Programador: Paulo Griebler Júnior
// Data de início: 27/10/2023
// Objetivo:

import { Response, Request } from "express";
import { prismaClient } from "../../database/prismaClient";
import { validationResult } from "express-validator/src/validation-result";
import { hash } from "bcryptjs";
import IFlow from "../../interfaces/flowInterface";
import IFlowFilho from "../../interfaces/childFlowInterface";

export class CreateFlow {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { authorization, title, fatherId, html } = req.body; // Não precisa o campo 'id' porque é uma inserção
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      // Se o 'paiId' é diferente de 'null' então esse flow que está sendo inserido é um flow filho e deve ser cadastrado como tal na tabela 'flowsfilhos'
      let fatherFlow: IFlow | null;
      if (fatherId !== null) {
        //1° deve procurar se o flow Father já existe (se existe uma 'id' em 'flows' que corresponde ao valor de paiId):
        //const fatherFlow: IFlow | null = await prismaClient.flow.findUnique({
        fatherFlow = await prismaClient.flow.findUnique({
          where: { id: fatherId },
        });

        console.log("fatherFlow=" + fatherFlow); // Debug
        //console.log("fatherFlow.id="+fatherFlow.id); // Debug

        if (!fatherFlow) {
          res.status(400).json({
            errors: [
              {
                message: `Não foi possível criar este fluxo associado à um fluxo pai, porque o fluxo pai com a id ${fatherId} informada não existe!`,
              },
            ],
          });
          return;
        }
      }

      // E finalmente cria o flow propriamente dito
      const flow: IFlow | null = await prismaClient.flow.create({
        data: {
          title,
          fatherId,
          html,
        },
      });

      console.log("Id do fluxo criado  =" + flow.id); // Debug

      //2° agora, se existe o flow Father, deve criar uma relação entre o flow Filho e o flow Father:
      if (fatherFlow) {
        const childFlow: IFlowFilho | null =
          await prismaClient.childFlow.create({
            data: {
              fatherFlowId: fatherFlow.id,
              childFlowId: flow.id, // Usa a 'id' do flow recém-criado para atualizar como id do filho
            },
          });
      }

      res.status(201).json({ message: "Fluxo criado!", flow: flow });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ errors: [{ message: "Erro interno do servidor!" }] });
    }
  }
}
