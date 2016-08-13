import webpack from 'webpack'

module.exports.devServer = options => {
	return {
		output: {
			publicPath: 'http://localhost:8080/static/'
		},
		devServer: {
			historyApiFallback: true,
			hot: true,
			inline: true,
			stats: 'errors-only',
			host: options.host,
			port: options.port
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin({
				multiStep: true
			})
		]
	}
}