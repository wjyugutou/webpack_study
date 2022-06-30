const path = require('path')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.cjs')

module.exports = merge(common, {
  module: {
    rules: [{
      oneOf: [
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', {
          // postcss-loader 配合 package.json中的browserlist处理兼容性问题
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env',
                ],
              },
            },
          }, 'less-loader'],
        },
        {
          test: /\.(jpe?g|png|svg|gif|webp)$/,
          type: 'asset',
          parser: {
            dataUrlcondition: {
              maxSize: 10 * 1024,
            },
          },
        },
        {
          test: /\.tsx?$/,
          use: [{
            loader: 'babel-loader',
            options: {
              plugins: ['react-refresh/babel'],
            },
          }],
          include: path.resolve(__dirname, '../src'),
        }],
    }],
  },
  plugins: [
    new ReactRefreshPlugin(),
    new ESLintWebpackPlugin({
      exclude: 'node_modules',
    }),
  ],
  devServer: {
    port: 3000,
    host: 'localhost',
    hot: true,
  },
  devtool: 'cheap-module-source-map',
  mode: 'development',
})
