import React, {Component} from 'react'

class TableauView extends Component {
	render(){
		return (
			<div id="tableau-placeholder" style={{width:'100%',height:'100%'}}>
				<div id='tableau-view' style={{width:'100%',height:'100%'}}></div>
			</div>
		)
	}
}

export default TableauView