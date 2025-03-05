const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',  // Входной файл
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,  // Очищает папку dist перед новой сборкой
        publicPath: '/',
    },
    mode: 'development',  // Или 'production' для продакшена
    devServer: {
        static: {
        directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        hot: true,
        port: 3000,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,  // Обработка CSS
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
              test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/i,
              type: 'asset/resource', // Должно копировать файлы в dist
            },
            {
              test: /\.html$/, // Обрабатывать HTML через Webpack
              use: 'html-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',  // Исходный HTML-файл
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
          filename: 'styles/[name].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/pages'), to: 'pages' },
                { from: path.resolve(__dirname, 'src/styles'), to: 'styles' },
                { from: path.resolve(__dirname, 'src/js'), to: 'js' },
                { from: "src/images/svg", to: "images/svg" },
                { from: "src/images", to: "images" }
            ]
          })
    ]
};
