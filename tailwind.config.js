module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ['"DM Sans"', "Helvetica", "Arial", "sans-serif"],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
