import {
    deleteProduct,
    insertProduct,
    selectProduct,
    selectProducts,
    selectProductsBySellerId,
    updateProduct,
    updateProductAvailability
} from "../repositories/product.repository.js";
import { productService } from "../services/product.service.js";

export async function createProduct(req, res) {
    const { userId } = res.locals.session;

    await productService.createProduct(req.body, userId);
    res.sendStatus(201);
}

export async function getProducts(req, res) {
    const result = await productService.getProducts(req.query);
    res.status(200).send(result.rows);
}

export async function getProduct(req, res) {
    const { id } = req.params;

    const result = await productService.getProduct(id);
    res.status(200).send(result);
}

export async function getMyProducts(req, res) {
    const { userId } = res.locals.session;

    const result = await productService.getMyProducts(userId);
    res.status(200).send(result);
}

export async function removeProduct(req, res) {
    const { id } = req.params;
    const { userId } = res.locals.session;

    await productService.removeProduct(id, userId);
    res.sendStatus(204);
}

export async function setProduct(req, res) {
    const { id } = req.params;
    const { userId } = res.locals.session;

    await productService.setProduct(id, userId, req.body);
    res.sendStatus(204);
}

export async function toggleProductAvailability(req, res) {
    const { id } = req.params;
    const { userId } = res.locals.session;

    await productService.toggleProductAvailability(id, userId);
    res.sendStatus(204);
}

export const productController = {
    createProduct,
    getMyProducts,
    getProduct,
    getMyProducts,
    removeProduct,
    setProduct,
    toggleProductAvailability
};