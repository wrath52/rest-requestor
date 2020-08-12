const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const paths = {
  output: path.join(__dirname, "build"),
  entry: path.join(__dirname, "index"),
};

module.exports = {
  target: "web",
  entry: paths.entry,
  mode: "development",
  stats: "errors-only",
  plugins: [new HtmlWebpackPlugin()],
  output: {
    path: paths.output,
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  devServer: {
    port: 9000,
    compress: true,
    contentBase: paths.output,
    proxy: {
      "/api": {
        secure: true,
        changeOrigin: true,
        target: "https://europaplus.ru",
      },
    },
  },
};
