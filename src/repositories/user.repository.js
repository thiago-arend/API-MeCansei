import { db } from "../database/database.connection.js";

export function insertUser(user) {
    const { name, cpf, phone, email, password } = user;
    return db.query(`INSERT INTO "user" (name, cpf, phone, email, password) VALUES ($1, $2, $3, $4, $5)`,
        [name, cpf, phone, email, password]);
}

export function getUserByEmail(email) {
    return db.query(`SELECT * FROM "user" WHERE email=$1`, [email]);
}