import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom'
import './App.css';
import Home from './pages/home'
import Login from './pages/login'
import Exception from './pages/404'

class App extends Component {
	render() {
		return (
			<Switch>
				<Route exact path='/' component={Login}/>
				<Route path='/login' component={Login}/>
				<Route path='/home' component={Home}/>
				<Route component={Exception}/>
			</Switch>
		);
	}
}

export default App;
