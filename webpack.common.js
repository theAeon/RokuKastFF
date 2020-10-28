/* MIT License

Copyright (c) 2020 Joe Martella

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

const path = require("path");
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);

module.exports = {
   entry: {
      popup: path.join(__dirname, "src/popup/index.tsx"),
      background: path.join(__dirname, "src/background.ts"),
      contentScript: path.join(__dirname, "src/contentScript.ts")
   },
   output: {
      path: path.join(__dirname, "dist/js"),
      filename: "[name].js"
   },
   module: {
      rules: [
         {
            exclude: /(node_modules)|(dist)/,
            test: /\.t|jsx?$/,
            loader: require.resolve("ts-loader"),
            options: PnpWebpackPlugin.tsLoaderOptions({})
         },
         {
            exclude: /node_modules/,
            test: /\.scss$/,
            use: [
               {
                  loader: "style-loader" // Creates style nodes from JS strings
               },
               {
                  loader: "css-loader" // Translates CSS into CommonJS
               },
               {
                  loader: "sass-loader" // Compiles Sass to CSS
               }
            ]
         }
      ]
   },
   resolve: {
      extensions: [".ts", ".tsx", ".js"],
      plugins: [PnpWebpackPlugin]
   },
   resolveLoader: {
      plugins: [PnpWebpackPlugin.moduleLoader(module)]
   }
};
