/* eslint-disable no-undef */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Maverick Compact Text Editor",
      }),

      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "./src-sw.js",
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Maverick Compact Text Editor",
        short_name: "MaverickTextEditor",
        description:
          "This is the Maverick Compact Text Editor. It is a very cool text editor. You should definately install it into your system",
        background_color: "#272822",
        theme_color: "#272822",
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
          {
            src: path.resolve("favicon.ico"),
            sizes: [48],
            destination: path.join("assets", "icons"),
          },
          {
            src: path.resolve("src/images/apple.png"),
            sizes: [180],
            destination: path.join("assets", "icons"),
          },
          {
            src: path.resolve("src/images/maskable_icon.png"),
            sizes: [128, 256, 512],
            destination: path.join("assets", "icons"),
            purpose: "maskable",
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
