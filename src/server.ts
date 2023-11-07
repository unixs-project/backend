import express from "express";
import routes from "./router";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

// Desenvolvimento
/*app.listen(4100, () => {
  console.log(`O servidor está rodando na porta 4100 -- DESENVOLVIMENTO !`);
});*/

// Produção
app.listen(4000, () => {
  console.log(`O servidor está rodando na porta 4000 -- PRODUÇÃO`);
});
