import {Entry} from 'webpack'
import {Configuration} from 'webpack'
import {DIST_DIR, IS_DEV, SRC_DIR} from './env'
import {cssLoader} from './loaders/css'
import {fileLoader} from './loaders/file'
import {jsLoader} from './loaders/js'
import path from 'path'
import CopyPlugin from 'copy-webpack-plugin'
import {getCommonConfig} from './common.config'
import {merge} from 'webpack-merge'

export const config: Configuration = merge(getCommonConfig('client'), {
    entry: ([
        '@babel/polyfill', 
        IS_DEV && 'react-hot-loader/patch',
        IS_DEV && 'css-hot-loader/hotModuleReplacement',
        path.join(SRC_DIR, 'client'),
    ].filter(Boolean) as unknown) as Entry,
    output: {
        path: DIST_DIR,
        filename: 'client.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.png']
    },
    module: {
        rules: [
            jsLoader.client,
            cssLoader.client,
            fileLoader.client
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns:
            [
                {
                    from: './src/assets', to: 'assets'
                }
            ]
        })
    ]
})
