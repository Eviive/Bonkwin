import { CommentWithUser } from "../comment/comment";

export type Ad = {
	id?: number;
	title: string;
	description: string;
	price: number;
	userid: number;
};

export type AdWithComments = Ad & {
	comments: CommentWithUser[];
};
