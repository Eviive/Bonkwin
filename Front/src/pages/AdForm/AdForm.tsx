import { createAd } from "api/services/ad";
import { Page } from "components/common";
import { FC, FormEventHandler, useState } from "react";
import { Button, FloatingLabel, Form, FormControlProps, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Ad } from "types/api";

export const AdForm: FC = () => {

    const navigate = useNavigate();

    const [newAd, setNewAd] = useState<Ad>({
        id: 0,
        title: "",
        description: "",
        price: 0,
        userid: 0
    });

    const handleChange: FormControlProps["onChange"] = e => {
        setNewAd({
            ...newAd,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault();
        try {
            const createdAd = await createAd(newAd);
            navigate(`/ad/${createdAd.id}`);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Page title="New ad - Bonkwin">
            <h1>New ad</h1>
            <Form onSubmit={handleSubmit}>
                <Stack gap={3}>
                    <Form.Group controlId="title" className="shadow-sm">
                        <FloatingLabel
                            controlId="title"
                            label="Title"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                name="title"
                                value={newAd.title}
                                onChange={handleChange}
                                required
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId="description" className="shadow-sm">
                        <FloatingLabel
                            controlId="description"
                            label="Description"
                        >
                            <Form.Control
                                as="textarea"
                                placeholder="Description"
                                name="description"
                                value={newAd.description}
                                onChange={handleChange}
                                required
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId="price" className="shadow-sm">
                        <FloatingLabel
                            controlId="price"
                            label="Price"
                        >
                            <Form.Control
                                type="number"
                                placeholder="Price"
                                name="price"
                                value={newAd.price}
                                onChange={handleChange}
                                required
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Button className="me-auto" variant="primary" type="submit">
                        Submit
                    </Button>
                </Stack>
            </Form>
        </Page>
    );
};
