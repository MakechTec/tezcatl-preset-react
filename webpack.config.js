const path = require('path');

module.exports = {
    mode: 'production',
    entry: "./prebuild/react-cli.mjs",
    output: {
        path: path.resolve(__dirname),
        filename: "index.js",
        library:{
            type: "commonjs-static",
        }
    },
    module:{
        rules: [
            {
                test: /\.(js|mjs)$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            plugins: ["@babel/plugin-proposal-class-properties"],
                        }
                    }
                ],
            }
        ],
    },
    target: "node",
};