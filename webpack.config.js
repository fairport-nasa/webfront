// Import modules.
const CopyPlugin = require(`copy-webpack-plugin`);
const path = require(`path`);
require(`dotenv`).config();

module.exports = {
    entry: `./src/client/scripts/main.ts`,
    devtool: `inline-source-map`,
    mode: process.env.NODE_ENV === `prod` ? `production` : `development`,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: `ts-loader`,
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        filename: `webpack.bundle.js`,
        path: path.resolve(__dirname, `dist/client/public`),
        clean: true
    },
    resolve: {
        extensions: [`.tsx`, `.ts`, `.js`],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, `src/client/public`), to: path.resolve(__dirname, `dist/client/public`) },
                { from: path.resolve(__dirname, `src/client/views`), to: path.resolve(__dirname, `dist/client/views`) },
            ],
        }),
    ]
};
