const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const webpack = require('webpack');
const pageConfig = {
  // Required
  inject: false,
  template: require('html-webpack-template'),
  // template: 'node_modules/html-webpack-template/index.ejs',

  // Optional
  appMountId: 'app',
  /*
      appMountHtmlSnippet: '<div class="app-spinner"><i class="fa fa-spinner fa-spin fa-5x" aria-hidden="true"></i></div>',
      headHtmlSnippet: '<style>div.app-spinner {position: fixed;top:50%;left:50%;}</style >',
      bodyHtmlSnippet: '<div id="app2"></div>',
      baseHref: 'http://example.com/awesome',
      devServer: 'http://localhost:3001',
      googleAnalytics: {
        trackingId: 'UA-XXXX-XX',
        pageViewOnLoad: true
      },
      */
  meta: [
    {
      name: 'description',
      content:
        'Utility for catalogue, sort, filter, and auto tags all your bookmarks with report',
    },
  ],
  // mobile: true,
  // lang: 'en-US',
  links: [
    'https://fonts.googleapis.com/css?family=Montserrat',
    {
      href: '/themes/main_theme.css',
      rel: 'stylesheet',
      id: 'theme-loader'
    }
    /*{
      href: '/apple-touch-icon.png',
      rel: 'apple-touch-icon',
      sizes: '180x180',
    },
    {
      href: '/favicon-32x32.png',
      rel: 'icon',
      sizes: '32x32',
      type: 'image/png',
    },*/
  ],
  inlineManifestWebpackName: 'runtime',
  scripts: [
    'http://localhost:35729/livereload.js'
  ],
  /*
      scripts: [
        'http://example.com/somescript.js',
        {
          src: '/myModule.js',
          type: 'module'
        }
      ],*/
  title: 'Bookmark Harvseter',
  /* window: {
    env: {
      apiHost: 'http://fosdev.apm.local/public/v1',
    },
  },*/
};
//return config
module.exports = (env, argv) => {
  if (argv == null) {
    argv = env;
    env = {};
  }
  /*   if (argv.mode === 'production') {
    pageConfig.window.env.apiHost = '/public/v1';
  } */
  console.log(`Current mode is ${argv.mode || "development"}`)
  return {

    // stats: 'verbose',
    stats: 'normal',
    mode: argv.mode || 'development',
    entry: {
      main: './src/index',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename:
        argv.mode === 'production' ? '[name].[contenthash].js' : '[name].js',

      devtoolModuleFilenameTemplate: info => {
        // let respath = info.resourcePath.split('src/');
        // respath = respath.length > 1 ? respath[1] : respath[0];
        let respath = path.relative('dist', info.resourcePath);
        if (info.query) {
          let q = info.query.split(/[&?]/);
          return path.join(q.filter(a => a.length).join('/'), respath);
        } else {
          return respath;
        }
      },
      //publicPath: argv.mode === 'production' ? 'dist/' : '',
    },

    resolve: {
      alias: { '@': path.resolve(__dirname, 'src/') },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.styl', '.scss'],
    },

    devtool: argv.mode === 'production' ? false : 'module-nosources-source-map',

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: path.resolve('node_modules'),
        },
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          options: {
            useBabel: true,
            useCache: true,
            babelCore: '@babel/core',
          },
        },

        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                outputPath: 'assets/'
              }
            }
          ]
        },
        {
          test: /assets\/img\/.*\.png$/,
          use: {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/',
            }
          }
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
          libs: {
            test: /src\/libs\//,
            name: 'libs',
            chunks: 'all',
          },
        },
      },
      runtimeChunk: 'single',
      noEmitOnErrors: true,
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      // new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename:
          argv.mode === 'production'
            ? '[name].[contenthash].css'
            : '[name].css',
      }),
      new CheckerPlugin(),
      new HtmlWebpackPlugin(
        Object.assign(pageConfig, {
          filename: 'index.html',
          chunks: ['runtime', 'vendor', 'libs', 'main'],
        })
      ),
      // new InlineManifestWebpackPlugin(),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 9000
    }
  };
};
