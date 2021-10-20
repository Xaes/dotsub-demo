import React, { FC } from "react";
import SEO, { SiteSEO } from "../seo";

const Layout: FC<{ seo?: SiteSEO }> = ({ children, seo }) => (
    <React.Fragment>
        <SEO {...seo} />
        <main id="main" role="main">
            {children}
        </main>
    </React.Fragment>
)

export default Layout;