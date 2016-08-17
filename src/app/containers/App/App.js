import React,{Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import Navbar from '../../components/Navbar/Navbar'
import {mapToPatientStatus} from '../../helpers/helpers'
import {fetchPatientsIfNeeded, invalidatePatients} from '../../actions/patientStatus/patientStatusActions'
import './App.scss'

class App extends Component{
	constructor(props) {
	  super(props);
	  this.handleClick = this.handleClick.bind(this)
	}

	__notifyMe(type) {
	  if (Notification.permission !== "granted")
	    Notification.requestPermission();
	  else {
	    var notification = new Notification('Woof Woof!', {
	      icon: '/imgs/sepdog_alt.png',
	      body: `Hey there! Got a new ${type} for you!`,
	    });
	    notification.onclick = function () {
	      window.open("http://localhost:3000/alerts");      
	    };
	  }
	}

	componentDidMount() {
	    const { dispatch } = this.props
	    const detectionIO = io.connect('http://localhost:3000/detection-io')
	    const screenIO = io.connect('http://localhost:3000/screen-io')
	    const labIO = io.connect('http://localhost:3000/lab-io')
	    detectionIO.on('new-detection', msg => {
	    	this.__notifyMe("detection")
	    })
	    screenIO.on('new-screen', msg => {
	    	this.__notifyMe("screen")
	    })
	    labIO.on('new-lab', msg => {
	    	this.__notifyMe("lab")
	    })
	    dispatch(fetchPatientsIfNeeded())
	}

	handleClick() {
		const { dispatch } = this.props
	    dispatch(fetchPatientsIfNeeded())
	}

	render(){
		const {patients, isFetching, lastUpdated} = this.props
		return (
			<div className="app">
				<Navbar/>
				{this.props.children}
			</div>
		)
	}
}

export default connect(mapToPatientStatus)(App)