import * as path from "path";
import * as webpack from "webpack";
import * as CopyWebpackPlugin from "copy-webpack-plugin";
import {VueLoaderPlugin} from "vue-loader";

const config: webpack.Configuration = {
    mode: 'development',

    entry: {
        share: './src/share-window/share.js'
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
                test: /\.ts$/,
                loader: 'ts-loader'
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
        extensions: ['.ts', '.js', '.vue'],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },

    plugins: [
        new CopyWebpackPlugin([
            {
                from: './src/share-window/share.html'
            }
        ]),
        new VueLoaderPlugin()
    ],

    watch: true
};

export default config;