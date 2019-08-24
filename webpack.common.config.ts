import * as webpack from "webpack";
import {VueLoaderPlugin} from "vue-loader";
import TsconfigPathsPlugin  from 'tsconfig-paths-webpack-plugin';

const COMMON_CONFIG : webpack.Configuration = {
    target: 'web',

    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader'
            },

            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                            appendTsxSuffixTo: [/\.vue$/]
                        }
                    }
                ]
            },

            {
                test: /\.vue?$/,
                loader: 'vue-loader'
            },

            {
                test: /\.css?$/,
                use: ['style-loader', 'css-loader']
            },

            {
                test: /\.scss?$/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader']
            },

            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ],
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.vue'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        },
        plugins: [
            new TsconfigPathsPlugin({ configFile: `./tsconfig.json` })
        ]
    },

    plugins: [
        new VueLoaderPlugin()
    ]
};

export default COMMON_CONFIG;