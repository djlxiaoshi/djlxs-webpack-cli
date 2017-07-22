var path = require('path')
var  HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: './src/index.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack TypeScript',
            favicon: 'favicon.ico',
            template: './index.html' // 基础html模板
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
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};