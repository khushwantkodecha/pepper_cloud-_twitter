import React from 'react';
import './App.css';
import Home from './components/Home';
import Twits from './components/Twits';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Route path="/" component={Home} exact />
			<Route path="/twits" component={Twits} />
		</Router>
	);
}

export default App;
