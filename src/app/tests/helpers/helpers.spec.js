import {expect} from 'chai'
import {getIn, compose, paginate} from '../../helpers/helpers'

describe('getIn', () => {
	it('returns nested values of objects', () => {
		const testy = {
				name:{
					firstname:'Testy',
					surname:'McTestersons'
				},
				location: 
					{ 
						address: {
							city: {
								name: 'Nashville',
								region: 'South'
							}
						}
				}
			}
		expect(getIn('name.surname',testy)).to.equal('McTestersons')
		expect(getIn('location.address.city.name',testy)).to.equal('Nashville')
	})
})

describe('compose', () => {
	it('should allow for easy composition of functions', () => {
		const result = 25
		const sumAndTimesFive = compose(x=>x*5,(x,y)=>x+y)
		expect(sumAndTimesFive(2,3)).to.equal(result)
	})
})

describe('paginate', () => {
	it('should allow for easy clientside pagination', () => {
		const startArr = [1,2,3,4,5,6,7,8,9]
		const result = [[1,2,3],[4,5,6],[7,8,9]]
		expect(paginate(startArr,3,[])).to.eql(result)
	})
})