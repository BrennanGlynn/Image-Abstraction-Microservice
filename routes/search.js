var express = require('express');
var router = express.Router();
var request = require('request-promise');

var db = require('../models/database');
let Query = require('../models/Query');

router.get('/:query', function (req, res) {
	var search_term = req.params.query;
	var options = {
		uri: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search',
		qs: {
			q: search_term,
			count: 10,
			offset: req.query.offset || 0
		},
		headers: {
			'Ocp-Apim-Subscription-Key': 'ce079cfbecfa4501bf339e6666a40fdd'
		},
		json: true
	};

	request(options)
	.then(function (response) {
		var results = [];

		var tracked = new Query({
			"term": search_term,
			"when": new Date()
		});

		tracked.save(function (err) {
			if (err) return res.json(err);
			console.log("Saved query")
		});

		for (image in response.value) {
			results.push({
				"url": response.value[image].contentUrl,
				"snippet": response.value[image].name,
				"thumbnail": response.value[image].thumbnailUrl,
				"hostUrl": response.value[image].hostPageUrl
			});
		}


		res.send(results);
	})
	.catch(function (err) {
		console.log(err);
		res.send(err.body)
	});
});

module.exports = router;