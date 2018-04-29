const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const cssnano = require('cssnano');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

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
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // 压缩js文件
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false // 忽略警告
      }
    }),
    // 压缩css文件
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),
    // 提取公共代码的插件，用于提取多个入口文件的公共脚本部分
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'js/vendors.js'
    }),
    // 拆分公共资源
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/common.js',
      minChunks: 3
    }),
    // 单独拆分 webpack 自身代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'js/manifest.js',
      minChunks: Infinity
    }),
    // 开启 gzip
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html|css)$/,
      threshold: 10240, // 只处理比这个值大的资源。按字节计算
      minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
    }),
    // 清除dist文件夹
    new CleanWebpackPlugin(
      ['dist'],　 // 匹配删除的文件
      {
        root: path.resolve(__dirname, '..'),
        verbose: true,  // Write logs to console.
        dry: false,    // Default: false - remove files
        // exclude: ['dll'], // 排除不删除的目录，主要用于避免删除公用的文件
      }
    ),
    // 为组件和模块分配ID，将最短ID分配给频率高的模块
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
})