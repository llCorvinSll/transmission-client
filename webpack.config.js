const webpack = require("webpack");
const path = require("path");
const nodeEnv = process.env.NODE_ENV || "development";
const isProd = nodeEnv === "production";


var config = {
    devtool: isProd ? "hidden-source-map" : "source-map",
    context: path.resolve("./src"),
    entry: {
        app: ["./main.tsx"]
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
            {
                test: /\.css$/,
                //include: [path.join(__dirname, "./node_modules/react-toolbox/")],
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true, // default is false
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: "[name]--[local]--[hash:base64:8]"
                        }
                    },
                    "postcss-loader"
                ]
            },
        ],

    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css"]
    },
    plugins: [
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