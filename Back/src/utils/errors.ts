import { Response } from "express";
import { ApiError } from "../types/api";

export const sendError = (res: Response, error: ApiError) => {
    res.status(error.status).send(error);
};
