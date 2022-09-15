const webpack = require('webpack');
const path = require('path');

webpack({
	mode: 'development',
	devtool: "inline-source-map",
	entry: {
		background: './background.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	optimization: {
		minimize: false
	}
}, (e, stats, res) => {
	if (stats.compilation.errors.length) {
		console.log(stats.compilation.errors);
	}
});
