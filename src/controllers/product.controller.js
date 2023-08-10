import { insertProduct } from "../repositories/product.repository.js";

export async function createProduct(req, res) {
    const { userId } = res.locals.session;

    try {
        await insertProduct({ ...req.body, sellerId: userId });

        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        if (Number(err.code) === 23505) return res.status(409).send({ message: "Já existe um filme com esse nome!" });

        res.status(500).send(err.message);
    }
}