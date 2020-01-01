const path = require('path');
const wallabyWebpack = require('wallaby-webpack');
module.exports = function (wallaby) {
  return {
    testFramework: 'jasmine',
    files: [
      { pattern: 'src/**/*.+(ts|js)', load: false }
    ],
    tests: [
      { pattern: 'tests/unit/**/*.ts', load: false }
    ],
    debug: true,
    env: {
      kind: 'chrome',
      params: {
        // runner: `--disable-gpu --disable-translate --disable-extensions --disable-background-networking --safebrowsing-disable-auto-update --disable-sync --metrics-recording-only --disable-default-apps --no-first-run --auto-open-devtools-for-tabs`
      }
    },
    compilers: {
      '**/*.ts': wallaby.compilers.typeScript({
        module: 'commonjs'
      })
    },
    postprocessor: wallabyWebpack({
      resolve: {
        alias: {
          '@': path.join(wallaby.projectCacheDir, 'src/')
        },
        extensions: ['.js', '.jsx']
      },

      module: {
        rules: [
          {
            test: /\.(png|woff2?|eot|ttf|otf|svg|styl)(\?.*)?$/,
            use: 'null'
          }
        ]
      }
    }),
    setup: function () {
      window.__moduleBundler.loadTests();
    }
  };
};
