const IconfontPlugin = require("iconfont-plugin-webpack");
const customCssTemplate = require("./utils/fontCssTemplate.js");


module.exports = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    devIndicators: {
        autoPrerender: true,
    },
    images: {
        formats: ['image/webp'],
        unoptimized: true,
    },
    webpack: (config, options) => {

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

        return config;
    }
};