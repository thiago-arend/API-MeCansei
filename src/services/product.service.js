import { ProductConflictError } from "../errors/productConflictError.js";
import { productDeletionPermission } from "../errors/productDeletionPermissionError.js";
import { productNotFound } from "../errors/productNotFoundError.js";
import { productUpdatePermission } from "../errors/productUpdatePermissionError.js";
import {
    deleteProduct,
    insertProduct,
    selectProduct,
    selectProductByIdAndUserId,
    selectProductByName,
    selectProducts,
    selectProductsBySellerId,
    updateProduct,
    updateProductAvailability
} from "../repositories/product.repository.js";

export async function createProduct(productBody, userId) {
    const productExists = await selectProductByName(productBody.name);
    if (productExists) throw ProductConflictError();

    await insertProduct({ ...productBody, sellerId: userId });
    res.sendStatus(201);
}

export async function getProducts(query) {
    const result = await selectProducts(query);
    return result;
}

export async function getProduct(id) {
    const result = await selectProduct(id);
    if (!result[0]) throw productNotFound();

    return result;
}

export async function getMyProducts(userId) {
    const result = await selectProductsBySellerId(userId);
    result.rows[0] ? result.rows[0] : [];
}

export async function removeProduct(id, sellerId) {
    const userCanDelete = await selectProductByIdAndUserId(id, sellerId);
    if (!userCanDelete) throw productDeletionPermission();
    await deleteProduct(id, userId);

    res.sendStatus(204);
}

export async function setProduct(id, sellerId, productBody) {
    const productExists = await selectProduct(id);
    if (!productExists) throw productNotFound();

    const userCanUpdate = await selectProductByIdAndUserId(id, sellerId);
    if (!userCanUpdate) throw productUpdatePermission();
    await updateProduct(id, sellerId, productBody);
}

export async function toggleProductAvailability(id, sellerId) {
    const productExists = await selectProduct(id);
    if (!productExists) throw productNotFound();

    const userCanUpdate = await selectProductByIdAndUserId(id, sellerId);
    if (!userCanUpdate) throw productUpdatePermission();
    await updateProductAvailability(id, sellerId);
}

export const productService = {
    createProduct,
    getProducts,
    getProduct,
    getMyProducts,
    removeProduct,
    setProduct,
    toggleProductAvailability
};