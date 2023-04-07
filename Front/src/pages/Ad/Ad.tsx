import { getAdById } from "api/services/ad";
import { createComment } from "api/services/comment";
import { Comment } from "components/ad";
import { Page } from "components/common";
import { useAuthContext } from "contexts/AuthContext";
import { FC, FormEventHandler, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { AdWithComments } from "types/api";

type AdsLoaderResponse = {
    ad: AdWithComments;
};

export const loader: LoaderFunction = async ({ params }) => {
    if (params?.id === undefined || Number.isNaN(parseInt(params.id))) {
        throw new Error("Invalid id");
    }

    const ad = await getAdById(parseInt(params.id));

    return { ad };
};

export const Ad: FC = () => {

    const { ad } = useLoaderData() as AdsLoaderResponse;

    const { user } = useAuthContext();

    const [commentContent, setCommentContent] = useState<string>("");

    const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault();
        try {
            const comment = {
                content: commentContent,
                adid: ad.id
            };
            await createComment(comment);
            ad.comments.push({
                ...comment,
                user: {
                    username: user?.username ?? ""
                }
            });
            setCommentContent("");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Page title={`${ad.title} - Bonkwin`}>
            <Container>
                <h1>{ad.title}</h1>
                <h5 className="text-muted mb-4">{ad.price} €</h5>
                <Row>
                    <Col>
                        <strong>Description: </strong><p className="d-inline">{ad.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2 className="mt-5 mb-4">Comments</h2>
                        {ad.comments.length === 0 ? (
                            <p>Be the first to comment !</p>
                        ) : (
                            ad.comments.map((comment, idx) => <Comment key={idx} comment={comment} />)
                        )}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="comment">
                                <Form.Label as="h2" className="mt-5 mb-4">Leave a comment:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your comment"
                                    value={commentContent}
                                    onChange={e => setCommentContent(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button type="submit" className="mt-3">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Page>
    );
};
