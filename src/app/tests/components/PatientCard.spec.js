import React from 'react'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import PatientCard from '../../components/PatientCard/PatientCard'

describe('<PatientCard/>',()=>{
	it('should be a react component',()=>{
		expect(PatientCard.prototype.componendDidMount).to.not.be.null
	})
})