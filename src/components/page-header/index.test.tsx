import React from "react";
import PageHeader from ".";
import { render } from "@testing-library/react";

describe("Page Header renders correctly.", () => {
    test("With Props", async () => {
        const screen = render(<PageHeader title="Test Title" subtitle="Test Subtitle"/>);
        expect(screen.getByText(/Test Title/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Subtitle/i)).toBeInTheDocument();
    });
});