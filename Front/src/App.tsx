import { Header } from "components/common";
import { AuthContextProvider } from "contexts/AuthContext";
import { useLocalStorage } from "hooks/useLocalStorage";
import { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { User } from "types/api";

import "./styles/reset.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export const App: FC = () => {

    const [user, setUser] = useLocalStorage<Omit<User, "password"> | null>("user", null);

    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        if (!user && location.pathname !== "/login" && location.pathname !== "/register") {
            navigate("/login", { replace: true });
        }
    }, [user, navigate, location.pathname]);

    return (
        <AuthContextProvider value={{ user, setUser }}>
            <Header />
            <main>
                <Outlet />
            </main>
        </AuthContextProvider>
    );
};
