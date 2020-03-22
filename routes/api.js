//for routing
const express = require('express');
const router = express.Router();

//for fetchng tweets using twit package
let Twit = require('twit');

//authentication for api
let T = new Twit({
	consumer_key        : 'HlEmMglQgaUlXdsi0f3n7Bmsy',
	consumer_secret     : 'QfNbOMIkraaS700ogUbjqrPYbLQ2PcHntAB4KwlhD4p4JXkUXN',
	access_token        : '1239493661286531072-Ya7jfJMeRqsQwzbNeg3AXt9FGoUuV6',
	access_token_secret : '1aFNEnSba7sdxrT5b6D3uQ6K7R6IsCNu4MQC9F9c5SdU8'
});

//returning tweets after fetching all tweets
router.post('/search', (req, res) => {
	let data = req.body.query;

	T.get('search/tweets', { q: data, count: 100 }, function(err, data, response) {
		res.json({ data: data });
	});

	// var stream = T.stream('statuses/filter', { track: data });

	// stream.on('tweet', function(tweet) {
	// 	console.log(tweet);
	// 	res.json({ data: data });
	// });
});

module.exports = router;
