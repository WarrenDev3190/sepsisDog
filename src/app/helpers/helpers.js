const getIn = (path, obj) => {
	const [first, ...rest] = path.split(".")
	return rest.length ?
		getIn(rest.join('.'),obj[first]) : 
		obj[first] 
}

const compose = (fn, ...rest) => 
	rest.length ?
	(...args) => fn(compose(...rest)(...args)) :
	fn 

const paginate = (a, c, acc) => 
	a.length ?
	paginate(a.slice(c),c,[...acc,a.slice(0,c)]) :
	acc


const mapToPatientStatus = state => {
	const patientStatus = state.patientStatus
	const {
		isFetching,
		lastUpdated,
		patients
	} = patientStatus

	return {
		isFetching,
		lastUpdated,
		patients
	}
}

export {
	getIn,
	compose,
	mapToPatientStatus,
	paginate
}


