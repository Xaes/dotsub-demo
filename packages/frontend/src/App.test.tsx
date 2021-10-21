import App from "./App";
import React from "react";
import Config from "./config";
import { renderWithRouter } from "./utils";
import { screen } from "@testing-library/react";

describe("App Navigates Correctly.", () => {
    test("Home Page", () => {
        renderWithRouter(<App />, Config.LINKS.HOME);
        expect(screen.getByTestId("home-section")).toBeInTheDocument();
    });

    test("Album Page", () => {
        renderWithRouter(<App />, Config.LINKS.ALBUM.replace(":albumId", "1"));
        expect(screen.getByTestId("album-section")).toBeInTheDocument();
    });

    test("Not Found Page", () => {
        renderWithRouter(<App />, "/oops/not/found");
        expect(screen.getByTestId("not-found-section")).toBeInTheDocument();
    });
});
