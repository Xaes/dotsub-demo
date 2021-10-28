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
        HOME: "/explore",
        EXPLORE_BY_ALBUM: "/explore/albums",
        EXPLORE_BY_IMAGES: "/explore/images",
        NEW_ALBUM: "/album",
        IMAGE: "/photo/:photoId",
        ALBUM: "/album/:albumId",
        IMAGE_IN_ALBUM: "/album/:albumId/photo/:photoId",
    },
};

export default AppConfig;
