import React from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import {expect} from 'chai'

describe('<SearchBar/>',()=>{
	it('should be a react component', ()=> {
		expect(SearchBar.prototype.componentDidMount).to.not.be.null
	})
})