import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import validateSchema from "../middlewares/validateSchema.js";
import { productSchema } from "../schemas/product.schemas.js";
import { createProduct, getProducts } from "../controllers/product.controller.js";

const productRouter = Router();
productRouter.post("/products", validateAuth, validateSchema(productSchema), createProduct);
productRouter.get("/products", getProducts);

export default productRouter;