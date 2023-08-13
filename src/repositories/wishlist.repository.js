import { db } from "../database/database.connection.js";

export function insertWishlist(userId) {
    return db.query(`INSERT INTO wishlist ("userId") VALUES ($1) RETURNING *;`, [userId]);
}

export function getWishlistByUserId(userId) {
    return db.query(`SELECT * FROM wishlist WHERE "userId"=$1;`, [userId]);
}

export function insertProductIntoWishlist(wishlistId, prodId) {
    return db.query(`INSERT INTO "wishlistHasProduct" 
        ("productId", "wishlistId") VALUES ($1, $2);`, [prodId, wishlistId]);
}

export function removeProductFromWishlist(wishlistId, prodId) {
    return db.query(`DELETE FROM "wishlistHasProduct" WHERE 
        "productId"=$1 AND "wishlistId"=$2;`, [prodId, wishlistId]);
}

export function listProductsFromWishlist(userId) {
    return db.query(`SELECT p.id, p.name, p.description, p."currentPrice", p.category, p."photoUrl" 
        FROM "wishlistHasProduct" whp
            JOIN wishlist w ON w.id=whp."wishlistId" 
            JOIN product p ON p.id=whp."productId" 
                WHERE w."userId"=$1`, [userId]);
}