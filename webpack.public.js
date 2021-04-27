const path 		= require('path');
const { merge } = require('webpack-merge');
const common 	= require('./webpack.common.js');

require('dotenv').config();

module.exports = (env) => {

	let mode = env.production ? 'production' : 'development';

	return merge(common, {
		mode: mode,
		entry: {
			public: `./${process.env.SLUG}/public/src/${process.env.SLUG}-public.js`,
		},
		output: {
			filename: `[name].bundle.js`,
			path: path.resolve(__dirname, `${process.env.SLUG}/public/dist`),
		},
	})

};

// module.exports = (env) => {
	
// 	return {
// 		mode: 'development',
// 		entry: {
// 			public: `./${process.env.SLUG}/public/src/${process.env.SLUG}-public.js`,
// 		},
// 		output: {
// 			filename: `[name].bundle.js`,
// 			path: path.resolve(__dirname, `${process.env.SLUG}/public/dist`),
// 		},
// 		module: {
// 			rules: [
// 				{
// 					test: /\.m?js$/,
// 					exclude: /(node_modules|bower_components)/,
// 					use: {
// 					  loader: 'babel-loader',
// 					  options: {
// 						presets: ['@babel/preset-env']
// 					  }
// 					}
// 				},
// 				{
// 					test: /\.css$/i,
// 					use: ['style-loader', 'css-loader'],
// 				},
// 			],
// 		},
// 	};
// };