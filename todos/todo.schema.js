var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
	board: {
		type: String,
		default: 'todos'
	},
	comments: [
		{
			date: Date,
			comment: String,
			author: String
		}
	],
	createdOn: {
		type: Date,
		default: Date.now()
	},
	complete: {
		type: Boolean,
		default: false
	},
	completedOn: Date,
	description: String,
	difficulty: Number,
	lane: {
		type: String,
		default: 'todos'
	},
	lastUpdated: {
		type: Date,
		default: Date.now()
	},
	name: {
		type: String,
		required: true
	},
	startOn: Date,
	timeSpentInProgress: Number,
	userId: String
});

var User = mongoose.model('Todo', todoSchema);

module.exports = User;
