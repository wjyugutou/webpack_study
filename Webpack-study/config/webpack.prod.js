const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// 图片压缩
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  plugins: [
    // 提取css文件为单独css文件
    new MiniCssExtractPlugin(),
  ],
  // 配置加载器 处理除了js/json以外的文件
  module: {
    rules: [{
      oneOf: [
        {
          test: /.css$/, // 正则匹配文件名
          // use 有执行顺序 从后往前
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'], // 使用的加载器
        },
        {
          test: /.(less)$/, // 正则匹配文件名
          use: [
            MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader',
            // {
            //   loader: 'postcss-loader',
            //   options: {
            //     postcssOptions: {
            //       ident: 'postcss',
            //       plugins: [ postcssPreset() ]
            //     }
            //   }
            // }
          ], // 使用的加载器
        },
        {
          test: /.(png|jpe?g|gif|webp|svg)/, // 正则匹配文件名 图片
          // 根据type 选择webpack内置的不同loader 想用其他加载器type设为 jsvascript/auto
          // type取值 assets|asset/resource|asset/inline|asset/source
          // https://webpack.js.org/guides/asset-modules/
          type: 'asset',
          parser: {
            // 小于maxSize的文件会被专成base64
            dataUrlCondition: {
              maxSize: 1024 * 10, // 10kb以下的图片转成base64
            },
          },
          generator: {
            // 设置base64 dataUrlCondition就会生效，设置encoding则不会编码成base64
            dataUrl: {
              encoding: 'base64',
            },
            // 会覆盖 output.assetModuleFilename,只对rule.type === 'assets'/'assets/resource'生效
            // static/images表示这个规则解析的文件输出的目录 [hash]输出文件名[ext]输出文件格式
            filename: 'static/images/[name][ext]',
          },
        }],
    }],
  },
  // 优化配置
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      // css 压缩
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
  },
})
