var Todo = require('./todo.schema');

var createTodoforUser = function(userId, options, callback) {
	var queryOptions = Object.assign(
		{
			userId
		},
		options
	);

	Todo.create(queryOptions, function(err, todo) {
		if (!err && callback) {
			callback(null, todo);
		} else if (callback) {
			callback(err, null);
		}
	});
};

var getTodosforUser = function(userId, options, callback) {
	var queryOptions = Object.assign({ userId }, options);

	Todo.find(queryOptions, function(err, todos) {
		if (!err && callback) {
			callback(null, todos);
		} else if (callback) {
			callback(err, null);
		}
	});
};

module.exports = { createTodoforUser, getTodosforUser };
