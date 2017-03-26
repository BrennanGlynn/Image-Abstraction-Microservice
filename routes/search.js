var express = require('express');
var router = express.Router();
var request = require('request-promise');

router.get('/:query/:offset', function (req, res) {
	var options = {
		uri: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search',
		qs: {
			q: req.params.query,
			count: 10,
			offset: req.params.offset * 10
		},
		headers: {
			'Ocp-Apim-Subscription-Key': 'ce079cfbecfa4501bf339e6666a40fdd'
		},
		json: true
	};

	request(options)
	.then(function (response) {
		var results = [];

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