import { db } from "../database/database.connection.js";

export function insertProduct(product) {
    const { name, description, currentPrice, category, photoUrl, sellerId } = product;
    return db.query(`INSERT INTO product (name, description, "currentPrice", category, "photoUrl", "sellerId") VALUES ($1, $2, $3, $4, $5, $6)`,
        [name, description, currentPrice, category, photoUrl, sellerId]);
}