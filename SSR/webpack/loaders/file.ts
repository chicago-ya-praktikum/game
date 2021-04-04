const fileRegex = /^(?!.*\.inline).*\.(svg|jpe?g|png|gif|eot|woff2?|ttf)$/

export const fileLoader = {
    client: {
        test: fileRegex,
        include: '/src/assets',
        use: {
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]',
                outputPath: '/dist'
            }
        }
    },
    server: {
        loader: 'null-loader',
        test: fileRegex
    }
}
