const webpackNodeExternals = require("webpack-node-externals");
const path = require("path");
module.exports = {
  entry: "./index.ts",
  target: "node",
  mode: "production",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: { extensions: [".ts", ".js"] },
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
      },
    ],
  },
};
