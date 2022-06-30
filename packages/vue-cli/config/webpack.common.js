import path from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import AutoImport from 'unplugin-auto-import/webpack'
import webpack from 'webpack'
const { DefinePlugin } = webpack

const __filename = fileURLToPath(import.meta.url)

// 👇️ "/home/john/Desktop/javascript"
export const __dirname = path.dirname(__filename)

export default {
  entry: './src/main.ts',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    assetModuleFilename: 'static/assets/[name][ext][query]',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    // 定义全局变量 避免警告
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
      dts: './auto-imports.d.ts',
    }),
  ],
}
