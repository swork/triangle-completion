const path = require('path');

const commonConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
};

const serverConfig = {
    ...commonConfig,
    target: 'node',
    entry: './src/trig.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: {
            type: 'commonjs2'
        }
    },
};

module.exports = [ serverConfig ];
