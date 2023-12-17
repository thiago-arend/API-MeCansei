import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import { getUserByEmail, insertUser } from "../repositories/user.repository.js";
import { deleteSession, insertSession } from "../repositories/session.repository.js";
import { UserConflictError } from "../errors/userConflictError.js";
import { AuthFailureError } from "../errors/authFailure.js";

export async function signup(userBody) {
    const userExists = await getUserByEmail(user.email);
    if (userExists) throw UserConflictError();

    const { password } = userBody;
    const passwordHash = bcrypt.hashSync(password, 10);

    await insertUser({ ...userBody, password: passwordHash });
}

export async function signin(loginBody) {
    const { email, password } = loginBody;

    const result = await getUserByEmail(email);
    const user = result.rows[0];
    
    if (!user || !bcrypt.compareSync(password, user.password))
        throw AuthFailureError()

    const token = uuid();
    await insertSession(token, user.id);

    return token;
}

export async function signout(sessionId) {
    await deleteSession(sessionId);
}

export const authService = {
    signup,
    signin,
    signout
};