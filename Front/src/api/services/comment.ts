import { request } from "api/client";
import { Comment } from "types/api";

export const getCommentsByAdId = (adId: number): Promise<Comment[]> => request(`/comment/${adId}`);

export const deleteComment = (id: number): Promise<void> => request(`/comment/${id}`, {
    method: "DELETE"
});

export const createComment = (comment: Comment): Promise<Comment> => request("/comment", {
    method: "POST",
    data: comment
});
