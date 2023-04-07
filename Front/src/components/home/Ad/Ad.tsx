import { FC } from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Ad as AdType } from "types/api";

type Props = {
    ad: AdType;
};

export const Ad: FC<Props> = ({ ad }) => {
    return (
        <Card className="shadow h-100">
            <Card.Body>
                <Card.Title>{ad.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{ad.price} €</Card.Subtitle>
                <hr />
                <Card.Text>{ad.description}</Card.Text>
                <NavLink to={`/ad/${ad.id}`} className="btn btn-primary">See more</NavLink>
            </Card.Body>
        </Card>
    );
};
