import * as types from './patientStatusActionTypes'
import axios from 'axios'
import moment from 'moment'

export const changeState = (uid, patient_state) => {
	return {
		type: types.CHANGE_STATE,
		uid,
		patient_state
	}
}

export const acknowledge = (uid, ak_ts) => {
	return {
		type: types.ACKNOWLEDGE,
		uid,
		ak_ts
	}
}

export const snooze = (uid, sn_ts) => {
	return {
		type: types.SNOOZE,
		uid,
		sn_ts
	}
}

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