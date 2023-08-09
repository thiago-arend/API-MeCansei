import { Router } from "express";
import { signinSchema, signupSchema } from "../schemas/user.schemas.js";
import { signin, signup, signout } from "../controllers/auth.controller.js";
import { validateAuth } from "../middlewares/validateAuth.js";
import validateSchema from "../middlewares/validateSchema.js";

const authRouter = Router();
authRouter.post("/auth/signup", validateSchema(signupSchema), signup);
authRouter.post("/auth/signin", validateSchema(signinSchema), signin);
authRouter.post("/auth/signout", validateAuth, signout);

export default authRouter;