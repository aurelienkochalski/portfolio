const IconfontPlugin = require("iconfont-plugin-webpack");
const customCssTemplate = require("./utils/fontCssTemplate.js");

module.exports = {
    //assetPrefix: ".", // Could be used to fix wrong assets path when using static html generation
    //basePath: "/folder", // Could be needed if we deploy under a sub-path of a domain
    devIndicators: {
        autoPrerender: true,
    },
    webpack: (config, options) => {

        // We compile SVG font only on dev
        if (options.dev) {
            config.plugins.push(
                new IconfontPlugin({
                    src: "_sources/font_svg",
                    family: "font-icons",
                    dest: {
                        font: "public/fonts/[family].[type]",
                        css: "styles/[family].scss"
                    },
                    watch: {
                        pattern: "_sources/font_svg/*.svg"
                    },
                    cssTemplate: customCssTemplate
                })
            );
        }

        return config;
    }
};