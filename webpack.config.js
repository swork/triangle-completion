const path = require('path');

const commonConfig = {
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
    }
};

const serverConfig = {
    ...commonConfig,
    target: 'node',
    entry: {
        common: {
            import: './src/common.js',
            filename: './common.js',
            library: {
                type: 'commonjs2'
            }
        },
        sss: {
            import: './src/sss.js',
            filename: './sss.js',
            library: {
                type: 'commonjs2'
            }
        },
        ssa: {
            import: './src/ssa.js',
            filename: './ssa.js',
            library: {
                type: 'commonjs2'
            }
        },
        sas: {
            import: './src/sas.js',
            filename: './sas.js',
            library: {
                type: 'commonjs2'
            }
        },
        asa: {
            import: './src/asa.js',
            filename: './asa.js',
            library: {
                type: 'commonjs2'
            }
        },
        aas: {
            import: './src/aas.js',
            filename: './aas.js',
            library: {
                type: 'commonjs2'
            }
        },
        index: {
            import: './src/trig.js',
            filename: './index.js',
            library: {
                type: 'commonjs2'
            }
        },
    }

    /*
    entry: './src/trig.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: {
            type: 'commonjs2'
        }
    },
    */
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        serverConfig.devtool = 'eval-source-map';
    }
    return serverConfig;
};
