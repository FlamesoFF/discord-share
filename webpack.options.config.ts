import * as path from "path";
import * as webpack from "webpack";
import * as CopyWebpackPlugin from "copy-webpack-plugin";
import {VueLoaderPlugin} from "vue-loader";

const config: webpack.Configuration = {
    mode: 'development',

    entry: {
        options: './src/options/options.js',
    },

    output: {
        path: path.join(__dirname, './dist/options'),
        filename: 'options.js'
    },

    devtool: 'source-map',

    target: "web",

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },

            {
                test: /\.js?$/,
                loader: 'babel-loader'
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
                from: './src/options/options.html'
            }
        ]),
        new VueLoaderPlugin()
    ],

    watch: true
};

export default config;