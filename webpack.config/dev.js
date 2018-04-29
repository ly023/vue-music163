const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const config = require('./config');
const baseConfig = require('./base');

module.exports = merge(baseConfig, {
  output: {
    path: path.join(config.root, 'dist'),  // 所有输出文件的目标路径，必须是绝对路径
    filename: '[name].js',  // 出口文件名
    publicPath: '/'
  },
  devServer: {
    inline: true, // 文件改变自动刷新页面
    port: config.port
  },
  devtool: 'cheap-module-eval-source-map', // 用于标记编译后的文件与编译前的文件对应位置，便于调试
  plugins: [
    // webpack内置的插件，添加热替换插件，每次改动文件不会再整个页面都刷新
    new webpack.HotModuleReplacementPlugin(),

  ]
});
