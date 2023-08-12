import { selectProduct, selectProductsBySellerId } from "../repositories/product.repository.js";
import { getWishlistByUserId, insertProductIntoWishlist, insertWishlist } from "../repositories/wishlist.repository.js";

export async function createWishlist(req, res) {
    const { userId } = res.locals.session;

    try {
        await insertWishlist(userId);

        res.sendStatus(201);
    } catch (err) {

        if (Number(err.code) === 23505) return res.status(409).send({ message: "O usuário já possui uma wishlist!" });

        res.status(500).send(err.message);
    }
}

export async function putIntoWishlist(req, res) {
    const { userId } = res.locals.session;
    const { id } = req.params;

    try {
        const wishlistResult = await getWishlistByUserId(userId);
        if (wishlistResult.rowCount === 0) return res.status(404).
                send({ message: "A wishlist não pôde ser encontrada!" });

        const productResult = await selectProduct(id);
        if (productResult.rowCount === 0) return res.status(404).send({ message: "O produto não pôde ser adicionado na wishlist porque ele não existe!" });
        console.log(productResult.rows[0]);
        if (productResult.rows[0].sellerId === userId) return res.status(401).send({ message: "O produto não pôde ser adicionado na wishlist porque ele foi inserido por você!" });

        await insertProductIntoWishlist(wishlistResult.rows[0].id, id);

        res.sendStatus(201);
    } catch (err) {

        if (Number(err.code) === 23505) return res.status(409).send({ message: "Esse produto já foi inserido na sua wishlist!" });

        res.status(500).send(err.message);
    }
}