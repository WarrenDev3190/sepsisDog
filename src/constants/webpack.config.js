import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import validate from 'webpack-validator'

import {devServer} from './parts'

const PATHS = {
	app: path.join(__dirname, '../app/index'),
	build: path.join(__dirname, '../server/public/js')
}
const common = {
	entry: [
		PATHS.app
	],
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},
	plugins: [new webpack.NoErrorsPlugin()],
	module: {
		loaders: [
			{
				test: /\.js?/,
				loaders: ['babel'],
				include: [
					path.join(__dirname, '../app')
				],
				exclude: [
					/node_modules/
				]
			}
		]
	}
}

let config;

switch(process.env.npm_lifecycle_event){
	case 'build':
		config = merge(common, {})
	default:
		config = merge(common, 
					devServer({
						host: process.env.HOST,
						port: process.env.PORT
					})
				)
}

module.exports = validate(config)