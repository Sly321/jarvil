const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.basic.config');

module.exports = webpackMerge(webpackBaseConfig, {
	mode: "production",
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, "..", 'dist'),
		publicPath: './',
	},
});