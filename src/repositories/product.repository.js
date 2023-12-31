import { db } from "../database/database.connection.js";

export function insertProduct(product) {
    const { name, description, currentPrice, category, photoUrl, sellerId } = product;

    return db.query(`INSERT INTO product (name, description, "currentPrice", category, "photoUrl", "sellerId") VALUES ($1, $2, $3, $4, $5, $6)`,
        [name, description, currentPrice, category, photoUrl, sellerId]);
}

export function selectProducts(query) {
    const { category, description, name, minPrice, maxPrice, orderMaxPrice, orderMinPrice } = query;

    let queryBase = `SELECT id, name, description, "currentPrice", category, "photoUrl" FROM product WHERE "isAvailable"=true `
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
    if (description) {
        values.push(`%${description}%`);
        queryComplement += ` AND description ILIKE $${values.length}`;
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

    return db.query(queryBase + queryComplement, values);
}

export function selectProduct(id) {
    return db.query(`SELECT p.id, p.name, p.description, p."currentPrice", p.category,
        p."photoUrl", p."sellerId", u.name AS "sellerName", u.phone AS "sellerPhone"
        FROM product p JOIN "user" u ON u.id=p."sellerId"
        WHERE p.id=$1;`, [id]);
}

export function selectProductByIdAndUserId(id, userId) {
    return db.query(`SELECT * FROM product p WHERE p.id=$1 AND p."sellerId"=$2;`, [id, userId]);
}

export function selectProductByName(name) {
    return db.query('SELECT * FROM product WHERE name=$1', [name]);
}

export function selectProductsBySellerId(sellerId) {
    return db.query(`SELECT u.name AS "sellerName", JSON_AGG(p.*) AS "productsList"
    FROM product p RIGHT JOIN "user" u ON u.id=p."sellerId"
    WHERE u.id=$1
    GROUP BY u.id;`,
        [sellerId]);
}

export function deleteProduct(id, sellerId) {
    return db.query(`DELETE FROM product WHERE id=$1 AND "sellerId"=$2`, [id, sellerId]);
}

export function updateProduct(id, sellerId, product) {
    const { name, description, currentPrice, category, photoUrl } = product;

    return db.query(`UPDATE product SET (name, description, "currentPrice", category, "photoUrl", "createdAt")
        = ($1, $2, $3, $4, $5, NOW()) WHERE id=$6 AND "sellerId"=$7`,
        [name, description, currentPrice, category, photoUrl, id, sellerId]);
}

export function updateProductAvailability(id, sellerId) {

    return db.query(`UPDATE product SET "isAvailable" = NOT "isAvailable" WHERE id=$1 AND "sellerId"=$2`,
        [id, sellerId]);
}