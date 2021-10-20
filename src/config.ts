import dotenv from "dotenv";
dotenv.config();

const AppConfig = {
    SEO: {
        TITLE: process.env.REACT_APP_WEBSITE_TITLE || "DotSub Demo",
        DESCRIPTION:
            process.env.REACT_APP_WEBSITE_DESCRIPTION ||
            "Manage your albums and photos with ease.",
        BANNER: process.env.REACT_APP_WEBSITE_BANNER || "/banner.png",
    },
    LINKS: {
        HOME: "/",
        NEW_ALBUM: "/album",
        ALBUM: "/album/:albumId",
        IMAGE: "/album/:albumId/photo/:photoId",
    },
};

export default AppConfig;
