import * as webpack from "webpack";
import * as path from "path";
import * as CopyWebpackPlugin from "copy-webpack-plugin";

const config: webpack.Configuration = {
    mode: 'development',

    entry: {
        content: './src/content.ts',
        background: './src/background.ts'
    },

    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js'
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
            }
        ],
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    plugins: [
        new CopyWebpackPlugin([
            {
                from: `./manifest.json`
            },
            {
                from: './assets',
                to: 'assets'
            }
        ])
    ],

    watch: true
};

export default config;