const path = require('path')

const config = {
  mode: 'production',
  entry: {
    app: [
      './index.js'
    ]
  },
  output: {
    filename: '[name].[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[chunkhash].js'
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ]
  },
}


module.exports = config
