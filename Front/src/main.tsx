import { Error as ErrorElement } from "components/common";
import { Ad, AdForm, Ads, LoginForm, RegisterForm, adLoader, adsLoader } from "pages";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";

const rootElement = document.querySelector("#root");
if (!rootElement) throw new Error("Root element not found");

const root = createRoot(rootElement);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorElement />,
        children: [
            {
                path: "/",
                element: <Ads />,
                loader: adsLoader
            },
            {
                path: "/ad/:id",
                element: <Ad />,
                loader: adLoader
            },
            {
                path: "/login",
                element: <LoginForm />
            },
            {
                path: "/register",
                element: <RegisterForm />
            },
            {
                path: "/new-ad",
                element: <AdForm />
            }
        ]
    }
]);

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
