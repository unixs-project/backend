import { Router } from "express";

import auth from "./middlewares/auth";

import { userValidator } from "./middlewares/validators/userValidator";

import { Resetar_db } from "./controllers/manut/Resetar_db"; // PGJ

import { Signup } from "./controllers/users/Signup";
import { Login } from "./controllers/users/Login";

import { InserirFluxo } from "./controllers/fluxo/InserirFluxo"; // PGJ
import { LerFluxo } from "./controllers/fluxo/LerFluxo"; // PGJ
import { EditarFluxo } from "./controllers/fluxo/EditarFluxo"; // PGJ
import { ExcluirFluxo } from "./controllers/fluxo/ExcluirFluxo"; // PGJ

import { InserirTexto } from "./controllers/fluxo/InserirTexto"; // PGJ
import { LerTexto } from "./controllers/fluxo/LerTexto"; // PGJ
import { EditarTexto } from "./controllers/fluxo/EditarTexto"; // PGJ
import { ExcluirTexto } from "./controllers/fluxo/ExcluirTexto"; // PGJ


const resetar_db = new Resetar_db(); // PGJ

const signup = new Signup();
const login = new Login();

const routes = Router();

const inserir_fluxo = new InserirFluxo(); // PGJ
const ler_fluxo = new LerFluxo(); // PGJ
const editar_fluxo = new EditarFluxo(); // PGJ
const excluir_fluxo = new ExcluirFluxo(); // PGJ

const inserir_texto = new InserirTexto(); // PGJ
const ler_texto = new LerTexto(); // PGJ
const editar_texto = new EditarTexto(); // PGJ
const excluir_texto = new ExcluirTexto(); // PGJ

routes.post("/resetar_db", resetar_db.handle); // PGJ

routes.post("/signup", userValidator, signup.handle);
routes.post("/login", login.handle);

routes.post("/inserir_fluxo", inserir_fluxo.handle); // PGJ
routes.post("/ler_fluxo", ler_fluxo.handle); // PGJ
routes.post("/editar_fluxo", editar_fluxo.handle); // PGJ
routes.post("/excluir_fluxo", excluir_fluxo.handle); // PGJ

routes.post("/inserir_texto", inserir_texto.handle); // PGJ
routes.post("/ler_texto", ler_texto.handle); // PGJ
routes.post("/editar_texto", editar_texto.handle); // PGJ
routes.post("/excluir_texto", excluir_texto.handle); // PGJ

routes.use(auth);

export default routes;
