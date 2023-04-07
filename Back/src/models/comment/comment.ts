import { User } from "../user/user";

export type Comment = {
	id: number;
	adid: number;
	userid: number;
	content: string;
};

export type CommentWithUser = Comment & {
	user: Pick<User, "username">;
};
