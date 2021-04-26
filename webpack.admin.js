const path = require('path');

require('dotenv').config();

module.exports = (env) => {
	
	return {
		mode: 'development',
		entry: {
			admin: `./${process.env.SLUG}/admin/src/${process.env.SLUG}-admin.js`,
		},
		output: {
			filename: `[name].bundle.js`,
			path: path.resolve(__dirname, `${process.env.SLUG}/admin/dist`),
		},
		module: {
			rules: [
			  {
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			  },
			],
		},
	};
};