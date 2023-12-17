import { authService } from "../services/auth.service.js";

export async function signup(req, res) {
    await authService.signup(req.body);
    res.sendStatus(201);
}

export async function signin(req, res) {
    const token = await authService.signin(req.body);
    res.status(200).send({ token });
}

export async function signout(req, res) {
    const { id } = res.locals.session;
    
    await authService.signout(id);
    res.sendStatus(200);
}

export const authController = {
    signup,
    signin,
    signout
};