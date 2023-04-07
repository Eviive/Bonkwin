export type Ad = {
	id: number;
	title: string;
	description: string;
	price: number;
	userid: number;
};

export type AdWithComments = Ad & {
	comments: CommentWithUser[];
};


export type Comment = {
	id?: number;
	adid: number;
	content: string;
};

export type CommentWithUser = Comment & {
	user: Pick<User, "username">;
};


export type User = {
	id?: number;
	username: string;
	password: string;
};
