import React from 'react'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import App from '../../containers/App/App'

describe('<App/>', ()=> {
	it('should be a react component',()=>{
		expect(App.prototype.componentDidMount).to.not.be.null
	})
})