import { User } from "./user";
import { database } from "../../config/database";

const getUserByUsername = (username: string): User | undefined => {
    return database.prepare("SELECT * FROM user WHERE username = ?").get([username]);
};

const createUser = (user: User) => {
    return database.prepare(`
        INSERT INTO user(
            username,
            password
        ) VALUES (?, ?)
    `).run([user.username, user.password]);
};

const deleteUser = (id: number) => {
    return database.prepare("DELETE FROM user WHERE id = ?").run([id]);
};

export const UserHelper = {
    getUserByUsername,
    createUser,
    deleteUser
};
