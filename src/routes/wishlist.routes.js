import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import { listWishlistContent, putIntoWishlist, removeFromWishlist } from "../controllers/wishlist.controller.js";

const wishlistRouter = Router();
wishlistRouter.post("/products/:id/wishlist", validateAuth, putIntoWishlist);
wishlistRouter.delete("/products/:id/wishlist", validateAuth, removeFromWishlist);
wishlistRouter.get("/wishlist/me", validateAuth, listWishlistContent);

export default wishlistRouter;