const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

module.exports = {
  entry: ['regenerator-runtime', './client/index.js'],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html'
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: 'bundle.js'
    })
  ],
  resolve: {
    modules: [
      'node_modules',
      'client'
    ],
    extensions: ['.js']
  }
}