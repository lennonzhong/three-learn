const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { webpack } = require("webpack");
module.exports = {
  mode: "development",
  entry: "./vr.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash:6].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      hash: true,
      chunks: ["main"],
    }),
  ],
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100,
            },
          },
        ],
      }
    ],
  },
  devServer: {
    port: 8080,
    hot: true,
    open: true,
  },
};
