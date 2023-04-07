import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "types/app";

type Props = {
    link: Link;
    className?: string;
};

export const CustomNavLink: FC<Props> = ({ link, className }) => {
    return (
        <NavLink
            to={link.path}
            className={({ isActive, isPending }) => {
                let commonClasses = "nav-link text-black";
                className && (commonClasses += ` ${className}`);

                if (isPending) {
                    return `${commonClasses} text-muted`;
                }
                if (isActive) {
                    return `${commonClasses} text-decoration-underline`;
                }
                return commonClasses;
            }}
        >
            {link.name}
        </NavLink>
    );
};
