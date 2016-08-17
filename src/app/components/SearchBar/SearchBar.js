import React, {Component} from 'react'
import {connect} from 'react-redux'
import {mapToPatientStatus} from '../../helpers/helpers'

class SearchBar extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	searchCriterea: ''
	  };
	}
	__onChange(e){
		if(e.target.value.length >= 3){
			this.setState({searchCriterea:e.target.value})
		}else{
			this.setState({searchCriterea:''})
		}
	}
	render(){
		const {isFetching, lastUpdated, patients} = this.props
		return (
			<div className="nav--search">
					<div className="search--container">
						<input onChange={this.__onChange.bind(this)} type="search" placeholder="Search"/>
						<button><i className="ion-search"></i></button>
						{this.state.searchCriterea.length >= 3 &&
							<div className="search--results">
								{patients
								  .filter(p=>p.patient.toLowerCase().includes(this.state.searchCriterea.toLowerCase()))
								  .map((p,i)=><p key={i} className="result">{p.patient}</p>)
								}
							</div>
						}
					</div>
			</div>
		)
	}
}

export default connect(mapToPatientStatus)(SearchBar)