import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import patientStatus from './patientStatus'

const rootReducer = combineReducers({
	patientStatus,
	routing: routerReducer
})

export default rootReducer