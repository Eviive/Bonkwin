import { Router } from "express";
import { UserService } from "../services/user";
import { sendError } from "../utils/errors";
import { User } from "../models/user/user";

export const route = Router();

route.post("/register", async (req, res) => {
    const user: User = req.body;

    if (!user.username || !user.password) {
        return sendError(res, {
            status: 400,
            message: "Username and password must not be empty"
        });
    }

    const id = await UserService.register(user);

    res.status(201).send({ id: id });
});

route.post("/login", async (req, res) => {
    const loginUser: User = req.body;

    const user = await UserService.login(loginUser);

    if (user === null) {
        return sendError(res, {
            status: 401,
            message: "Invalid username or password"
        });
    }

    res.cookie("user", user.id, { // TODO: Change to JWT or something a little bit more secure
        httpOnly: true
    });

    res.send(user);
});

route.get("/logout", (req, res) => {
    res.clearCookie("user");

    res.status(204).send();
});

route.delete("/:id([0-9]+)", (req, res) => {
    if (req.cookies.user === undefined) {
        return sendError(res, {
            status: 401,
            message: "You are not logged in"
        });
    }

    if (req.cookies.user !== parseInt(req.params.id)) {
        return sendError(res, {
            status: 403,
            message: "You are not allowed to delete this user"
        });
    }

    const id = parseInt(req.params.id);

    const changes = UserService.deleteUser(id);

    if (changes === 0) {
        return sendError(res, {
            status: 404,
            message: "User not found"
        });
    }

    res.status(204).send();
});
