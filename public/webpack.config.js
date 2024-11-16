const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: {
        // login: './public/src/scripts/login.js',
        signup: './src/scripts/signup.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'scripts/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loadder',
                options: {
                    name: 'assets/images/[name].[ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/fonts/[name].[ext]'
                }
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './public/src/pages/login.html',
        //     filename: 'login.html',
        //     chunks: ['login']
        // }),
        new HtmlWebpackPlugin({
            template: './src/pages/signup.html',
            filename: 'signup.html',
            chunks: ['signup']
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public/dist')
        },
        // contentBase: path.join(__dirname, 'src'),
        port: 8020
    }
}