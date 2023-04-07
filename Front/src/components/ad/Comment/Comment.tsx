import { FC } from "react";
import { Card } from "react-bootstrap";
import { CommentWithUser } from "types/api";

type Props = {
    comment: CommentWithUser
}

export const Comment: FC<Props> = ({ comment }) => {
    return (
        <Card className="mb-3 shadow-sm">
            <Card.Body>
                <Card.Text>{comment.content}</Card.Text>
            </Card.Body>
            <Card.Footer>
                Posted by {comment.user.username}
            </Card.Footer>
        </Card>
    );
};
