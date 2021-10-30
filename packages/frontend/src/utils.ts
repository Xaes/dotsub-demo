import window from "global/window";
import { BrowserRouter } from "react-router-dom";
import { render, RenderResult, Queries } from "@testing-library/react";

export const renderWithRouter = (
    element: JSX.Element,
    route: string | URL
): RenderResult<Queries, HTMLElement> => {
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

export const cancelablePromise = (
    func: () => Promise<any>,
    signal: AbortSignal
): (() => Promise<any> | Promise<never>) => {
    if (signal.aborted) return () => Promise.reject("Aborted");

    return () =>
        new Promise<any>((resolve, reject) => {
            const abortHandler = () => {
                reject("Aborted");
            };

            signal.addEventListener("abort", abortHandler);

            return func().then((any) => {
                signal.removeEventListener("abort", abortHandler);
                resolve(any);
                return any;
            })
    }).catch(error => {
        /*eslint-disable*/
        console.debug(error);
        return error;
    });
};
