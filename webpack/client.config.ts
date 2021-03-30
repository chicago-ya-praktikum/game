import path from 'path'
import {Configuration, WebpackPluginInstance as Plugin, Entry} from 'webpack'
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import LoadablePlugin from '@loadable/webpack-plugin';
import cssLoader from './loaders/css'
import jsLoader from './loaders/js'
import fileLoader from './loaders/file'
import {DIST_DIR, IS_DEV, SRC_DIR} from './env'

export const config: Configuration = {
    entry: ([
        IS_DEV && 'react-hot-loader/patch',
        // IS_DEV && 'webpack-hot-middleware/client',
        IS_DEV && 'css-hot-loader/hotModuleReplacement',
        path.join(SRC_DIR, 'client')
    ].filter(Boolean) as unknown) as Entry,
    module: {
        rules: [fileLoader.client,
            cssLoader.client,
            jsLoader.client,        
            {
                test: /\.ts[x]$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
              }]
    },
    output: {
        path: DIST_DIR,
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        modules: ['src', 'node_modules'],
        alias: {'react-dom': '@hot-loader/react-dom'},
        extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
        plugins: [new TsconfigPathsPlugin({configFile: './tsconfig.json'})]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '[name].css'}),
        !IS_DEV && new CompressionPlugin(),
        new LoadablePlugin()
    ].filter(Boolean) as Plugin[],

    devtool: 'source-map',

    performance: {
        hints: IS_DEV ? false : 'warning'
    }
}
