import { Router } from "express";

import auth from "./middlewares/auth";

import { userValidator } from "./middlewares/validators/userValidator";

import { ResetDB } from "./controllers/manut/ResetDB"; // PGJ

import { Signup } from "./controllers/users/Signup";
import { Login } from "./controllers/users/Login";

import { CreateFlow } from "./controllers/flow/CreateFlow"; // PGJ
import { ReadFlow } from "./controllers/flow/ReadFlow"; // PGJ
import { UpdateFlow } from "./controllers/flow/UpdateFlow"; // PGJ
import { DeleteFlow } from "./controllers/flow/DeleteFlow"; // PGJ

const reset_db = new ResetDB(); // PGJ

const signup = new Signup();
const login = new Login();

const routes = Router();

const create_flow = new CreateFlow(); // PGJ
const read_flow = new ReadFlow(); // PGJ
const update_flow = new UpdateFlow(); // PGJ
const delete_flow = new DeleteFlow(); // PGJ


routes.post("/reset_db", reset_db.handle); // PGJ

routes.post("/signup", userValidator, signup.handle);
routes.post("/login", login.handle);

routes.post("/create_flow", create_flow.handle); // PGJ
routes.post("/read_flow", read_flow.handle); // PGJ
routes.post("/update_flow", update_flow.handle); // PGJ
routes.post("/delete_flow", delete_flow.handle); // PGJ

routes.use(auth);

export default routes;
