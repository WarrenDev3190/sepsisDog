import {Router} from 'express'
import moment from 'moment'
import db from '../../constants/db'

const router = Router()

router.get('/', (req,res) => {
	res.sendStatus(200)
})

router.post('/state-change', (req, res, next) => {
	const {pid, state} = req.body
	if(!pid || !state){
		res.status(422).send('[Missing Params]: You must specify both a pid and a state').end()
	}else{
		if(['active','on_list','snoozed','acknowledged'].indexOf(state) === -1){
			res.status(406).send('[Incorrect State Param]: Invalid patient_state').end()
		}else{
			db('patient_status')
			.where({pid: pid})
			.update({patient_state: state})
			.then(succ=>{
				if(succ){
					res.status(200).send('[Update Successful]')
					return next()
				}
			})
			.catch(e=>{
				res.status(404).send('[Patient Not Found]').end()
			})
		}
	}
})


router.post('/acknowledge', (req, res, next) => {
	const {pid} = req.body
	if(!pid){
		return res.status(422).send('[Missing Param]: You must specify a pid')
	}else{
		db('patient_status')
		.where({pid:pid})
		.update({
			patient_state: 'acknowledged',
			ak_ts: moment().format()
		})
		.then(succ=>{
			if(succ){
				res.status(200).send('[Acknowledge Successful]')
				return next()
			}
		})
		.catch(e=>{
			res.status(404).send('[Patient Not Found]').end()
		})
	}
})

router.post('/snooze', (req, res, next) => {
	const {pid} = req.body
	if(!pid){
		return res.status(422).send('[Missing Param]: You must specify a pid')
	}else{
		db('patient_status')
		.where({pid:pid})
		.update({
			patient_state: 'snoozed',
			sn_ts: moment().format()
		})
		.then(succ=>{
			if(succ){
				res.status(200).send('[Snooze Successful]')
				return next()
			}
		})
		.catch(e=>{
			res.status(404).send('[Patient Not Found]').end()
		})
	}
})

module.exports = router