import App from "./App";
import React from "react";
import { render, screen } from "@testing-library/react";

test("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/Hello World/i);
    expect(linkElement).toBeInTheDocument();
});
