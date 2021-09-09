const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const config = {
  mode: 'development',
  entry: {
    // test: './test/index.js',
    testVue: './test-vue/main.js',
    // testAssets: './test-assets/index.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
    ]
  },
  optimization: {
    // runtimeChunk: {
      // name: 'runtime',
    // },
  },
  plugins: [
    new VueLoaderPlugin(),
  //   new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './test-vue/index.html',
      filename: 'index.html' // 生成的文件名
    }),
  ],
  // devServer: {
  //   hot: true,
  //   contentBase: path.join(__dirname, 'dist'),
  //   port: 8888,
  //   https: false,
  //   open: false
  // },
}


module.exports = config
