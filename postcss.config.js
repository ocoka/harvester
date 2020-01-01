const path = require('path');
const assetsPath = [path.resolve(__dirname, "./src"), path.resolve(__dirname,"./src/assets")];
module.exports = {
  plugins: [
    require("postcss-url")([
       {
        filter: [
          "**/*.svg",
          "../**/*.svg",
        ],
        url: "inline",
        basePath: assetsPath,
        encodeType: "encodeURIComponent",
        maxSize: 5,
        optimizeSvgEncode: true,
        fallback: "copy",
        assetsPath: "assets",
        useHash: true
      },
      {
        url: "copy",
        basePath: assetsPath,
        assetsPath: "assets",
        useHash: true
      }
    ]),
    require("autoprefixer")({
      remove: true
    }),
    require("cssnano")({
      preset: ['default', {
        reduceIdents: {
          keyframes: false
        },
        discardUnused: {
          keyframes: false
        },
        'z-index': true,
        svgo: {
          convertStyleToAttrs: false
        }
      }]
    })
  ]
};
