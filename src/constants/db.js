import {database} from './config'
import knex from 'knex'

const db = knex({
	client: 'pg',
	connection: {
		host: database.host,
		user: database.user,
		password: database.password,
		database: database.db,
	}
})

module.exports = db