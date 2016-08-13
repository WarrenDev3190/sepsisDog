import {INVALIDATE_PATIENTS, 
		REQUEST_PATIENTS, 
		RECEIVE_PATIENTS,
		ADD_PATIENT,
		CHANGE_STATE,
		ACKNOWLEDGE,
		SNOOZE} from '../actions/patientStatus/patientStatusActionTypes'

const defaultPatient = {
	active: false
}

const patient = (state = defaultPatient, action) => {
	switch(action.type){
		case ADD_PATIENT:
			return Object.assign({}, state, action.patient)
		case CHANGE_STATE:
			return Object.assign({}, state, {
				patient_state: action.patient_state
			})
		case ACKNOWLEDGE:
			return Object.assign({}, state, {
				patient_state: 'acknowledge',
				ak_ts: action.ak_ts
			})
		case SNOOZE:
			return Object.assign({}, state, {
				patient_state: 'snooze',
				sn_ts: action.sn_ts
			})
		default:
			return state
	}
}

const defaultPatientStatusState = {
	patients: [],
	isFetching: false,
	didInvalidate: true
}

const patientStatus = (state = defaultPatientStatusState, action ) => {
	switch(action.type){
		case INVALIDATE_PATIENTS:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case REQUEST_PATIENTS:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			})
		case RECEIVE_PATIENTS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				patients: action.patients.data,
				lastUpdated: action.receivedAt
			})
		case CHANGE_STATE:
			return Object.assign({}, state, {
				patients: state.patients.map(p => {
					if(action.uid === p.uid){
						return patient(p, {type:CHANGE_STATE, patient_state: action.patient_state})
					}
					return p
				})
			})
		case ACKNOWLEDGE:
			return Object.assign({}, state, {
				patients: state.patients.map(p => {
					if(action.uid === p.uid){
						return patient(p, {type:ACKNOWLEDGE})
					}
					return p
				})
			})
		case SNOOZE:
			return Object.assign({}, state, {
				patients: state.patients.map(p => {
					if(action.uid === p.uid){
						return patient(p, {type: SNOOZE})
					}
					return p
				})
			})
		default:
			return state
	}
}

export default patientStatus