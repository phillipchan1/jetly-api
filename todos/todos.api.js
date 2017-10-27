'use strict';
var express = require('express');
var router = express.Router();
var todosImpl = require('./todos.impl');

router.get('/socket', function(req, res, callback) {
	res.json({
		hi: 'hi'
	});
});

// new todo
router.post('/todo/', function(req, res, callback) {
	todosImpl.createTodoforUser(req.user._id, req.body, function(todo) {
		if (todo) {
			res.json({
				success: true,
				data: todo
			});
		} else {
			res.json({
				success: false
			});
		}
	});
});

// get todos of user
router.get('/todos/:userId', function(req, res, callback) {});

// edit todo
router.put('/todo/:userId', function(req, res, callback) {});

// delete todo
router.delete('/todo/:userId', function(req, res, callback) {});

// new comment

module.exports = router;
