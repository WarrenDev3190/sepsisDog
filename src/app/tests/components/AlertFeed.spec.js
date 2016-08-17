import React from 'react'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import AlertFeed from '../../components/AlertFeed/AlertFeed'

describe('<AlertFeed/>', ()=> {
	it('should be an react component', ()=> {
		expect(AlertFeed.prototype.componentDidMount).to.not.be.null
	})
})