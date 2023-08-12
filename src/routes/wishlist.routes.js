import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import { createWishlist, putIntoWishlist } from "../controllers/wishlist.controller.js";

const wishlistRouter = Router();
wishlistRouter.post("/products/wishlist", validateAuth, createWishlist);
wishlistRouter.post("/products/:id/wishlist", validateAuth, putIntoWishlist);

export default wishlistRouter;