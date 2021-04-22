import webpack, {Configuration} from 'webpack'
import path from 'path'
import {SRC_DIR} from './env'

export const getCommonConfig  = (side: 'client' | 'server'): Configuration => {
    let IS_SERVER = side === 'server'
    let IS_CLIENT = side === 'client'

    return {
        name: side,
        // resolve: {
        //     alias: {
        //         utils: path.resolve(SRC_DIR, 'utils'),
        //         types1: path.resolve(SRC_DIR, 'types')
        //     }
        // },
        plugins: [
            new webpack.DefinePlugin({
                IS_CLIENT: JSON.stringify(IS_CLIENT),
                IS_SERVER: JSON.stringify(IS_SERVER),
                'typeof window': JSON.stringify(IS_CLIENT ? 'object' : 'undefined')
            })
        ],
        devtool: 'source-map'
    }
}
