import webpack, {Configuration} from 'webpack'

export const getCommonConfig  = (side: 'client' | 'server'): Configuration => {
    let IS_SERVER = side === 'server'
    let IS_CLIENT = side === 'client'

    return {
        name: side,
        plugins: [
            new webpack.DefinePlugin({
                IS_CLIENT: JSON.stringify(IS_CLIENT),
                IS_SERVER: JSON.stringify(IS_SERVER),
                IS_SSR: JSON.stringify(true),
                'typeof window': JSON.stringify(IS_CLIENT ? 'object' : 'undefined')
            })
        ],
        devtool: 'source-map'
    }
}
