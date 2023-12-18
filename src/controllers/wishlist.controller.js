import { selectProduct } from "../repositories/product.repository.js";
import {
    getWishlistByUserId,
    insertProductIntoWishlist,
    insertWishlist,
    listProductsFromWishlist,
    removeProductFromWishlist
} from "../repositories/wishlist.repository.js";
import { wishlistService } from "../services/wishlist.service.js";

export async function createWishlist(req, res) {
    const { userId } = res.locals.session;

    await wishlistService.createWishlist(userId);
    res.sendStatus(201);
}

export async function putIntoWishlist(req, res) {
    const { userId } = res.locals.session;
    const { id } = req.params;

    await wishlistService.putIntoWishlist(id, userId);
    res.sendStatus(201);
}

export async function removeFromWishlist(req, res) {
    const { userId } = res.locals.session;
    const { id } = req.params;

    await wishlistService.removeFromWishlist(id, userId);
    res.sendStatus(204);
}

export async function listWishlistContent(req, res) {
    const { userId } = res.locals.session;

    const result = await wishlistService.listWishlistContent(userId);
    res.send(result);
}

export const wishlistController = {
    createWishlist,
    putIntoWishlist,
    removeFromWishlist,
    listWishlistContent
}