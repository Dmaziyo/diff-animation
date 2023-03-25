//webpack.config.js
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'diff-animation',
      filename: 'demo.html',
      template: 'src/demo.html' //模板页面的路径，每次html时调用的模板
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  }
}
