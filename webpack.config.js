const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const SemiPlugin = require("@douyinfe/semi-webpack-plugin").default;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    ...defaultConfig,

    entry: {
        index: './src/index.jsx'
    },

    output: {
        filename: '[name].js',
        path: __dirname + '/build',
        publicPath: "auto",
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },

            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },

            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },

            {
                test: /\.svg$/,
                use: ["file-loader"]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    externals: {
        react: "React",
        "react-dom": "ReactDOM",
        "@wordpress/element": "wp.element"
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),

        new SemiPlugin({
            cssLayer: true
        }),

        // ⭐ FIXED MODULE FEDERATION ⭐
        new ModuleFederationPlugin({
            name: "authpress",
            filename: "remoteEntry.js",

            // ⬇ REMOTES MUST BE DEFINED HERE
            remotes: {
                authpresspro: `authpresspro@../../wp-content/plugins/authpress-pro/build/remoteEntry.js"}`
            },

            // Shared deps
            shared: {
                react: { singleton: true, requiredVersion: false },
                "react-dom": { singleton: true, requiredVersion: false }
            }
        })
    ]
};
