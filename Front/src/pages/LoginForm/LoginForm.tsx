import { login } from "api/services/user";
import { Page } from "components/common";
import { useAuthContext } from "contexts/AuthContext";
import { FC, FormEventHandler, useEffect, useState } from "react";
import { Button, FloatingLabel, Form, FormControlProps, Stack } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { User } from "types/api";

/*
    Lots of repetitive code here with the register form.
    Didn't have time to refactor it into a common component with submit handlers as props.
*/
export const LoginForm: FC = () => {

    const { user, setUser } = useAuthContext();

    const navigate = useNavigate();

    const [userData, setUserData] = useState<User>({
        username: "",
        password: ""
    });

    useEffect(() => {
        if (user) {
            navigate("/", { replace: true });
        }
    }, [user, navigate]);

    const handleChange: FormControlProps["onChange"] = e => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault();
        try {
            const loggedInUser = await login(userData);
            setUser(loggedInUser);
            navigate("/", { replace: true });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Page title="Login - Bonkwin">
            <Form onSubmit={handleSubmit}>
                <Stack gap={3}>
                    <Form.Group controlId="username" className="shadow-sm">
                        <FloatingLabel
                            controlId="username"
                            label="Username"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                                required
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group controlId="password" className="shadow-sm">
                        <FloatingLabel
                            controlId="password"
                            label="Password"
                        >
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                required
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Button className="me-auto" variant="primary" type="submit">
                        Login
                    </Button>
                    <NavLink to="/register">Not registered yet? Register here</NavLink>
                </Stack>
            </Form>
        </Page>
    );
};
