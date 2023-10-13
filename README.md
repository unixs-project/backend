# UniXS - API

API desenvolvida em Node e Typescript objetivando alimentar a aplicação web do projeto. Com intuito de permitir a criação, edição e exclusão de novos fluxos, etapas e subetapas de processos internos da Universidade do Vale do Rio dos Sinos.

## Rodando a API

- Navegue até a raiz do projeto:

`cd backend`

- Navegue para a branch escolhida:

`git checkout nomeDaBranch`

- Atualize a branch local:

`git pull`

- Instale as dependências:

`npm install`

- Após isso, criamos um arquivo chamado .env e digitamos suas configurações:

![env file](<readmeFiles/Screenshot 2023-10-13 at 14.40.33.png>)

- Execute o projeto:

`npm run dev`

## Configuração do Insomnia

- Para testarmos as rotas, utilizamos um software chamado Insomnia. Após baixado e instalado, crie uma nova Collection para o projeto:

![Alt text](<readmeFiles/Screenshot 2023-10-13 at 14.04.33.png>)

- Após, criamos algumas variáveis de ambiente, para facilitar os testes:

![Criar variáveis](<readmeFiles/Screenshot 2023-10-13 at 14.07.19.png>)
![Criar variáveis](<readmeFiles/Screenshot 2023-10-13 at 14.07.50.png>)
![Criar variáveis](<readmeFiles/Screenshot 2023-10-13 at 14.08.29.png>)
![Criar variáveis](<readmeFiles/Screenshot 2023-10-13 at 14.11.11.png>)

- Agora, devemos criar uma rota de cadastro, para cadastrarmos o nosso usuário, e poder automatizar a geração do JSON WEB TOKEN:

![Criando request](<readmeFiles/Screenshot 2023-10-13 at 14.14.32.png>)
![Setando url e adicionando JSON](<readmeFiles/Screenshot 2023-10-13 at 15.05.57.png>)
![Request](<readmeFiles/Screenshot 2023-10-13 at 15.11.22.png>)

- Pronto, temos um usuário cadastrado, agora, podemos criar a rota de login:

![Criando outra rota](<readmeFiles/Screenshot 2023-10-13 at 14.14.32.png>)
![Adicionando base path](<readmeFiles/Screenshot 2023-10-13 at 14.15.55.png>)
![Mudando metodo](<readmeFiles/Screenshot 2023-10-13 at 14.18.04.png>)
![Logando](<readmeFiles/Screenshot 2023-10-13 at 15.17.10.png>)

- Por fim, temos que definir que essa rota sempre gerará o token que alimentará as nossas outras rotas, para isso, seguimos esses passos:

![Renomeando rotas](<readmeFiles/Screenshot 2023-10-13 at 15.21.05.png>)
![Setando token no ambiente](<readmeFiles/Screenshot 2023-10-13 at 15.22.33.png>)
![Configurando](<readmeFiles/Screenshot 2023-10-13 at 15.24.03.png>)
![Configurando](<readmeFiles/Screenshot 2023-10-13 at 15.24.59.png>)

- Prontinho, agora que temos um token configurado, sempre que precisarmos acessar outra rota, sem ser a de login e a de signup, basta utilizar a rota de login 1 vez e automaticamente, todas as outras rotas configuradas com a variável do token, estarão liberadas.

- Configurando outras rotas com o token:

![Configurando outras rotas com o token](<readmeFiles/Screenshot 2023-10-13 at 15.26.29.png>)
![Configurando outras rotas com o token](<readmeFiles/Screenshot 2023-10-13 at 15.27.56.png>)

## Configuração do Prisma

- Sempre que mudarmos algo na modelagem, ou seja, no arquvio schema.prisma, precisamos rodar o comando:

`npx prisma migrate dev`

E digitar o nome da migration, por exemplo: "added_name_field_in_user_table".

- Quando quisermos atualizar o banco de dados, usamos o comando:

`npx prisma db push`

- E para atualizar as migrations (SQL) usamos o comando:

`npx prisma generate`

## Utilização de rotas

- Cadastro de usuário (SignUp)

![SignUp](readmeFiles/image.png)

- Login
  ![Login](readmeFiles/image-1.png)
