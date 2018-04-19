const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const cssnano = require('cssnano');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = require('./config');
const baseConfig = require('./base');

module.exports = merge(baseConfig, {
  output: {
    path: path.join(config.root, 'dist'),  // 所有输出文件的目标路径，必须是绝对路径
    filename: 'js/[name].[chunkhash:8].js', // 出口文件名
    publicPath: '/'
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    // 指定生产环境
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // 压缩js文件
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // 压缩css文件
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    // 提取公共代码的插件，用于提取多个入口文件的公共脚本部分
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'js/vendors.js'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'js/manifest.js'
    }),


    // 清除dist文件夹
    new CleanWebpackPlugin(
      ['dist/*'],　 //匹配删除的文件
      {
        root: path.resolve(__dirname, '..'),  //webpack.config的地址
        verbose: true,   //开启在控制台输出信息
        dry: false,   //启用删除文件
        exclude: ['files', 'to', 'ignore'],//排除不删除的目录，主要用于避免删除公用的文件
      }
    ),
    // 为组件和模块分配ID，将最短ID分配给频率高的模块
    new webpack.optimize.OccurrenceOrderPlugin(),

  ]
})