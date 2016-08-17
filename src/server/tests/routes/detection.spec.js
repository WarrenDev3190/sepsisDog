import supertest from 'supertest'
import {expect} from 'chai'
import {system} from '../../system'


describe('detection', () => {
	it('should return a 200 response', done => {
		supertest(system)
		.post('/detection/1234/3')
		.expect(200)
		.end(done)
	})
})