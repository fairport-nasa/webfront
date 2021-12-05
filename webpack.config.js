const CopyPlugin = require(`copy-webpack-plugin`);
const path = require(`path`);
require(`dotenv`).config();

if (process.env.BUILD_ENV) {
    if (process.env.BUILD_ENV !== `production` && process.env.BUILD_ENV !== `development`) throw new Error(`BUILD_ENV is not properly set. Must be "production" or "development".`);
} else console.log(`\x1b[33mWarning: BUILD_ENV is not set. Defaulting to "production".\x1b[37m\n`);

module.exports = {
    entry: `./src/client/scripts/main.ts`,
    mode: process.env.BUILD_ENV ?? `production`,
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
                { from: path.resolve(__dirname, `src/client/public`), to: path.resolve(__dirname, `dist/client/public`) }
            ],
        }),
    ]
};
