const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var os = require('os');
function getIPAdress() {
	var interfaces = os.networkInterfaces();
	for (var devName in interfaces) {
		var iface = interfaces[devName];
		for (var i = 0; i < iface.length; i++) {
			var alias = iface[i];
			if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
				console.log('server is open in ' + alias.address);
				return alias.address;
			}
		}
	}
}
var host = getIPAdress();
module.exports = {
	entry: {
		index: ['babel-polyfill', './index.js'],
		iframe: ['babel-polyfill', './iframe.js']
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true,
		compress: true,
		port: 9000,
		host,
		clientLogLevel: 'none',
		quiet: true
	},
	module: {
		loaders: [
			{
				test: /\.html$/,
				loader: 'html-loader'
			}, {
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['latest'] //按照最新的ES6语法规则去转换
				}
			}]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({ template: './index.html', chunks: ['index'] }),
		new HtmlWebpackPlugin({ template: './iframe.html', filename: 'iframe.html', chunks: ['iframe'] }),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	// output: {
	//   filename: 'index.js',
	//   path: path.resolve(__dirname, 'dist')
	// }
	output: {
		filename: '[name].js',
		path: __dirname + '/dist'
	},
	resolve : {
		extensions : ['.js','.jsx','.json'],
		alias : {
			'@' : path.join(__dirname,'./src'), 
			'@pages' : path.join(__dirname,'./src/pages'),
			'@assets' : path.join(__dirname,'./src/assets'),
			'@demo' : path.join(__dirname,'./src/demo')
		}
	}
};
