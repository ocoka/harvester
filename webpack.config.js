const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const webpack = require('webpack');
//return config
module.exports = (env, argv) => {
  if (argv == null) {
    argv = env;
    env = {};
  }
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
      //publicPath: argv.mode === 'production' ? 'dist/' : '',
    },

    resolve: {
      alias: { '@': path.resolve(__dirname, 'src/') },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.styl', '.scss'],
    },

    devtool: argv.mode === 'production' ? false : 'module-nosources-source-map',

    module: {
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
      // new InlineManifestWebpackPlugin(),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 9000
    }
  };
};
