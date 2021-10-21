import Navbar from "../navbar";
import SEO, { SiteSEO } from "../seo";
import { Helmet } from "react-helmet";
import React, { FC, useContext } from "react";
import { Colors, Context as ColorSchemeContext } from "../../context/color-scheme";

const Layout: FC<{ seo?: SiteSEO }> = ({ children, seo }) => {
    const { data } = useContext(ColorSchemeContext);

    return (
        <React.Fragment>
            <SEO {...seo} />
            <Helmet
                bodyAttributes={{
                    class: `${data?.color} ${
                        data?.color === Colors.DARK ? "bg-black-1" : "bg-white-2"
                    } transition-colors`,
                }}
            />
            <Navbar />
            <main id="main" role="main" className="container px-8 py-12">
                {children}
            </main>
        </React.Fragment>
    );
};

export default Layout;
