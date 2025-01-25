const path = require("path")

module.exports = {
    mode: "development",
    entry: {
        main: path.resolve("js", "main.js"),
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve("dist"),
    },

    devServer: {
        static: {
            directory: path.resolve("dist"),
        },
        compress: true,
        port: 7070,
        open: true,
        hot: true,
    }
}
