import window from "global/window";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

export const renderWithRouter = (element: JSX.Element, route: string | URL) => {
    window.history.pushState({}, "Test Page", route);
    return render(element, { wrapper: BrowserRouter });
};