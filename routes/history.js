var express = require('express');
var router = express.Router();

var db = require('../models/database');
let Query = require('../models/Query');

router.get('/', function (req, res) {
	var recentSearches = [];
	Query.find({}, function (err, doc) {
		if (err) {
			res.send(err)
		} else {
			res.send(doc)
		}
	}).limit(10);
});

module.exports = router;