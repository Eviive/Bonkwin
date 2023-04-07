import { getAds } from "api/services/ad";
import { Page } from "components/common";
import { Ad } from "components/home";
import { FC, useState } from "react";
import { Col, Container, FloatingLabel, FormControl, Row } from "react-bootstrap";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { Ad as AdType } from "types/api";

type AdsLoaderResponse = {
    ads: AdType[];
};

export const loader: LoaderFunction = async () => {
    const ads = await getAds();

    return { ads };
};

export const Ads: FC = () => {

    const { ads } = useLoaderData() as AdsLoaderResponse;

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Page title="Ads - Bonkwin">
            <FloatingLabel
                controlId="search"
                label="Search..."
            >
                <FormControl
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </FloatingLabel>
            <Container>
                <Row className="row-cols-2 g-4">
                    {ads.filter(ad => ad.title.toLowerCase().includes(searchTerm.toLowerCase())).map(ad => (
                        <Col key={ad.id}>
                            <Ad ad={ad} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </Page>
    );
};
