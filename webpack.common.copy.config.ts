import * as webpack from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";

const COMMON_COPY_CONFIG = {
    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'manifest.json'
            },
            {
                from: 'assets',
                to: 'assets'
            }
        ])
    ]
};

export default COMMON_COPY_CONFIG;