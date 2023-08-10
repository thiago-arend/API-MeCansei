import { db } from "../database/database.connection.js";

export function insertProduct(product) {
    const { name, description, currentPrice, category, photoUrl, sellerId } = product;

    return db.query(`INSERT INTO product (name, description, "currentPrice", category, "photoUrl", "sellerId") VALUES ($1, $2, $3, $4, $5, $6)`,
        [name, description, currentPrice, category, photoUrl, sellerId]);
}

export function selectProducts(query) {
    const { category, name, minPrice, maxPrice, orderMaxPrice, orderMinPrice } = query;

    let queryBase = `SELECT id, name, description, "currentPrice", category, "photoUrl" FROM product WHERE 1=1 `
    let queryComplement = ``;
    const values = [];

    if (category) {
        values.push(category);
        queryComplement += ` AND category=$${values.length}`;
    }
    if (name) {
        values.push(`%${name}%`);
        queryComplement += ` AND name ILIKE $${values.length}`;
    }
    if (minPrice) {
        values.push(minPrice);
        queryComplement += ` AND "currentPrice" >= $${values.length}`;
    }
    if (maxPrice) {
        values.push(maxPrice);
        queryComplement += ` AND "currentPrice" <= $${values.length}`;
    }

    if (orderMaxPrice) {
        queryComplement += ` ORDER BY "currentPrice" DESC`;

    } else if (orderMinPrice) {
        queryComplement += ` ORDER BY "currentPrice"`;
    }

    queryComplement += `;`;

    return db.query(queryBase + queryComplement, values);
}