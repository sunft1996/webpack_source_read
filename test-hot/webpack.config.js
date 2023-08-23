const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: {
    app: "./test-hot/index.js",
  },
  // devtool: "inline-source-map",
  // 不配置hot也可以启动devServer
  devServer: {
    // hot只是负责开启模块热替换，如果为false，更新代码会直接刷新整个页面
    // 设置为true，会在刷新页面前，检查是否有模块对接了HMR API，如果对接了，则只更新它的子模块
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Hot Module Replacement",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
