const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // js入口文件自动注入

const config = require("./config");

module.exports = {
  context: config.root, // 绝对路径，webpack 编译时的基础目录，entry 会相对于此目录查找
  entry: {
    main: './src/main.js', // 入口文件路径
    vendors: ['vue', 'vue-router', 'vuex', 'axios']  // 需要被提取为公共模块的群组
  },
  module: { // 配置loader
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true, // 提取css文件
          loaders: {
            css: ExtractTextPlugin.extract({
              use: [
                {
                  loader: 'css-loader'
                },
                {
                  loader: 'sass-loader',
                }
              ],
              fallback: 'vue-style-loader'
            })
          },
          postcss: [
            autoprefixer({
              browsers: ['last 10 Chrome versions', 'Firefox > 20', 'Safari >= 6', 'ie >= 9']
            })
          ]
        }
      },
      // 处理js中引入的css
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            }
          ],
          fallback: "style-loader"
        })
      },
      // 处理js中引入的scss
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader',
            }
          ]
        })
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules\/(?!(fe-vue-[a-zA-Z\-]+)\/).*/
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',  // 路径要与output.publicPath结合
              name: '[name].[ext]?[hash:8]'
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          outputPath: 'fonts/',
          name: '[name].[ext]?[hash:8]',
          prefix: 'font'
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      apis: path.join(config.root, 'src/apis'),
      assets: path.join(config.root, 'src/assets'),
      components: path.join(config.root, 'src/components'),
      libs: path.join(config.root, 'src/libs'),
      views: path.join(config.root, 'src/views'),
      store: path.join(config.root, 'src/store'),
      utils: path.join(config.root, 'src/utils'),
    },
    extensions: ['.js', '.vue', '.json'] // 省略后缀名
  },
  plugins: [
    // 提取css，路径相对于输出文件所在的位置
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash:8].css',
      // allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: path.join(config.root, 'dist/index.html'),  // 生成的html存放路径，相对于path
      template: path.join(config.root, 'index.html'), // 模板文件
      inject: 'body', // js的script注入到body底部
      favicon: path.join(config.root,'src/assets/images/favicon.ico'), // favicon路径
      minify: {    // 压缩HTML文件
        removeComments: true,    // 移除HTML中的注释
        collapseWhitespace: false    // 删除空白符与换行符
      },
    })
  ]
};