import window from "global/window";
import { BrowserRouter } from "react-router-dom";
import { render, RenderResult, Queries } from "@testing-library/react";

export const renderWithRouter = (element: JSX.Element, route: string | URL): RenderResult<Queries, HTMLElement> => {
    window.history.pushState({}, "Test Page", route);
    return render(element, { wrapper: BrowserRouter });
};

export const toBase64 = (file: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
