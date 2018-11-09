const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: [
    path.resolve(__dirname, './src/index.js'),
    path.resolve(__dirname, './src/styles/main.scss'),
  ],
  output: {
    path: path.resolve(__dirname, './public/dist/'),
    filename: '[name].bundle.js',
    publicPath: '/dist/',
  },
  devServer: {
    contentBase: 'public/',
    watchContentBase: true,
    historyApiFallback: true,
    compress: true,
    hot: true,
    inline: true,
    port: 8081
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, './node_modules'),
        use: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.svg?$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],
};