import React from 'react'
import {Provider} from 'react-redux'
import configureStore from '../../constants/configureStore'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import App from '../App/App.js'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
const Root = () => (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}/>
		</Router>
	</Provider>
)

export default Root