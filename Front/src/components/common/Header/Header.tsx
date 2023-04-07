import { FC } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "types/app";
import { CustomNavLink } from "../CustomNavLink/CustomNavLink";

const links: Link[] = [
    { name: "Home", path: "/" },
    { name: "New ad", path: "/new-ad" }
];

export const Header: FC = () => {
    return (
        <Navbar bg="light" expand="lg" className="px-4 shadow-sm">
            <CustomNavLink link={links[0]} className="navbar-brand" />
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {links.slice(1).map((link) => <CustomNavLink key={link.name} link={link} />)}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
