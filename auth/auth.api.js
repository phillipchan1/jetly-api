'use strict';
var express = require('express');
var router = express.Router();
var authImpl = require('./auth.impl');
var passportStrategies = require('./passportStrategies');
var passport = require('passport');

// init passport strategies
passportStrategies.initStrategies();

router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile']
	})
);

router.get(
	'/google/callback',
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

module.exports = router;
