import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import { getUserByEmail, insertUser } from "../repositories/user.repository.js";
import { deleteSession, insertSession } from "../repositories/session.repository.js";

export async function signup(req, res) {
    const { password } = req.body;

    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        await insertUser({ ...req.body, password: passwordHash });

        res.sendStatus(201);
    } catch (err) {
        if (Number(err.code) === 23505) return res.status(409).send({ message: "E-mail ou cpf já existentes!" });

        res.status(500).send(err.message);
    }
}

export async function signin(req, res) {
    const { email, password } = req.body;

    try {
        
        const result = await getUserByEmail(email);
        const user = result.rows[0];
        
        if (!user || !bcrypt.compareSync(password, user.password))
            return res.status(401).send({ message: "E-mail ou senha incorretos!" });

        
        const token = uuid();
        await insertSession(token, user.id);

        res.status(200).send({ token });
    } catch (err) {

        res.status(500).send(err.message);
    }
}

export async function signout(req, res) {
    const { id } = res.locals.session;

    try {

        await deleteSession(id);

        res.sendStatus(200);
    } catch (err) {

        res.status(500).send(err.message);
    }
}