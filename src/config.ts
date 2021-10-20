import dotenv from "dotenv";
dotenv.config();

const AppConfig = {
    SEO: {
        title: process.env.REACT_APP_WEBSITE_TITLE || "DotSub Demo",
        description:
            process.env.REACT_APP_WEBSITE_DESCRIPTION || "Manage your albums and photos without ease.",
        banner: process.env.REACT_APP_WEBSITE_BANNER || "/banner.png",
    },
    LINKS: {},
};

export default AppConfig;