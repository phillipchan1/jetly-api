var express = require('express');
var router = express.Router();
var User = require('./user');
var userUtils = require('./userUtils.js');
var authImpl = require('./auth.impl');
var passportStrategies = require('./passportStrategies');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var config = require('../config');

// init passport strategies
passportStrategies.initStrategies();

router.get(
	'/google',
	passport.authenticate(
		'google',
		{
			scope: ['profile']
		}
	)
);

router.get(
	'/google/callback',
	passport.authenticate(
		'google',
		{
			failWithError: true
		}
	),
	function(req, res, next) {
		authImpl.authenticate(req, res, next, 'google');
	}
);

// verify a json web token
router.get(
	'/verify',
	function(req, res, next) {
		authImpl.verify(req, res, next);
	}
);

// protected routes middleware
// everything below is protected
router.use(
	function(req, res, next) {
		authImpl.protect(req, res, next);
	}
);

module.exports = router;