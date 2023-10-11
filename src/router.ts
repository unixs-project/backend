import { Router } from "express";

import auth from "./middlewares/auth";

import { userValidator } from "./middlewares/validators/userValidator";

import { Login } from "./controllers/users/Login";
import { Signup } from "./controllers/users/Signup";

const signup = new Signup();
const login = new Login();

const routes = Router();

routes.post("/signup", userValidator, signup.handle);
routes.post("/login", login.handle);
