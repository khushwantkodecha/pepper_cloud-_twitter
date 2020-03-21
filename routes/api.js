const express = require('express');
const router = express.Router();

let Twit = require('twit');

let T = new Twit({
	consumer_key        : 'HlEmMglQgaUlXdsi0f3n7Bmsy',
	consumer_secret     : 'QfNbOMIkraaS700ogUbjqrPYbLQ2PcHntAB4KwlhD4p4JXkUXN',
	access_token        : '1239493661286531072-Ya7jfJMeRqsQwzbNeg3AXt9FGoUuV6',
	access_token_secret : '1aFNEnSba7sdxrT5b6D3uQ6K7R6IsCNu4MQC9F9c5SdU8'
});

router.post('/search', (req, res) => {
	let data = req.body.query;
	T.get('search/tweets', { q: data, count: 100 }, function(err, data, response) {
		res.json({ data: data });
	});
});

module.exports = router;
