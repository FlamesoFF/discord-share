import * as webpack from "webpack";
import WebpackMerge from 'webpack-merge';
import COMMON_CONFIG from "./webpack.common.config";

const COMMON_DEV_CONFIG = WebpackMerge(<webpack.Configuration>{
    mode: 'development',
    devtool: 'inline-source-map',
    watch: true
}, COMMON_CONFIG);

export default COMMON_DEV_CONFIG;