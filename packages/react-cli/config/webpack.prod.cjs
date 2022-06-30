const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.cjs')

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[contenthash:10].js',
    chunkFilename: 'static/js/[name].chunk.js',
    assetModuleFilename: 'static/assets/[name][ext][query]',
    clean: true,
  },
  module: {
    rules: [{
      oneOf: [
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', {
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
          }],
          include: path.resolve(__dirname, '../src'),
        }],
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:10].css',
      chunkFilename: 'static/css/[name].[contenthash:10].chunk.css',
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      // 图片压缩
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                'svgo',
                {
                  plugins: [
                    'preset-default',
                    'prefixIds',
                    {
                      name: 'sortAttrs',
                      params: {
                        xmlnsOrder: 'alphabetical',
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      // node_modukes 公共模块单独分出文件
      cacheGroups: {
        react: {
          test: (module) => {
            return module.resource?.includes('node_modules') && module.resource?.includes('react')
          },
          name: 'chunk-react',
          // 权重
          priority: 40,
        },
        lib: {
          test: module => module.resource?.includes('node_modules'),
          name: 'chunk-libs',
        },
      },
    },
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`,
    },
  },
  devtool: 'source-map',
  mode: 'production',
})
