import React, { FC } from "react";
import Config from "../../config";
import window from "global/window";
import { Helmet } from "react-helmet";

export interface SiteSEO {
    title?: string;
    description?: string;
    banner?: string;
}

const SEO: FC<SiteSEO> = (props) => {
    const url = window && window.location ? new URL(window.location.href) : undefined;

    const SEO: SiteSEO = {
        title: props.title
            ? `${props.title} | ${Config.SEO.TITLE}`
            : `${Config.SEO.TITLE} | ${Config.SEO.DESCRIPTION}`,
        description: props.description || Config.SEO.DESCRIPTION,
        banner: props.banner || (url ? `${url.origin}${Config.SEO.BANNER}` : ""),
    };

    return (
        <Helmet
            htmlAttributes={{ lang: "en" }}
            title={SEO.title}
            meta={[
                {
                    name: `description`,
                    content: SEO.description,
                },
                {
                    property: `og:title`,
                    content: SEO.title,
                },
                {
                    property: `og:description`,
                    content: SEO.description,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    property: `og:image`,
                    content: SEO.banner,
                },
                {
                    property: `twitter:image`,
                    content: SEO.banner,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    property: `og:locale`,
                    content: "en",
                },
                {
                    property: `og:site_name`,
                    content: SEO.title,
                },
                {
                    name: `twitter:title`,
                    content: SEO.title,
                },
                {
                    name: `twitter:description`,
                    content: SEO.description,
                },
            ]}
        />
    );
};

SEO.displayName = "SEO";
export default SEO;
