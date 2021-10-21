import Navbar from ".";
import React from "react";
import App from "../../App";
import Config from "../../config";
import { renderWithRouter } from "../../utils";
import { fireEvent, waitFor } from "@testing-library/dom";
import ColorSchemeProvider, { Colors } from "../../context/color-scheme";

describe("Navbar renders correctly.", () => {
    test("Check title text matches config title.", async () => {
        const screen = renderWithRouter(<Navbar />, "/");
        const expectedTitle = Config.SEO.TITLE;
        expect(screen.getByText(expectedTitle)).toBeInTheDocument();
    });

    test("Check title redirects to home page.", async () => {
        const screen = renderWithRouter(<App />, "/some-path");
        const element = screen.getByTestId("navbar-logo");
        fireEvent.click(element);
        expect(screen.getByTestId("home-section")).toBeInTheDocument();
    });

    test("Check that theme switcher toggles correctly.", async () => {
        const screen = renderWithRouter(
            <ColorSchemeProvider>
                <Navbar />
            </ColorSchemeProvider>,
            Config.LINKS.HOME
        );

        const toggleButton = screen.getByTestId("theme-switcher");

        // Initiallty, the localStorage item will be null.

        expect(window.localStorage.getItem("color-scheme")).toBeNull();

        // After a click, the theme should switch to "dark".

        fireEvent.click(toggleButton);
        expect(
            window.localStorage.getItem("color-scheme") === Colors.DARK.toString()
        ).toBeTruthy();
        waitFor(() =>
            expect(document.body.classList.contains(Colors.DARK.toString())).toBeTruthy()
        );

        // After another click, the theme should switch to "light".

        fireEvent.click(toggleButton);
        expect(
            window.localStorage.getItem("color-scheme") === Colors.LIGHT.toString()
        ).toBeTruthy();
        waitFor(() =>
            expect(document.body.classList.contains(Colors.LIGHT.toString())).toBeTruthy()
        );
    });
});
