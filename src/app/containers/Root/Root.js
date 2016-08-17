import React from 'react'
import {Provider} from 'react-redux'
import configureStore from '../../constants/configureStore'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import AlertFeed from '../../components/AlertFeed/AlertFeed'
import List from '../../components/List/List'
import App from '../App/App.js'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
const Root = () => (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={AlertFeed}/>
				<Route path="alerts" component={AlertFeed}/>
				<Route path="list" component={List}/>
			</Route>
		</Router>
	</Provider>
)

export default Root