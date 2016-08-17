import React,{Component} from 'react'


class PatientCard extends Component{
	render(){
		const {patient, patient_state, accid, location, tier, ts, gender, age, room_bed,
			   hr, rr, temp, wbc, lactate, sepsis_order_set, pid} = this.props.patient
		return (
				  <div className="patient-card">
				    <div className="patient-card--upper">
					   {patient_state === 'active' && 
					   		<div className="patient-card--tier">
	   					      <div className={`tier--ring tier-${tier}`}>
	   					          <div className="tier">
	   					            <div className="tier--level">
	   					            {!tier &&
	   					            	<h3>NO SIRS SCREEN</h3>
	   					        	}
	   					        	{tier === '0' &&
	   					            	<h3>SIRS SCREEN NEGATIVE</h3>
	   					        	}
	   					        	{['1','2','3'].indexOf(tier) >= 0 &&
	   					        		<h3 className={`tier-${tier}-title`}>TIER {tier}</h3>
	   					        	}
	   					            </div>
	   					            <div className="tier-ts">
	   					              {ts}
	   					            </div>
	   					          </div>
	   					      </div>
	   				    	</div>
					   	}
				    <div className="patient-card--patient">
				       <div className="patient--demographics">
				          <table>
				            <thead><tr>
				              <td>Patient</td>
				              <td>Gender</td>
				              <td>Age</td>
				              <td>Account</td>
				              <td>Location</td>
				              <td>Room</td>
				            </tr></thead>
				            <tbody><tr>
				              <td>{patient}</td>
				              <td>{gender}</td>
				              <td>{age}</td>
				              <td>{accid}</td>
				              <td>{location}</td>
				              <td>{room_bed}</td>
				            </tr></tbody>
				          </table>
				       </div>
				       <div className="patient--alert">
				         {['1','2','3'].indexOf(tier) > 0 && patient_state === 'active' &&
				         	<div className="alert--oob">
 				             <div className="sepsis-detected">
 				               SEPSIS DETECTED
 				             </div>
 				             <div className="oob--list">
 				               <ul className="list--one">
 				                 {hr && <li><span className="oob">HR</span></li>}
 				                 {rr && <li><span className="oob">RR</span></li>}
 				                 {temp && <li><span className="oob">Temp</span></li>}
 				               </ul>
 				               <ul className="list--two">
 				                 {wbc && <li><span className="oob">WBC</span></li>}
 				                 {lactate && <li><span className="oob">Lactate</span></li>}
 				                 {sepsis_order_set && <li><span className="oob">Ord Set</span></li>}
 				               </ul>
 				             </div>
 				         </div>}
				         <div className="alert--actions">
				            <div className="actions--title">
				              <h3>Available Actions</h3>
				            </div>
				            {patient_state === 'active' && ['0','1','2','3'].indexOf(tier) >= 0 &&
				            		<div className="actions">
					             		<div className="action-button--add-to-list" onClick={()=>this.props.addToList(pid)}><label htmlFor="">Add To List</label></div>
					              		<div className="action-button--acknowledge" onClick={()=>this.props.acknowledge(pid)}><label htmlFor="">Acknowledge</label></div>
					              		<div className="action-button--snooze" onClick={()=>this.props.snooze(pid)}><label htmlFor="">Snooze</label></div>
					            	</div>
					        }
					        {patient_state === 'active' && tier === null &&
			            		<div className="actions">
				             		<div className="action-button--add-to-list" onClick={()=>this.props.addToList(pid)}><label htmlFor="">Add To List</label></div>
				              		<div className="action-button--acknowledge" onClick={()=>this.props.acknowledge(pid)}><label htmlFor="">Acknowledge</label></div>
				            	</div>
			            	}
					        {patient_state === 'onlist' &&
					        	<div className="actions">
				              		<div className="action-button--remove" onClick={()=>this.props.remove(pid)}><label htmlFor="">Remove</label></div>
					        	</div>
					        }
				         </div>
				       </div>
				      <div className="patient--details">
				      </div>
				    </div>
				    </div>
				    {patient_state === 'active' &&
					    <div className="patient-card--lower">
					      <h3 className="previous-ack">Previously Aknowledged: 9:45AM</h3>
					      <h3 className="expand"><i className="ion-arrow-down-b"></i></h3>
					    </div>
					}
				  </div>
		)
	}
}

export default PatientCard