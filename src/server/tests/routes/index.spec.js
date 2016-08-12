import {expect} from 'chai'
import supertest from 'supertest'
import {system} from '../../system'


describe('App', ()=> {
	it('should return a 200 response', done => {
		supertest(system)
		.get('/')
		.expect(200)
		.end(done)
	})
})