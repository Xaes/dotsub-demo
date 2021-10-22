import window from "global/window";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

export const renderWithRouter = (element: JSX.Element, route: string | URL) => {
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
