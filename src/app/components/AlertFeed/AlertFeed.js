import React,{Component} from 'react'
import {connect} from 'react-redux'
import PatientCard from '../PatientCard/PatientCard'
import {compose, mapToPatientStatus, paginate} from '../../helpers/helpers'
import {fetchPatientsIfNeeded, invalidatePatients} from '../../actions/patientStatus/patientStatusActions'
import axios from 'axios'

class AlertFeed extends Component{

	constructor(props) {
	  super(props)

	  this.state = {
	  	currPage: 0,
	  	sortBy: ''
	  }

	  this.__nextPage = this.__nextPage.bind(this)
	  this.__prevPage = this.__prevPage.bind(this)
	  this.__addToList = this.__addToList.bind(this)
	  this.__acknowledge = this.__acknowledge.bind(this)
	  this.__snooze = this.__snooze.bind(this)

	}

	__addToList(pid){
		const {dispatch} = this.props
		axios.post('/patient-status/state-change',{
			pid,
			state: 'onlist'
		})
		.then(succ=>{
			dispatch(invalidatePatients())
			dispatch(fetchPatientsIfNeeded())
		})
	}

	__acknowledge(pid){
		const {dispatch} = this.props
		axios.post('/patient-status/acknowledge',{
			pid
		})
		.then(succ=>{
			dispatch(invalidatePatients())
			dispatch(fetchPatientsIfNeeded())
		})
	}

	__snooze(pid){
		const {dispatch} = this.props
		axios.post('/patient-status/snooze',{
			pid
		})
		.then(succ=>{
			dispatch(invalidatePatients())
			dispatch(fetchPatientsIfNeeded())
		})
	}

	__sortFeed(){
		return patients => {
			switch(this.state.sortBy){
				case 'patient':
					return patients.sort((x,y)=> y.patient.split(',')[1] -  x.patient.split(',')[1])
				case 'time_alerted':
					return patients.sort((x,y)=> y.ts - x.ts)
				case 'accid':
					return patients.sort((x,y)=> y.accid - x.accid)
				case 'location':
					return patients.sort((x,y)=> y.location - x.location)
				case 'tier':
					return patients.sort((x,y)=> y.tier - x.tier)
				default:
					return patients.sort((x,y)=> y.uid - x.uid)
			}
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

	__handleSortChange(e){
		this.setState({
			sortBy: e.target.value
		})
	}

	componentDidMount(){
		const {dispatch} = this.props
		dispatch(fetchPatientsIfNeeded)
	}

	render(){

		const {lastUpdated, isFetching, patients} = this.props
		const filterActive = patients => patients.filter(p => p.patient_state === 'active')
		const makePatientCards = patients => patients.map((p,i)=><PatientCard patient={p} 
																			key={i}
																			addToList={this.__addToList}
																			acknowledge={this.__acknowledge}
																			snooze={this.__snooze}/>)
		const paginatePatients = patients => paginate(patients,3,[])
		const activePatients = compose(paginatePatients, makePatientCards, this.__sortFeed(), filterActive)

		return (
			<div className="alert-feed section">
				<div className="alert-feed--title section--title">
					<h1>Alert Feed</h1>
				</div>
				<div className="alert-feed--controls" style={{ opacity: isFetching ? 0.5 : 1 }}>
					<h2>Sort By</h2>
					<input className="slide-toggle" onClick={this.__handleSortChange.bind(this)} disabled={patients.length ? false : true} type="radio" value="patient" id="sort-by-patient" name="sort-by"/>
					<label htmlFor="sort-by-patient"><p className="icon ion-medkit"></p><span>Patient</span></label>
					<input className="slide-toggle" onClick={this.__handleSortChange.bind(this)} disabled={patients.length ? false : true} type="radio" value="accid" id="sort-by-accid" name="sort-by"/>
					<label htmlFor="sort-by-accid"><p className="icon ion-clipboard"></p><span>Accid</span></label>
					<input className="slide-toggle" onClick={this.__handleSortChange.bind(this)} disabled={patients.length ? false : true} type="radio" value="location" id="sort-by-location" name="sort-by"/>
					<label htmlFor="sort-by-location"><p className="icon ion-location"></p><span>Location</span></label>
					<input className="slide-toggle" onClick={this.__handleSortChange.bind(this)} disabled={patients.length ? false : true} type="radio" value="tier" id="sort-by-tier" name="sort-by"/>
					<label htmlFor="sort-by-tier"><p className="icon ion-nuclear"></p><span>Tier</span></label>
					<div className="clear"></div>
				    <div className="slider">
				      <div className="bar"></div>
				    </div>
				</div>
				<div className="section--update-time">
					{lastUpdated &&
			            <span>
			              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
			              {' '}
			            </span>
			        }
		        </div>
		        <div className="alert-feed--feed">
			        {isFetching && patients.length === 0 &&
			          <h2>Loading...</h2>
			        }
			        {!isFetching && patients.length === 0 &&
			          <h2>Empty.</h2>
			        }
			        {patients.length > 0 &&
			          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
			            {activePatients(patients)[this.state.currPage]}
			          </div>
			        }
			        <div className="feed--controls">
		        		<button style={{visibility: this.state.currPage === 0 ?  'hidden' : 'visible' }} onClick={this.__prevPage}>Prev Page</button>
		        		<button style={{visibility: this.state.currPage === (activePatients(patients).length - 1) ? 'hidden' : 'visible'}} onClick={this.__nextPage}>Next Page</button>
					</div>
		        </div>
			</div>
		)
	}
}

export default connect(mapToPatientStatus)(AlertFeed)