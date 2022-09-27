const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.join(__dirname, "/../../static/react-app"), //Points to the django static folder
    filename: "bundle.js"
  },
  target: "web",
  devServer: {
    port: 5000,
    static: [path.join(__dirname, "/../../static/react-app")],
    open: true,
    hot: true,
    liveReload: true,
  },
  /* optimization: {
    runtimeChunk: 'single',
  }, */
  plugins: [new webpack.HotModuleReplacementPlugin()]
};