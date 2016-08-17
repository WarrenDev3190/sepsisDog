import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import {expect} from 'chai'

describe('<Navbar/>',()=>{
	it('should be a react component',()=>{
		expect(Navbar.prototype.componentDidMount).to.not.be.null
	})
})