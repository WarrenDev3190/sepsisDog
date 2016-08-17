import React,{Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import PatientCard from '../PatientCard/PatientCard'
import {mapToPatientStatus, compose, paginate} from '../../helpers/helpers'
import {fetchPatientsIfNeeded, invalidatePatients} from '../../actions/patientStatus/patientStatusActions'

class List extends Component{

	constructor(props) {
	  super(props)

	  this.state = {
	  	currPage: 0
	  }
	  this.__remove = this.__remove.bind(this)
	  this.__nextPage = this.__nextPage.bind(this)
	  this.__prevPage = this.__prevPage.bind(this)
	}

	__remove(pid){
		const {dispatch} = this.props
		if(confirm("Are you sure you want to remove this patient from your list? \n You won't be alerted of new detections for 12hrs.")){   
				axios.post('/patient-status/snooze',{
					pid
				})
				.then(succ=>{
					dispatch(invalidatePatients())
					dispatch(fetchPatientsIfNeeded())
				})
		}
	}

	__nextPage(){
		this.setState({
			currPage: this.state.currPage + 1
		})
	}

	__prevPage(){
		this.setState({
			currPage: this.state.currPage - 1
		})
	}

	render(){
		const {isFetching,lastUpdated,patients} = this.props
		const filterList = patients => patients.filter(p => p.patient_state === 'onlist')
		const makeParagraphs = patients => patients.map((p,i)=><PatientCard key={i} remove={this.__remove} patient={p}/>)
		const paginatePatients = patients => paginate(patients,3,[])
		const listPatients = compose(paginatePatients, makeParagraphs, filterList)
		return (
			<div className="section">
				<div className="section--title">
					<h1>Patient List</h1>
				</div>
				<div className="section--update-time">
					{lastUpdated &&
			            <span>
			              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
			              {' '}
			            </span>
			        }
		        </div>
		        <div className="patient-list">
		        	<div className="list">
		        		<div className="patient-list--controls">
		        			<button style={{visibility: this.state.currPage === 0 ?  'hidden' : 'visible' }} onClick={this.__prevPage}>Prev Page</button>
			        		<button style={{visibility: this.state.currPage === (listPatients(patients).length - 1) ? 'hidden' : 'visible'}} onClick={this.__nextPage}>Next Page</button>
		        		</div>
				        {isFetching && patients.length === 0 &&
				          <h2>Loading...</h2>
				        }
				        {!isFetching && patients.length === 0 &&
				          <h2>Empty.</h2>
				        }
				        {patients.length > 0 &&
				          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
				            	{listPatients(patients)[this.state.currPage]}
				          </div>
				        }
			        </div>
			        <div className="tableau-placholder"></div>
		        </div>
			</div>
		)
	}
}

export default connect(mapToPatientStatus)(List)