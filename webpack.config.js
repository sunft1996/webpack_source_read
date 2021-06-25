const path = require('path')

const config = {
  mode: 'development',
  entry: {
    test: './test/index.js',
  },
  output: {
    filename: '[name].[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  recordsInputPath: path.join(__dirname, 'records.json'),
  recordsOutputPath: path.join(__dirname, 'newRecords.json'),
  
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
