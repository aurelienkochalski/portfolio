const IconfontPlugin = require("iconfont-plugin-webpack");
const customCssTemplate = require("./font_svg/_customCssTemplate.js");

module.exports = {
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