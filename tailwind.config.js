module.exports = {
    purge: [
        "./pages/**/*.js",
        "./components/**/*.js"
    ],
    corePlugins: {
        fontFamily: false // We will use custom fonts instead
    },
    theme: {
        letterSpacing: { // We need more spacing between letters
            tighter: "-.05em",
            tight: "-.025em",
            normal: "0",
            wide: ".025em",
            wider: ".1em",
            widest: ".25em",
        }
    },
    variants: {},
    plugins: [],
    future: {
        removeDeprecatedGapUtilities: true // opt-in to remove the deprecated gap utilities (will not be necessary in tailwind v2.0+)
    }
};
