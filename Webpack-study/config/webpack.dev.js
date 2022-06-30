const { merge } = require('webpack-merge')

const postcssPreset = require('postcss-preset-env')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 8100,
    open: true, // 自动打开浏览器
    hot: true, // 热更新
  },
  plugins: [],
  // 配置加载器 处理除了js/json以外的文件
  module: {
    rules: [{
      oneOf: [
        {
          test: /.css$/, // 正则匹配文件名
          // use 有执行顺序 从后往前
          use: ['style-loader', 'css-loader'], // 使用的加载器
        },
        {
          test: /.less$/, // 正则匹配文件名
          use: ['style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  ident: 'postcss',
                  plugins: [
                    postcssPreset(),
                  ],
                },
              },
            }, 'less-loader'], // 使用的加载器
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
            filename: '[name][ext]',
          },
        }],
    }],
  },
})
