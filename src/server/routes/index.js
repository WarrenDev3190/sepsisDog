import {Router} from 'express'

const router = Router()

router.get('/', (req,res) => {
	res.render('index')
	res.status(200)
})

module.exports = router