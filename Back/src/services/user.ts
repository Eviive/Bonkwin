import { User } from "../models/user/user";
import { UserHelper } from "../models/user/helpers";
import { compare, hash } from "bcrypt";

const register = async (user: User): Promise<Omit<User, "password">> => {
    user.password = await hash(user.password, 10);

    const res = UserHelper.createUser(user);

    return {
        id: Number(res.lastInsertRowid),
        username: user.username
    };
};

const login = async (user: User): Promise<Omit<User, "password"> | null> => {
    const res = UserHelper.getUserByUsername(user.username);

    if (res === undefined) {
        return null;
    }

    const match = await compare(user.password, res.password);

    if (!match) {
        return null;
    }

    return {
        id: res.id,
        username: res.username
    };
};

const deleteUser = (id: number): number => {
    const res = UserHelper.deleteUser(id);

    return res.changes;
};

export const UserService = {
    register,
    login,
    deleteUser
};
