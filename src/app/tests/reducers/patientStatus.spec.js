import patientStatus from '../../reducers/patientStatus'
import {expect} from 'chai'

describe('patientStatus reducer', () => {
	it('should return initial state', () => {
		const expectedState = {
			isFetching: false,
			didInvalidate: false,
			patients: []
		}
		expect(patientStatus(undefined, {}))
		.to
		.have
		.keys('isFetching','didInvalidate','patients')
	})
})