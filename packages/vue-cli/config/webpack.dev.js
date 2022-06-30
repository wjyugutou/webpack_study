import ESLintWebpackPlugin from 'eslint-webpack-plugin'
import { merge } from 'webpack-merge'
import common from './webpack.common.js'

export default merge(common, {
  module: {
    rules: [{
      oneOf: [
        {
          test: /\.less$/,
          use: ['vue-style-loader', 'css-loader', {
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
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    }, {
      test: /\.vue?$/,
      loader: 'vue-loader',
    }],
  },
  plugins: [
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
