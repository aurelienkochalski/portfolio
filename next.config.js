const IconfontPlugin = require("iconfont-plugin-webpack");
const customCssTemplate = require("./font_svg/_customCssTemplate.js");

module.exports = {
    //assetPrefix: ".", // Could be used to fix wrong assets path when using static html generation
    //basePath: "/folder", // Could be needed if we deploy under a sub-path of a domain
    devIndicators: {
        autoPrerender: true,
    },
    webpack: (config, options) => {

        config.plugins.push(
            new IconfontPlugin({
                src: "font_svg",
                family: "font-icons",
                dest: {
                    font: "public/fonts/[family].[type]",
                    css: "styles/[family].scss"
                },
                watch: {
                    pattern: "font_svg/*.svg"
                },
                cssTemplate: customCssTemplate
            })
        );

        return config;
    }
};