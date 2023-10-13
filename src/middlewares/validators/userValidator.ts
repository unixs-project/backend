import { body } from "express-validator";

export const userValidator = [
  body("name")
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage("O nome deve ter no mínimo 3 caracteres."),
  body("email")
    .isEmail()
    .withMessage("O e-mail deve ser válido.")
    .isString()
    .isLength({ min: 10, max: 100 })
    .withMessage("O e-mail deve ter no mínimo 10 caracteres."),
  body("password")
    .isString()
    .isLength({ min: 6, max: 100 })
    .withMessage("A senha deve ter no mínimo 6 caracteres.")
    .matches(/^(.*[A-Z].*)$/)
    .withMessage("A senha precisa ter pelo menos uma letra maiúscula!")
    .matches(/(?=.*\d)/)
    .withMessage("A senha precisa ter pelo menos um número!"),
  body("passwordConfirmation")
    .isString()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("As senhas devem ser iguais!");
      }
      return true;
    }),
];
