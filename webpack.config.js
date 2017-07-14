/**
 * Created by Neo on ⌚️
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: './app.js',
    output: {
        filename: 'bundle.js',
        // chunkFilename: '[id].chunk.js',
        path: path.resolve(__dirname, './dist'),
        // publicPath: 'http://127.0.0.1:8888',
    },
    module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					cacheDirectory: true
				},
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ['css-loader']
			},
			{
				test: /\.woff|ttf|woff2|eot$/,
				loader: 'url-loader',
				options: {
					limit: 10000
				}
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|svgz)(\?.+)?$/,
				loader: 'url-loader',
				options: {
					limit: 2000
				}
			}
		]
    },

    plugins: [
        new webpack.BannerPlugin('This file is create by Roidder'),//文件头部出现了我们指定的注释信息
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
            minChunks: 2,//任何一个模块在 output 文件中被加载 2 次及以上, 该模块就会被打包在 common.js
        }),
    ],

    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        // extensions: ['', '.js', '.vue'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
		extensions: ['.js', '.vue'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@lib': path.join(__dirname, 'src/lib'),
			'@components': path.join(__dirname, 'src/components'),
			'@modules': path.join(__dirname, 'src/modules')
		}
    },

    devServer: {//开发服务器
        contentBase: path.resolve(__dirname, './src'),  // New
        port: 9999,
        // historyApiFallback: true,
        hot: true,
        // inline: true,
        // grogress: true,
    },
}