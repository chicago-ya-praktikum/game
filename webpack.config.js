const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        writeToDisk: true,
        hot: true,
        overlay: true,
        open: true
    },
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s[a]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './www/index.html'
        })
    ]
}
