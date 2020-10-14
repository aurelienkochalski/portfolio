module.exports = {
    purge: ["./pages/**/*.js", "./components/**/*.js"],
    corePlugins: {
        fontFamily: false // We will use custom fonts instead
    },
    theme: {
        // We need more spacing between letters
        letterSpacing: {
            tighter: "-.05em",
            tight: "-.025em",
            normal: "0",
            wide: ".025em",
            wider: ".1em",
            widest: ".25em"
        },
        extend: {
            width: {
                400: "400px",
                1200: "1200px"
            },
            margin: {
                400: "400px"
            }
        }
    },
    variants: {
        margin: ["responsive", "last", "first"] // We activate the last: and first: utility for margins
    },
    plugins: [],
    future: {
        removeDeprecatedGapUtilities: true, // opt-in to remove the deprecated gap utilities (will not be necessary in tailwind v2.0+)
        purgeLayersByDefault: true // opt-in to future purge method that will purge base, components, and utilities (will be default in tailwind v2.0+)
    }
};
