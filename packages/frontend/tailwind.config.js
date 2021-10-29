const colors = require("tailwindcss/colors");

const primaryPallette = {
    "primary-light": colors.indigo[400],
    primary: colors.indigo[600],
    "primary-dark": colors.indigo[800],
};

const grayPallette = {
    "black-1": "#111317",
    "black-2": "#23262F",
    "white-1": "#F4F5F6",
    "white-2": "#E6E8EC",
};

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx,svg}", "./public/index.html"],
    darkMode: "class",
    theme: {
        extend: {
            colors: primaryPallette,
            textColor: primaryPallette,
            borderColor: {
                ...primaryPallette,
                ...grayPallette,
            },
            backgroundColor: {
                ...primaryPallette,
                ...grayPallette,
            },
            fontFamily: {
                sans: ['"DM Sans"', "Helvetica", "Arial", "sans-serif"],
            },
            minHeight: {
                "1/2": "50vh",
            },
        },
        container: {
            center: true,
        },
    },
    variants: {
        extend: {
            borderColor: ["active", "focus"],
            pointerEvents: ["group-hover"],
        },
    },
    plugins: [],
};
