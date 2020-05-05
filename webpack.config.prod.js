const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // Creating entry point for client
    mode: 'production',
    entry: "./src/client/index.js",
    output: {},
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: "/\.js$/",
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html"
        })
    ]
}