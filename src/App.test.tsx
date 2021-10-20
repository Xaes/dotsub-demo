import App from "./App";
import React from "react";
import Config from "./config";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

const renderWithRouter = (element: JSX.Element, route: string | URL) => {
    window.history.pushState({}, "Test Page", route);
    return render(element, { wrapper: BrowserRouter });
};

describe("App Navigates Correctly.", () => {
    test("Home Page", () => {
        renderWithRouter(<App />, Config.LINKS.HOME);
        expect(screen.getByText(/Home/i)).toBeInTheDocument();
    });

    test("Album Page", () => {
        renderWithRouter(<App />, Config.LINKS.ALBUM.replace(":albumId", "1"));
        expect(screen.getByText(/Album/i)).toBeInTheDocument();
    });

    test("Not Found", () => {
        renderWithRouter(<App />, "/oops/not/found");
        expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
    });
});