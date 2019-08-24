import * as webpack from "webpack";
import * as path from "path";
import WebpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from "html-webpack-plugin";
import COMMON_DEV_CONFIG from "./webpack.common.dev.config";
import COMMON_COPY_CONFIG from "./webpack.common.copy.config";

const src = 'src';
const dist = 'dist';

const config: webpack.Configuration[] = [
    /**
     * CONTENT
     */
    WebpackMerge({
        entry: {
            content: `./${src}/content/content.ts`,
            background: `./${src}/background/background.ts`
        },

        output: {
            path: path.join(__dirname, `./${dist}`),
            filename: '[name].js'
        }

//@ts-ignore
    }, COMMON_DEV_CONFIG, COMMON_COPY_CONFIG),

    /**
     * OPTIONS PAGE
     */
    WebpackMerge({
        entry: `./${src}/options/index.ts`,

        output: {
            path: path.join(__dirname, `./${dist}/options`),
            filename: 'options.js'
        },

        plugins: [
            new HtmlWebpackPlugin({
                title: 'Options',
                template: `./${src}/options/index.html`,
                filename: `options.html`,
                inject: 'body'
            })
        ]
    }, COMMON_DEV_CONFIG),

    /**
     * Share window
     */
    WebpackMerge({
        entry: `./${src}/share-window/index.ts`,

        output: {
            path: path.join(__dirname, `./${dist}/share-window`),
            filename: 'share.js'
        },

        plugins: [
            new HtmlWebpackPlugin({
                title: 'Share-window',
                template: `./${src}/share-window/index.html`,
                filename: `share.html`,
                inject: 'body'
            })
        ]
    }, COMMON_DEV_CONFIG)
];

export default config;