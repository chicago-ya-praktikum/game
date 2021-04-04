// eslint-disable-next-line import/no-extraneous-dependencies
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const {IS_DEV} = require('../env')

export const cssLoader = {
    client: {
        test: /\.s[a]ss$/i,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader'
        ]
        
        
        // test: /\.s[a]ss$/i,
        // use: [
        //     IS_DEV && 'css-hot-loader',
        //     MiniCssExtractPlugin.loader,
        //     'style-loader',
        //     'css-loader',
        //     'sass-loader'
        // ]// .filter(Boolean)
    },
    server: {
        test: /\.s[a]ss$/i,
        loader: 'null-loader'
    }
}
