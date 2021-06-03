import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	useLocation,
} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SessionForm from '../pages/SessionPage'
import Error404 from '../pages/404'

const PrivateRoute = ({ user }) => {
	const location = useLocation()
	//console.log(location.pathname)
	if (user && location.pathname === '/account') {
		return <Redirect to='/' />
	}
	if (!user && location.pathname === '/') {
		return <Redirect to='/account' />
	}
	if (user) {
		return (
			<Route exact path='/'>
				<HomePage user={user} />
			</Route>
		)
	} else {
		return (
			<Route path='/account'>
				<SessionForm />
			</Route>
		)
	}
}

const AppRouter = ({ user }) => {
	return (
		<Router>
			<Switch>
				<PrivateRoute user={user} />
				<Route path='*' component={Error404} />
			</Switch>
		</Router>
	)
}

export default AppRouter
