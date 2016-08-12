import supertest from 'supertest'
import {expect} from 'chai'
import {system} from '../../system'

describe('PatientStatus', ()=> {
	it('should return a 200 response', done => {
		supertest(system)
		.get('/patient-status')
		.expect(200)
		.end(done)
	})

	describe('stateChange', ()=> {
		it('should return a 200 response when pid and status present', done => {
			supertest(system)
			.post('/patient-status/state-change')
			.send({pid:6516, state:'on_list'})
			.expect(200)
			.end(done)
		})
		it('should return a 422 response when pid and state absent', done => {
			supertest(system)
			.post('/patient-status/state-change')
			.expect(422)
			.end(done)
		})
		it('should return a 422 response when patient_state invalid', done => {
			supertest(system)
			.post('/patient-status/state-change')
			.send({pid:6516, state:'kool'})
			.expect(406)
			.end(done)
		})
	})

	describe('acknowledge', ()=> {
		it('should return a 422 response when pid is absent', done => {
			supertest(system)
			.post('/patient-status/acknowledge')
			.expect(422)
			.end(done)
		})

		it('should return a 200 response when pid is present', done => {
			supertest(system)
			.post('/patient-status/acknowledge')
			.send({pid:6516})
			.expect(200)
			.end(done)
		})
	})

	describe('snooze', ()=> {
		it('should return a 422 response when pid is absent', done => {
			supertest(system)
			.post('/patient-status/snooze')
			.expect(422)
			.end(done)
		})

		it('should return a 200 response when pid is present', done => {
			supertest(system)
			.post('/patient-status/snooze')
			.send({pid:6516})
			.expect(200)
			.end(done)
		})
	})
})