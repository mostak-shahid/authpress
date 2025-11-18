const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const SemiPlugin = require("@douyinfe/semi-webpack-plugin").default;
module.exports = {
    ...defaultConfig,
    entry: {
        index: './src/index.jsx'
        // index: "./src/admin/index.js",
    },
  
    output: {
        filename: '[name].js', // Output files will be named after the entry point keys
        path: __dirname + '/build', // Output directory
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
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.scss$/i,  // Add SCSS support
            use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
            test: /\.svg$/,
            use: ["file-loader"],
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            type: 'asset/resource',
            use: ["file-loader"],
        },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new SemiPlugin({
            cssLayer: true,
        })
    ],
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        '@wordpress/element': 'wp.element'
    }

};
