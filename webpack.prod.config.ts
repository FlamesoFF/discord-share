import * as webpack from "webpack";
import * as path from "path";
import WebpackMerge from 'webpack-merge';
import {COMMON_PROD_CONFIG} from "./webpack.common.prod.config";
import COMMON_COPY_CONFIG from "./webpack.common.copy.config";

const src = 'src';
const prod = 'prod';

const config : webpack.Configuration[] = [
    /**
     * CONTENT
     */
    WebpackMerge({
        entry: {
            content: `./${src}/content.ts`,
            background: `./${src}/background.ts`
        },

        output: {
            path: path.join(__dirname, `./${prod}`),
            filename: '[name].js'
        }
    }, COMMON_PROD_CONFIG, COMMON_COPY_CONFIG),

    /**
     * OPTIONS PAGE
     */
    WebpackMerge({
        entry: {
            options: `./${src}/options/index.ts`,
        },

        output: {
            path: path.join(__dirname, `./${prod}/options`),
            filename: 'options.js'
        }
    }, COMMON_PROD_CONFIG),

    /**
     * APP
     */
    WebpackMerge({
        entry: {
            share: `./${src}/share-window/index.ts`
        },

        output: {
            path: path.join(__dirname, `./${prod}/share-window`),
            filename: 'share.js'
        },

    }, COMMON_PROD_CONFIG)
];

export default config;