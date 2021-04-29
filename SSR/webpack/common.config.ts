import webpack, {Configuration} from 'webpack'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import {IS_DEV} from './env'

export const getCommonConfig  = (side: 'client' | 'server'): Configuration => {
    let IS_SERVER = side === 'server'
    let IS_CLIENT = side === 'client'

    return {
        name: side,
        resolve: {
            plugins: [new TsconfigPathsPlugin({configFile: 'tsconfig.json'})]
        },
        plugins: [
            new webpack.DefinePlugin({
                IS_CLIENT: JSON.stringify(IS_CLIENT),
                IS_SERVER: JSON.stringify(IS_SERVER),
                IS_SSR: JSON.stringify(true),
                'typeof window': JSON.stringify(IS_CLIENT ? 'object' : 'undefined'),
                IS_DEVELOPMENT: IS_DEV
            })
        ],
        devtool: 'source-map'
    }
}
