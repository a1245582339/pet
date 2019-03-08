import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import './App.css';
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import SelfInfo from './routes/selfInfo'
class App extends Component {
	render() {
		return (
			<Switch>
				<Route path='/login' component={Login}/>
				<Route path='/register' component={Register}/>
				<Route path='/home' component={Home}/>
				<Route path='/selfInfo' component={SelfInfo}/>
				<Redirect to='/home'></Redirect>
			</Switch>
		);
	}
}
export default App;
