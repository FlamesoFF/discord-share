import webpack from "webpack";
import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import TerserPlugin from 'terser-webpack-plugin';
import { VueLoaderPlugin } from "vue-loader";

console.log(process.env.NODE_ENV);

const src = 'src',
    dist = 'dist',
    prod = 'prod',
    dev = process.env.NODE_ENV === 'development';

const COMMON_CONFIG: webpack.Configuration = {
    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                sourceMap: dev,
                terserOptions: {
                    ecma: '8',
                    // mangle: false,
                    // ie8: false,
                    // keep_classnames: true,
                    // keep_fnames: true
                }
            })
        ],
        minimize: !dev
    }
};

if (dev) {
    COMMON_CONFIG.devtool = 'cheap-source-map';
}

export default <webpack.Configuration[]>[
    /**
     * CONTENT
     */
    {
        mode: process.env.NODE_ENV,

        entry: {
            content: `./${src}/content.ts`,
            background: `./${src}/background.ts`
        },

        output: {
            path: path.join(__dirname, `./${dev ? dist : prod}`),
            // path: path.join(__dirname, './dist'),
            filename: '[name].js'
        },

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
    },

    /**
     * OPTIONS PAGE
     */
    {
        mode: process.env.NODE_ENV,

        entry: {
            options: `./${src}/options/index.ts`,
        },

        output: {
            path: path.join(__dirname, `./${dev ? dist : prod}/options`),
            filename: 'options.js'
        },

        target: "web",

        module: {
            rules: [
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
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                vue$: 'vue/dist/vue.esm.js'
            }
        },

        plugins: [
            new CopyWebpackPlugin([
                {
                    from: './src/options/index.html'
                }
            ]),
            new VueLoaderPlugin()
        ],

        watch: true
    },

    /**
     * APP
     */
    {
        mode: process.env.NODE_ENV,

        entry: {
            share: `./${src}/share-window/index.ts`
        },

        output: {
            path: path.join(__dirname, `./${dev ? dist : prod}/share-window`),
            filename: 'share.js'
        },

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
    }
].map(cfg => Object.assign(cfg, COMMON_CONFIG));