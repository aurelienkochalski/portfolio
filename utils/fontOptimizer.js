const fontSrc = "font_custom/*.ttf";
const fontDest = "public/fonts";

// List of glyphs to keep inside the optimized font, the other glyphs are discarded on build
const fontGlyphs = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ïìéèàêâùçÉÈÊÀ.,;:/\\+-_&@!?(){}[]\"'";

var Fontmin = require("fontmin");

var fontmin = new Fontmin()
    .src(fontSrc)
    .dest(fontDest)
    .use(Fontmin.glyph({
        text: fontGlyphs
    }))
    .use(Fontmin.ttf2woff({
        deflate: true
    }));
    //.use(Fontmin.ttf2woff2());
    //.use(Fontmin.ttf2eot())
    //.use(Fontmin.ttf2svg());

fontmin.run(function (err, files) {
    if (err) {
        throw err;
    }
    console.log(files);
});
