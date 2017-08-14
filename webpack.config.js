const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require("path");
const nodeEnv = process.env.NODE_ENV || "development";
const isProd = nodeEnv === "production";


var config = {
    devtool: isProd ? "hidden-source-map" : "source-map",
    context: path.resolve("./src"),
    entry: {
        app: ["./main.tsx",  "./main.scss"]
    },
    output: {
        path: path.resolve("./dist"),
        filename: "[name].bundle.js",
        sourceMapFilename: "[name].bundle.map",
        devtoolModuleFilenameTemplate: function (info) {
            return "file:///" + info.absoluteResourcePath;
        }
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.tsx?$/,
                exclude: ["node_modules"],
                use: ["ts-loader", "source-map-loader"]
            },
            {test: /\.html$/, loader: "html-loader"},
            {test: /\.css$/, loaders: ["style-loader", "css-loader"]},
            { // sass / scss loader for webpack
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }
        ],

    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".scss"]
    },
    plugins: [
        new ExtractTextPlugin({ // define where to save the file
            filename: '[name].bundle.css',
            allChunks: true,
        }),
        new webpack.DefinePlugin({
            "process.env": {
                // eslint-disable-line quote-props
                NODE_ENV: JSON.stringify(nodeEnv)
            }
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "vendor",
        //     minChunks: Infinity,
        //     filename: "vendor.bundle.js"
        // }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            output: {comments: false},
            sourceMap: true
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    failOnHint: true
                }
            }
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "./"),
        compress: true,
        port: 3000,
        hot: true
    }
};

module.exports = config;