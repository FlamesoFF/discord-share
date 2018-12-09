import * as path from "path";
import * as webpack from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";
import {VueLoaderPlugin} from "vue-loader";

const config: webpack.Configuration = {
    mode: 'development',

    entry: {
        share: './src/share-window/index.ts'
    },

    output: {
        path: path.join(__dirname, './dist/share-window'),
        filename: 'share.js'
    },

    devtool: 'source-map',

    target: "web",

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
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    },

    plugins: [
        new CopyWebpackPlugin([
            {
                from: './src/share-window/index.html'
            }
        ]),
        new VueLoaderPlugin()
    ],

    watch: true
};

export default config;