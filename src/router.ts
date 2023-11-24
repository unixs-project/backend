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
import { ReadFlows } from "./controllers/flow/ReadFlows";

const reset_db = new ResetDB(); // PGJ

const signup = new Signup();
const login = new Login();

const routes = Router();

const create_flow = new CreateFlow(); // PGJ
const read_flow = new ReadFlow(); // PGJ
const update_flow = new UpdateFlow(); // PGJ
const delete_flow = new DeleteFlow(); // PGJ
const read_flows = new ReadFlows();

routes.post("/reset_db", reset_db.handle); // PGJ

routes.post("/signup", userValidator, signup.handle);
routes.post("/login", login.handle);

routes.post("/create_flow", create_flow.handle); // PGJ
routes.get("/read_flow/:id", read_flow.handle); // PGJ
routes.get("/read_flows", read_flows.handle); // PGJ
routes.put("/update_flow/:id", update_flow.handle); // PGJ
routes.delete("/delete_flow/:id", delete_flow.handle); // PGJ

routes.use(auth);

export default routes;
