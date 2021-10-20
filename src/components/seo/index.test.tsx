import SEO from "./index";
import React from "react";
import Config from "../../config";
import { waitFor, render } from "@testing-library/react";
import { Helmet, HelmetPropsToState } from "react-helmet";

const getMetadataValue = (selectors: string[], meta: HTMLMetaElement[]) => {
    return meta.filter((m: any) => selectors.includes(m.property || m.name))
        .map((m: HTMLMetaElement) => m.content);
}

const getMetadata = (helmet: HelmetPropsToState) => {

    const titleSelectors = ["og:title", "og:site_name", "twitter:title"];
    const descriptionSelectors = ["og:description", "twitter:desimageSelectorscription", "description"];
    const imageSelectors = ["og:image", "twitter:image"];

    return {
        titles: [helmet.title, ...getMetadataValue(titleSelectors, helmet.metaTags)],
        descriptions: getMetadataValue(descriptionSelectors, helmet.metaTags),
        banners: getMetadataValue(imageSelectors, helmet.metaTags)
    };

};

describe("SEO setting content correctly.", () => {

    test("Default Props", async () => {
        render(<SEO />);
        const helmet = Helmet.peek();
        await waitFor(() => {
            const { titles, descriptions, banners } = getMetadata(helmet);
            const expectedTitle = `${Config.SEO.TITLE} | ${Config.SEO.DESCRIPTION}`;
            const expectedDescription = Config.SEO.DESCRIPTION;
            const expectedBanner = `http://localhost${Config.SEO.BANNER}`;

            expect(titles.every((t) => t === expectedTitle)).toBeTruthy();
            expect(descriptions.every((d) => d === expectedDescription)).toBeTruthy();
            expect(banners.every((b) => b === expectedBanner)).toBeTruthy();
        });
    });

    test("With Props", async () => {
        const title = "Test Title";
        const description = "Test Description";
        const banner = "http://localhost/test-banner.png";

        render(<SEO title={title} description={description} banner={banner} />);
        const helmet = Helmet.peek();

        await waitFor(() => {
            const { titles, descriptions, banners } = getMetadata(helmet);
            const expectedTitle = `${title} | ${Config.SEO.TITLE}`
            const expectedDescription = description;
            const expectedBanner = banner;

            expect(titles.every((t) => t === expectedTitle)).toBeTruthy();
            expect(descriptions.every((d) => d === expectedDescription)).toBeTruthy();
            expect(banners.every((b) => b === expectedBanner)).toBeTruthy();
        });
    });
});
