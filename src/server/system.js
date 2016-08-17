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
import detection from './routes/detection'
import webpackConfig from '../constants/webpack.config'

//Initialize App
const app = express()
const system = require('http').Server(app)
const io = require('socket.io')(system)

const detectionIO = io.of('/detection-io')
					  .on('connection', socket => {
					  		console.log('DetectionIO Connection Made');
					  })
const screenIO = io.of('/screen-io')
				   .on('connection', socket => {
					  console.log('ScreenIO Connection Made');
				    })
const labIO	= io.of('/lab-io')
		   .on('connection', socket => {
		   		console.log('LabIO Connection Made');
		   })

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
app.use('/detection/:pid/:tier', (req,res) => {
	detectionIO.emit('new-detection',{pid:req.params.pid,tier:req.params.tier})
	res.status(200).send('ok')
})
app.use('/lab/:pid/:lab', (req,res) => {
	labIO.emit('new-lab',{pid:req.params.pid,tier:req.params.lab})
	res.status(200).send('ok')
})
app.use('/screen/:pid/:result', (req,res) => {
	screenIO.emit('new-screen',{pid:req.params.pid,tier:req.params.result})
	res.status(200).send('ok')
})
app.get('/',index)

module.exports.system = system
module.exports.startServer = ({server}) => {
	system.listen(server.port, (err) => {
		if(err) util.log(`[Server Start Err]: ${err}`)
		util.log(
			'\n[Server Start Success] \n',
			`[To View App Navigate to http://localhost:${server.port}]`)
	})
}