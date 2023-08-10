import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import validateSchema from "../middlewares/validateSchema.js";
import { productSchema } from "../schemas/product.schemas.js";
import { createProduct, getMyProducts, getProduct, getProducts, removeProduct } from "../controllers/product.controller.js";

const productRouter = Router();
productRouter.post("/products", validateAuth, validateSchema(productSchema), createProduct);
productRouter.get("/products", getProducts);
productRouter.get("/products/:id", getProduct);
productRouter.get("/me/products", validateAuth, getMyProducts);
productRouter.delete("/products/:id", validateAuth, removeProduct);

export default productRouter;