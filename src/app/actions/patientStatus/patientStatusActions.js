import * as types from './patientStatusActionTypes'
import axios from 'axios'
import moment from 'moment'

export const invalidatePatients = () => {
	return {
		type: types.INVALIDATE_PATIENTS,
	}
}

const requestPatients = () => {
	return {
		type: types.REQUEST_PATIENTS
	}
}

const receivePatients = patients => {
	return {
		type: types.RECEIVE_PATIENTS,
		patients,
		receivedAt: moment().format()
	}
}

const fetchPatients = () => {
	return dispatch => {
		dispatch(requestPatients())
		return axios.get('/patient-status')
		.then(patients => dispatch(receivePatients(patients)))
		.catch(e => console.error(e))
	}
}

const shouldFetchPatients = (state) => {
	const {patients, isFetching, didInvalidate} = state.patientStatus
	if(!patients){
		return true
	}else if(isFetching){
		return false
	}else{
		return didInvalidate
	}
}

export const fetchPatientsIfNeeded = () => {
	return (dispatch, getState) => {
		if(shouldFetchPatients(getState())){
			return dispatch(fetchPatients())
		}
	} 
}