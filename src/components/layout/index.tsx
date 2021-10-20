import Navbar from "../navbar";
import React, { FC } from "react";
import SEO, { SiteSEO } from "../seo";
import { Helmet } from "react-helmet";

const Layout: FC<{ seo?: SiteSEO }> = ({ children, seo }) => (
    <React.Fragment>
        <SEO {...seo} />
        <Helmet
            bodyAttributes={{
                class: "bg-gray-100 dark:bg-gray-900 transition-colors",
            }}
        />
        <Navbar />
        <main id="main" role="main" className="container px-8 py-12">
            {children}
        </main>
    </React.Fragment>
);

export default Layout;
