import { Router } from "express";
import authRouter from "./auth.routes.js";
import productRouter from "./product.routes.js";
import wishlistRouter from "./wishlist.routes.js";

const router = Router();
router.use(authRouter);
router.use(productRouter);
router.use(wishlistRouter);

export default router;