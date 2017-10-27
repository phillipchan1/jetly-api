'use strict';
var passport = require('passport');
var config = require('../config');
var jwt = require('jsonwebtoken');
var User = require('../user/user.schema');
var url = require('url');

var authenticate = function(req, res, next, provider) {
	var user = req.user;

	User.findOne(
		{
			provider: provider,
			profileId: user.profileId
		},
		function(err, user) {
			var token = jwt.sign(user, config.secret, {
				expiresIn: '7d'
			});

			user.save(function(err, user) {
				// success!
				if (!err) {
					res.redirect(
						url.format({
							pathname: '/login',
							query: {
								token: token
							}
						})
					);
				} else {
					// fail
					res.redirect('/login');
				}
			});
		}
	);
};

var protect = function(req, res, next) {
	var token =
		req.headers.Authorization ||
		req.query.token ||
		req.headers['x-access-token'] ||
		req.headers.token;

	if (token) {
		jwt.verify(token, config.secret, function(err, decoded) {
			if (err) {
				res.json({
					success: false,
					message: 'Error: JWtoken invalid for route'
				});
			} else {
				// success:
				let decoded = jwt.decode(token);

				// find the user and pass the entire user for the rest of the routes
				User.findOne({ email: decoded._doc.email }, function(
					err,
					user
				) {
					if (!user) {
						res.json({
							success: false,
							message: 'User not found'
						});
					} else {
						req.user = user;
						next();
					}
				});
			}
		});
	} else {
		res.status(403).json({
			succes: false,
			message: 'Authorization Fail: No Token Provided'
		});
	}
};

var verify = function(req, res, next) {
	var token = req.headers.authorization;

	if (token) {
		jwt.verify(token, config.secret, function(err, decoded) {
			if (err) {
				res.json({
					success: false,
					message: 'Authentication Error: Invalid/No JWtoken Provided'
				});
			} else {
				// make sure user still exists
				User.findOne({ email: decoded._doc.email }, function(
					err,
					user
				) {
					if (!user) {
						res.json({
							success: false,
							message: 'User not found'
						});
					} else {
						// User exists, JWtoken valid: Success
						res.json({
							success: true,
							message: 'Success! JWtoken Valid',
							user: user
						});
					}
				});
			}
		});
	} else {
		res.json({
			success: false,
			message: 'Authentication Error: Invalid/No JWtoken Provided'
		});
	}
};

module.exports = {
	authenticate,
	protect,
	verify
};
