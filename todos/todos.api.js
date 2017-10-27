'use strict';
var express = require('express');
var router = express.Router();
var todosImpl = require('./todos.impl');

router.get('/socket', function(req, res, callback) {
	res.json({
		hi: 'hi'
	});
});

// get todos of user
router.get('/', function(req, res, callback) {
	todosImpl.getTodosforUser(req.user._id, req.body, function(err, todos) {
		if (err) {
			res.json({ success: false, message: err });
		} else {
			res.json({ success: true, data: todos });
		}
	});
});

// new todo
router.post('/todo/', function(req, res, callback) {
	todosImpl.createTodoforUser(req.user._id, req.body, function(err, todo) {
		if (err) {
			res.json({ success: false, message: err });
		} else {
			res.json({ success: true, data: todo });
		}
	});
});

// edit todo
router.put('/todo/', function(req, res, callback) {});

// delete todo
router.delete('/todo/', function(req, res, callback) {});

// new comment

module.exports = router;
