let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let querySchema = new Schema({
	"term": { type: String, required: true },
	"when": { type: String, required: true }
});

let model = mongoose.model('Query', querySchema);

module.exports = model;