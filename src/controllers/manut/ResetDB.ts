// Projeto: UniXs - Gestão do Conhecimento
// Programador: Paulo Griebler Júnior
// Data de início: 26/10/2023
// Objetivo: 

import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient"; // Precisa para fazer o reset na database !
//import bcryptjs from "bcryptjs"; // Parece não ser necessário !
//import IUser from "../../interfaces/userInterface"; // Parece não ser necessário !
//import { sign } from "jsonwebtoken"; // Parece não ser necessário !

// Usuário para manutenção: "manut"
// Senha para manutenção: "bhJL$29!"

export class ResetDB {
  async handle(req: Request, res: Response): Promise<void> {
    const { login, senha } = req.body; // Recebe no request.body (corpo da requisição) as informações de login e senha que permitem o reset da db para testes

    if (login !== "manut") {
      res.status(400).json({
        errors: [
          { message: "Este usuário não tem acesso à área de manutenção." },
        ],
      });
      return;
    }

		if (senha !== "bhJL$29!") { 
      res
        .status(400)
        .json({ errors: [{ message: "Senha incorreta. Tente novamente." }] });
    }
    
    // Se chegou até aqui deve poder fazer o reset na database:
    
    //const deleteUsers = await prismaClient.user.deleteMany({}); // Deleta todos os registros na tabela User -- retorna a contagem dos registros deletados // Esse não é um reset adequado !!!
    //console.log("deleteUsers (registros de usuários deletados)="+JSON.stringify(deleteUsers)); // Debug 
    
    // Na verdade precisa resetar toda a DB usando Prisma CLI. Se só deletar os registros o id automático não será 0. Continuará desde o último inserido. Isso significa executar o comando no console: npm prisma migrate reset
    //https://stackoverflow.com/questions/20643470/execute-a-command-line-binary-with-node-js
    //For buffered, non-stream formatted output (you get it all at once), use child_process.exec:
    const { exec } = require('child_process');
    let comando = "npx prisma migrate reset --force"; // --force --> Passa o prompt de confirmação
		exec(comando, (err, stdout, stderr) => {
			console.log("Executando o comando: "+comando);
			if (err) {
				// node couldn't execute the command
				console.log("###Erro ao executar o comando: "+comando+" -- Erro: "+err);
				res.status(500).json({
				message: "Não foi possível resetar a DB!"});
			}
	
		  // the *entire* stdout and stderr (buffered)	  
		  console.log(`stdout: ${stdout}`);
		  console.log(`stderr: ${stderr}`);
		});
  
    res.status(200).json({
			message: "Database resetada!"});
		
  }
}
