const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  // 模式
  mode: 'production',
  // source map 配置
  devtool: 'cheap-module-source-map',
  // 入口文件，从那个位置打包
  entry: './src/main.js',
  // 打包后的输出篇日志
  output: {
    path: resolve(__dirname, '../dist'), // 输出路径 相对路径
    // 输出 打包后 entry指定的文件的名称及路径 xx/代表路径
    filename: 'bundle.js', // 输出文件名称 开发环境可以不指定
    chunkFilename: 'static/js/[name].js',
    // 与filename一样控制文件打包后的输出名称及路径 只针对
    // rule.type===assets|asset/resource|asset/inline|asset/source
    assetModuleFilename: 'static/[name][ext][query]',
    // 每次打包都先删除dist的内容
    clean: true,
  },
  // resolve: {
  //   extensions: ['.less', '.css', '...'], // 不想写文件后缀就在这里配一下
  // },
  // resolveLoader: {
  //   modules: ['node_modules'] // 去那个文件里找 loader 不配置默认node_modules
  // },
  plugins: [
    new ESLintPlugin(),
    // css 压缩
    // 会创建新的index.html文件覆盖之前的
    new HtmlWebpackPlugin({
      // 配置template参数 会保留旧文件内容
      template: resolve(__dirname, '../public/index.html'),
    }),
  ],

}
