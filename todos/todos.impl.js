var Todo = require('./todo.schema');

var createTodoforUser = function(userId, options, callback) {
	Todo.create(options, function(err, todo) {
		if (!err && callback) {
			callback(todo);
		}
	});
};

var getTodosforUser = function(userId, queryOptions, callback) {
	Todo.find(queryOptions, function(err, todos) {
		if (!err) {
			callback(todo);
		}
	});
};

module.exports = {
	createTodo,
	getTodosforUser
};
