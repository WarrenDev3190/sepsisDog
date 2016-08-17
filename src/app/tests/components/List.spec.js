import React from 'react'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import List from '../../components/List/List'

describe('<List/>',()=>{
	it('should be a react component',()=>{
		expect(List.prototype.componentDidMount).to.not.be.null
	})
})