const path = require('path');

require('dotenv').config();

module.exports = (env) => {
	
	return {
		mode: 'development',
		entry: {
			public: `./${process.env.SLUG}/public/src/${process.env.SLUG}-public.js`,
		},
		output: {
			filename: `[name].bundle.js`,
			path: path.resolve(__dirname, `${process.env.SLUG}/public/dist`),
		},
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
					  loader: 'babel-loader',
					  options: {
						presets: ['@babel/preset-env']
					  }
					}
				},
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},
			],
		},
	};
};