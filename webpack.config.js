const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "./js/bundle.js",
    path: path.resolve(__dirname, "/build"),
    clean: true,
    environment: {
      arrowFunction: false,
    },
    assetModuleFilename: "./img/[name][ext]",
  },
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Weather in your city",
      template: "./index.html",
      favicon: "./src/img/favicon.ico",
    }),
    new MiniCssExtractPlugin({
      filename: "./styles/styles.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dev"),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
};
