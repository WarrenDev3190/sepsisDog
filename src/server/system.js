import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import util from 'util'
import webpack from 'webpack'
import WebpackDevMiddleware from 'webpack-dev-middleware'

//Application Modules
import index from './routes/index'
import patientStatus from './routes/patientStatus'
import webpackConfig from '../constants/webpack.config'


//Initialize App
const app = express()

//App Middleware
app.use(cookieParser())
app.use(session({
	secret: 's3kr3t',
	resave: false,
	saveUninitialized: false,
	cookie: {maxAge: 60000}
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))
if(app.get('env')==='development'){
	app.use(WebpackDevMiddleware(webpack(webpackConfig),{
		publicPath: '/static/'
	}))
}

//App Settings
app.set('view engine','pug')
app.set('views', path.join(__dirname, 'views'))

//App Routes
app.use('/patient-status', patientStatus)
app.get('/',index)

module.exports.system = app
module.exports.startServer = ({server}) => {
	app.listen(server.port, (err) => {
		if(err) util.log(`[Server Start Err]: ${err}`)
		util.log(
			'\n[Server Start Success] \n',
			`[To View App Navigate to http://localhost:${server.port}]`)
	})
}