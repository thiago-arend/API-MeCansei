import { productDoesNotBelongToWishlist } from "../errors/productDoesNotBelongToWishlistError.js";
import { productNotFound } from "../errors/productNotFoundError.js";
import { wishlistAlreadyExists } from "../errors/wishlistAlreadyExistsErros.js";
import { wishlistConflict } from "../errors/wishlistConflictError.js";
import { wishlistNotFound } from "../errors/wishlistNotFoundError.js";
import { selectProduct } from "../repositories/product.repository.js";
import {
    getWishlistByUserId,
    insertProductIntoWishlist,
    insertWishlist,
    listProductsFromWishlist,
    removeProductFromWishlist,
    selectProductFromWishlist
} from "../repositories/wishlist.repository.js";

export async function createWishlist(userId) {
    const userHasWishlist = await getWishlistByUserId(userId);
    if (userHasWishlist) throw wishlistAlreadyExists();
    await insertWishlist(userId);

    res.sendStatus(201);
}

export async function putIntoWishlist(id, userId) {
    let wishlist = await getWishlistByUserId(userId);
    if (!wishlist) {
        wishlist = await insertWishlist(userId);
    }

    const product = await selectProduct(id);
    if (!product) throw productNotFound();

    if (product.rows[0].sellerId === userId) throw wishlistConflict();

    await insertProductIntoWishlist(wishlistResult.rows[0].id, id);
    res.sendStatus(201);
}

export async function removeFromWishlist(id, userId) {
    const wishlist = await getWishlistByUserId(userId);
    if (!wishlist) throw wishlistNotFound();

    const productCanBeDeleted = await selectProductFromWishlist(wishlist.id, id);
    if (!productCanBeDeleted) throw productDoesNotBelongToWishlist();

    await removeProductFromWishlist(wishlist.id, id);
}

export async function listWishlistContent(userId) {
    const result = await listProductsFromWishlist(userId);
    return result;
}

export const wishlistService = {
    createWishlist,
    putIntoWishlist,
    removeFromWishlist,
    listWishlistContent
}