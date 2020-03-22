import React, { Component } from 'react';
//Topheader component
import TopHeader from './TopHeader';
//background image
import Back from '../images/3.png';
//css file for Home component
import '../css/Home.css';

class Home extends Component {
	render() {
		return (
			<div>
				<TopHeader />
				<div>
					<img className="" style={{ marginTop: '1%', width: '100%', height: '30%' }} src={Back} alt="back" />
				</div>
			</div>
		);
	}
}

export default Home;
