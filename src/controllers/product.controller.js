import {
    deleteProduct,
    insertProduct,
    selectProduct,
    selectProducts,
    selectProductsBySellerId,
    updateProduct,
    updateProductAvailability
} from "../repositories/product.repository.js";

export async function createProduct(req, res) {
    const { userId } = res.locals.session;

    try {
        await insertProduct({ ...req.body, sellerId: userId });

        res.sendStatus(201);
    } catch (err) {

        if (Number(err.code) === 23505) return res.status(409).send({ message: "Já existe um filme com esse nome!" });

        res.status(500).send(err.message);
    }
}

export async function getProducts(req, res) {

    try {
        const result = await selectProducts(req.query);

        res.status(200).send(result.rows);
    } catch (err) {

        res.status(500).send(err.message);
    }
}

export async function getProduct(req, res) {
    const { id } = req.params;

    try {
        const result = await selectProduct(id);
        if (result.rowCount === 0) return res.status(404).send({ message: "Produto não encontrado!" });

        res.status(200).send(result.rows[0]);
    } catch (err) {

        res.status(500).send(err.message);
    }
}

export async function getMyProducts(req, res) {
    const { userId } = res.locals.session;

    try {
        const result = await selectProductsBySellerId(userId);

        res.status(200).send(result.rows[0]);
    } catch (err) {

        res.status(500).send(err.message);
    }
}

export async function removeProduct(req, res) {
    const { id } = req.params;
    const { userId } = res.locals.session;

    try {
        const select = await selectProduct(id);
        if (select.rowCount === 0) return res.status(404).send({ message: "O produto não pôde ser removido porque não existe!" });

        const result = await deleteProduct(id, userId);
        if (result.rowCount === 0) return res.status(401).send({ message: "Você não possui permissão para apagar esse produto!" });

        res.sendStatus(204);
    } catch (err) {

        res.status(500).send(err.message);
    }
}

export async function setProduct(req, res) {
    const { id } = req.params;
    const { userId } = res.locals.session;

    try {
        const select = await selectProduct(id);
        if (select.rowCount === 0) return res.status(404).send({ message: "O produto não pôde ser atualizado porque não existe!" });

        const result = await updateProduct(id, userId, req.body);
        if (result.rowCount === 0) return res.status(401).send({ message: "Você não possui permissão para atualizar esse produto!" });

        res.sendStatus(204);
    } catch (err) {

        if (Number(err.code) === 23505) return res.status(409).send({ message: "Já existe um filme com esse nome!" });

        res.status(500).send(err.message);
    }
}

export async function toggleProductAvailability(req, res) {
    const { id } = req.params;
    const { userId } = res.locals.session;

    try {
        const select = await selectProduct(id);
        if (select.rowCount === 0) return res.status(404).send({ message: "A disponibilidade não pôde ser alterada porque o produto não existe!" });

        const result = await updateProductAvailability(id, userId);
        if (result.rowCount === 0) return res.status(401).send({ message: "Você não possui permissão para atualizar a disponibilidade desse produto!" });

        res.sendStatus(204);
    } catch (err) {

        res.status(500).send(err.message);
    }
}