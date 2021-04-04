const path = require('path')
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin')
// eslint-disable-next-line import/no-extraneous-dependencies
const CopyPlugin = require('copy-webpack-plugin')
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack')

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
    entry: './SPA/index.tsx',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.png']
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
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                include: '/src/assets',
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        outputPath: '/dist'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './www/index.html')
        }),
        new CopyPlugin({
            patterns:
            [
                {
                    from: './src/assets', to: 'assets'
                }
            ]
        }),
        new webpack.DefinePlugin({
            IS_CLIENT: JSON.stringify(true),
            IS_SERVER: JSON.stringify(false)
        })
    ]
}