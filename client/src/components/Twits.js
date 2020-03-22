import React, { Component } from 'react';
//for parsing string
import queryString from 'query-string';
import TopHeader from './TopHeader';
//for api calls
import axios from 'axios';
//for css of tweeter componet
import '../css/Tracks.css';
import Loader from './Loader';

class Twits extends Component {
	//defining initial stats for app
	state = {
		query      : '',
		twitts     : [],
		all_twitts : [],
		ten_twitts : [],
		loading    : false
	};

	//being called after firsr render
	componentDidMount() {
		//parsing query string from url
		const { query } = queryString.parse(window.location.search);
		//setting state of query
		this.setState(
			{
				query
			},
			//to get all tweers
			() => this.searchTwit()
		);
	}

	//checking previous and current state to prevent from unwanted api calls
	componentDidUpdate(prevProps, prevState) {
		const { query } = queryString.parse(window.location.search);
		if (this.state.query !== query) {
			this.setState(
				{
					query,
					load_more_clicked : false
				},
				() => this.searchTwit()
			);
		}
	}

	//method to get all tweets by api call
	searchTwit = () => {
		//payload for api call
		const payload = {
			query : this.state.query
		};
		if (this.state.query.length) {
			this.setState({
				loading : true
			});
			//calling api
			axios({
				url    : '/api/search',
				method : 'POST',
				data   : payload
			})
				.then((res) => {
					if (res.data.data === '') {
						this.setState({
							twitts  : [],
							loading : false
						});
					} else {
						let temp_twits = [];
						let len = res.data.data.statuses.length > 10 ? 10 : res.data.data.statuses.length;
						for (let i = 0; i < len; i++) {
							temp_twits.push(res.data.data.statuses[i]);
						}
						console.log(temp_twits);
						this.setState({
							twitts     : temp_twits,
							loading    : false,
							all_twitts : res.data.data.statuses,
							ten_twitts : temp_twits
						});
					}
				})
				.catch((err) => {
					console.log(err.message);
				});
		} else {
			this.setState({
				twitts     : [],
				all_twitts : []
			});
		}
	};

	//button click function
	buttonClick = () => {
		this.setState({
			load_more_clicked : true,
			twitts            : this.state.all_twitts
		});
	};

	render() {
		return (
			<div>
				<TopHeader />
				<br />
				<br />
				{this.state.loading ? (
					<Loader />
				) : (
					<React.Fragment>
						<div className="main_heading" style={{ marginTop: 50 }} />
						<div className="main_heading" style={{ zIndex: 0 }}>
							{this.state.twitts.length ? (
								this.state.twitts.map((data, i) => {
									const { id, created_at, text } = this.state.twitts[i];
									const { profile_image_url, name, followers_count } = this.state.twitts[i].user;
									return (
										<div key={id} className="track" style={{ borderRadius: 50 }}>
											<div class="card twit-div">
												<div class="card-header">
													<p>
														{name}- {followers_count} Followers
													</p>
												</div>
												<div class="card-body text-div">{text}</div>
												<div class="card-footer">{created_at}</div>
											</div>
										</div>
									);
								})
							) : (
								<h1 style={{ marginTop: 300 }}>No Result...</h1>
							)}
							{this.state.all_twitts.length > 10 && !this.state.load_more_clicked ? (
								<div className="mb-3">
									<button className="btn btn-primary" onClick={this.buttonClick}>
										Load More...
									</button>
								</div>
							) : null}
						</div>
					</React.Fragment>
				)}
			</div>
		);
	}
}

export default Twits;
