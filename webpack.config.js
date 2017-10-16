const webpack = require('webpack');

module.exports = {
    entry: './src/index.ts',
    target: 'node',
    output: {
        libraryTarget: 'commonjs',
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [{
            test: /\.ts$/, 
            loader: 'ts-loader',
            exclude: /node_modules/
        }]   
    }
}