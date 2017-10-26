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
	createdOn: Date,
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
	lastUpdated: Date,
	name: String,
	timeSpentInProgress: Number,
	userId: Number
});

var User = mongoose.model('Todo', todoSchema);

module.exports = User;
