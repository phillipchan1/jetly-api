var express = require('express');
var app = express();
var router = express.Router();

// auth
var authImpl = require('./auth/auth.impl');
var passportStrategies = require('./auth/passportStrategies');
var passport = require('passport');

// other routes
var todos = require('./todos/todos.api.js');

// init passport strategies
passportStrategies.initStrategies();

router.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile']
	})
);

router.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		failWithError: true
	}),
	function(req, res, callback) {
		authImpl.authenticate(req, res, callback, 'google');
	}
);

// verify a json web token
router.get('/verify', function(req, res, callback) {
	authImpl.verify(req, res, callback);
});

// protected routes middleware
// everything below is protected
router.use(function(req, res, callback) {
	authImpl.protect(req, res, callback);
});

router.use('/todos', todos);

module.exports = router;
