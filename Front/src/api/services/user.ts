import { request } from "api/client";
import { User } from "types/api";

export const register = async (user: User): Promise<Omit<User, "password">> => request("/user/register", {
    method: "POST",
    data: user
});

export const login = async (user: User): Promise<Omit<User, "password">> => request("/user/login", {
    method: "POST",
    data: user
});

export const logout = async (): Promise<void> => request("/user/logout");

export const deleteUser = async (id: number): Promise<void> => request(`/user/${id}`, {
    method: "DELETE"
});
