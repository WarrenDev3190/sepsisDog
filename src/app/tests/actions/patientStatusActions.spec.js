import * as actions from '../../actions/patientStatus/patientStatusActions'
import * as types from '../../actions/patientStatus/patientStatusActionTypes'
import {expect} from 'chai'

describe('patientStatus actions', () => {
	it('should create an action to invalidate Patient', () => {
		expect(actions.invalidatePatients()).to.have.keys('type')
	})
})
