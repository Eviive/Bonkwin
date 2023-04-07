import { Router } from "express";
import { CommentService } from "../services/comment";
import { sendError } from "../utils/errors";
import { Comment } from "../models/comment/comment";

export const route = Router();

route.get("/:id([0-9]+)", (req, res) => {
    const adId = parseInt(req.params.id);

    const comments = CommentService.getCommentsByAdId(adId);

    res.status(200).send(comments);
});

route.post("/", (req, res) => {
    if (req.cookies.user === undefined) {
        return sendError(res, {
            status: 401,
            message: "You are not logged in"
        });
    }

    const comment: Comment = req.body;

    if (!comment.content || comment.adid === undefined) {
        return sendError(res, {
            status: 400,
            message: "Invalid comment data"
        });
    }

    comment.userid = parseInt(req.cookies.user);

    const id = CommentService.createComment(comment);

    res.status(201).send({ id: id });
});

route.delete("/:id([0-9]+)", (req, res) => {
    if (req.cookies.user === undefined) {
        return sendError(res, {
            status: 401,
            message: "You are not logged in"
        });
    }

    const id = parseInt(req.params.id);

    const comment = CommentService.getCommentById(id);

    if (comment === undefined) {
        return sendError(res, {
            status: 404,
            message: "Comment not found"
        });
    }

    if (comment.userid !== parseInt(req.cookies.user)) {
        return sendError(res, {
            status: 403,
            message: "You are not allowed to delete this comment"
        });
    }

    CommentService.deleteComment(id);

    res.status(204).send();
});
