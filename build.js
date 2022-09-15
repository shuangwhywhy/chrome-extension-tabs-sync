const webpack = require('webpack');
const path = require('path');

webpack({
	mode: 'production',
	devtool: false,
	target: 'webworker',
	entry: {
		background: './background.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	optimization: {
		minimize: false,
	},
	// module: {
	// 	rules: [
	// 		{
	// 			test: /\.js/,
	// 			include: /node_modules/,
				// loader: 'babel-loader',
				// options: {
				// 	presets: [
				// 		[
				// 			'@babel/preset-env',
				// 			// {
				// 			// 	useBuiltIns: 'usage',
				// 			// 	corejs: 3,
				// 			// }
				// 		]
				// 	]
				// }
	// 		}
	// 	]
	// }
}, (e, stats, res) => {
	if (stats && stats.compilation.errors.length) {
		console.log(stats.compilation.errors);
	} else if (e) {
		console.log(e);
	}
});
