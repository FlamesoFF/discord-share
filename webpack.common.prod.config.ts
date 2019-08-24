import * as webpack from "webpack";
import TerserPlugin from 'terser-webpack-plugin';
import WebpackMerge from 'webpack-merge';
import COMMON_CONFIG from "./webpack.common.config";

const COMMON_PROD_CONFIG: webpack.Configuration = WebpackMerge({
    mode: 'production',

    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                sourceMap: false,
                terserOptions: {
                    ecma: '8',
                    // mangle: false,
                    // ie8: false,
                    // keep_classnames: true,
                    // keep_fnames: true
                }
            })
        ],
        minimize: true
    }
}, COMMON_CONFIG);

export {COMMON_PROD_CONFIG};