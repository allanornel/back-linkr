import { Router } from "express";
import { validateSchema } from "./../middlewares/validateSchema.js";
import { signUp, Signin } from "../controllers/authController.js";
import signUpSchema from "../schemas/signUpSchema.js";
import SigninValidation from "../schemas/signinSchema.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), signUp);
authRouter.post("/signin", validateSchema(SigninValidation), Signin);

export default authRouter;
