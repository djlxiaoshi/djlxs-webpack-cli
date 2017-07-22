var path = require('path')
var webpack = require('webpack')
var  HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var extractCss = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development" // 开发环境中不会生成独立的CSS文件
});

// 提取公共模块
var commonsChunkPlugin =  new webpack.optimize.CommonsChunkPlugin({
    name: "common",
    filename: "js/common.js",
    chunks: ['index', 'detail']
});

console.log('环境变量', process.env.NODE_ENV)



module.exports = {
    entry: {
        main: './src/main.js',
        demo: './src/js/demo.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
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
                test: /\.js$/,
                // 排除node_modules目录下的文件, npm安装的包不需要编译
                exclude: /node_modules/,
                use: ['babel-loader']
            },
           /* // ts配置
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
*/
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
                use: extractCss.extract({
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
        extractCss,
        // commonsChunkPlugin,
        new webpack.ProvidePlugin({
            // $: 'jQuery'  // 暴露模块在全局中
        })
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
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            // 'jQuery': path.resolve(__dirname, './src/lib/jquery-3.2.1.min.js')  // 加载第三方模块
        }
    }
};
