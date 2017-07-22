var path = require('path')
var webpack = require('webpack')
var  HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development" // 开发环境中不会生成独立的CSS文件
});

console.log('环境变量', process.env.NODE_ENV)



module.exports = {
    entry: {
        index: './src/index.ts'
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },

            {
                test:  /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 20000
                    }
                }]
            },
            {
                test: /\.styl$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "stylus-loader"
                    }],
                    // 在开发环境使用 style-loader
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack TypeScript',
            favicon: 'favicon.ico',
            template: './index.html' // 基础html模板
        }),
        extractSass
    ],
    devServer: {
        // 配置监听端口
        port: 8080,
        /*
         historyApiFallback用来配置页面的重定向
         配置为true, 当访问的文件不存在时, 返回根目录下的index.html文件
         */
        historyApiFallback: true
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
