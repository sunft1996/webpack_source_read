// const config = require('./test-hot/webpack.config')
// module.exports = config
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
  mode: 'production',
  entry: {
    // test: './test/index.js',
    // testVue: './test-vue/main.js',
    testAssets: './test-assets/index.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        // type: 'asset/inline',
        // type: 'asset/resource'
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
        exclude: /node_modules/,

      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
        exclude: /node_modules/
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
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      TWO: '1+1',
      TWO1: 1+1,
      'typeof window': JSON.stringify('object'),
    })
  //   new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackPlugin({
    //   template: './test-vue/index.html',
    //   filename: 'index.html' // 生成的文件名
    // }),
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
