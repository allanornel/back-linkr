import { Router } from "express";
import { validateSchema } from "./../middlewares/validateSchema.js";
import { signUp } from "../controllers/authController.js";
import signUpSchema from "../schemas/signUpSchema.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), signUp);
authRouter.post("/signin");

export default authRouter;
