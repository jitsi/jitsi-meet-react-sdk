const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: __dirname + "/index.js",
  output: {
    filename: "index.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/index.html",
      inject: 'body'
    })
  ],
  devServer: {
    static: './',
    port: 5002
  } 
};