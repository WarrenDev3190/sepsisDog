import React,{Component} from 'react'
import {connect} from 'react-redux'
import {fetchPatientsIfNeeded, invalidatePatients} from '../../actions/patientStatus/patientStatusActions'

class App extends Component{
	constructor(props) {
	  super(props);
	  this.handleClick = this.handleClick.bind(this)
	}
	componentDidMount() {
	    const { dispatch } = this.props
	    dispatch(fetchPatientsIfNeeded())
	}
	handleClick() {
		const { dispatch } = this.props
	    dispatch(invalidatePatients())
	    dispatch(fetchPatientsIfNeeded())
	}
	render(){
		const {patients, isFetching, lastUpdated} = this.props
		console.log(this.props);
		return (
			<div>
				{lastUpdated &&
		            <span>
		              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
		              {' '}
		            </span>
		          }
		        {isFetching && patients.length === 0 &&
		          <h2>Loading...</h2>
		        }
		        {!isFetching && patients.length === 0 &&
		          <h2>Empty.</h2>
		        }
		        {patients.length > 0 &&
		          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
		            {patients.map((p,i)=>{
		            	return <p onClick={this.handleClick} key={i}>{p.patient}</p>
		            })}
		          </div>
		        }
			</div>
		)
	}
}

const mapStateToProps = state => {
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

export default connect(mapStateToProps)(App)