import { Comment } from "../models/comment/comment";
import { CommentHelper } from "../models/comment/helpers";

const getCommentsByAdId = (adid: number): Comment[] => {
    return CommentHelper.getCommentsByAdId(adid);
};

const getCommentById = (id: number): Comment | undefined => {
    return CommentHelper.getCommentById(id);
};

const createComment = (comment: Comment): number | bigint => {
    const res = CommentHelper.createComment(comment);

    return res.lastInsertRowid;
};

const deleteComment = (id: number): number => {
    const res = CommentHelper.deleteComment(id);

    return res.changes;
};

export const CommentService = {
    getCommentsByAdId,
    getCommentById,
    createComment,
    deleteComment
};
