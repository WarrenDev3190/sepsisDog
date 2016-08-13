import * as actions from '../../actions/patientStatus/patientStatusActions'
import * as types from '../../actions/patientStatus/patientStatusActionTypes'
import {expect} from 'chai'

describe('patientStatus actions', () => {
	it('should create an action to invalidate Patient', () => {
		expect(actions.invalidatePatients()).to.have.keys('type')
	})

	it('should create an action to change patient state', () => {
		expect(actions.changeState(123,'on_list')).to.have.keys('uid','patient_state','type')
	})

	it('should create an action to acknowledge patients', () => {
		expect(actions.acknowledge(123,'2101-03-01')).to.have.keys('uid','ak_ts','type')
	})

	it('should create an action to snooze patients', () => {
		expect(actions.snooze(123,'2101-03-01')).to.have.keys('uid','sn_ts','type')
	})
})
