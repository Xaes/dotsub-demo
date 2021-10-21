const colors = require("tailwindcss/colors");

const primaryPallette = {
    "primary-light": colors.indigo[400],
    primary: colors.indigo[600],
    "primary-dark": colors.indigo[800],
};

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: "class",
    theme: {
        extend: {
            colors: primaryPallette,
            textColor: primaryPallette,
            borderColor: primaryPallette,
            backgroundColor: primaryPallette,
            fontFamily: {
                sans: ['"DM Sans"', "Helvetica", "Arial", "sans-serif"],
            },
        },
        container: {
            center: true,
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
