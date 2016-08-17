import React,{Component} from 'react'
import {Link} from 'react-router'
import SearchBar from '../SearchBar/SearchBar'


class Navbar extends Component{
	componentDidMount(){

	}
	render(){
		return (
			<nav>
				<div className="nav--brand">
					<h2>SEPSIS<span style={{color:'#06D6A0'}}>DOG</span></h2>
				</div>
				<div className="nav--link">
					<Link to="alerts">Alerts</Link>
					<Link to="list">List</Link>
				</div>
				<SearchBar/>
			</nav>
		)
	}
}

export default Navbar