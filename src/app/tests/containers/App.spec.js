import React from 'react'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import App from '../../components/App/App'

describe('<App/>', ()=> {
	const wrapper = shallow(<App/>)
	it('should render',()=>{
		expect(App.prototype.componentDidMount).to.not.be.null
	})
})