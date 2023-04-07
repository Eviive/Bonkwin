import { Comment } from "./comment";
import { database } from "../../config/database";

const getCommentsByAdId = (adid: number): Comment[] => {
    return database.prepare("SELECT * FROM comment WHERE adid = ?").all([adid]);
};

const getCommentById = (id: number): Comment | undefined => {
    return database.prepare("SELECT * FROM comment WHERE id = ?").get([id]);
};

const createComment = (comment: Comment) => {
    return database.prepare(`
        INSERT INTO comment(
            content,
            userid,
            adid
        ) VALUES (?, ?, ?)
    `).run([comment.content, comment.userid, comment.adid]);
};

const deleteComment = (id: number) => {
    return database.prepare("DELETE FROM comment WHERE id = ?").run([id]);
};

export const CommentHelper = {
    getCommentsByAdId,
    getCommentById,
    createComment,
    deleteComment
};
