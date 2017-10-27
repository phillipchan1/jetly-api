'use strict';
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../user/user.schema');

var strategies = [
	// google strategy
	function() {
		passport.use(
			new GoogleStrategy(
				{
					clientID:
						'1027177071681-sfncplgtv4d9v26lvbo82mtg4378onsr.apps.googleusercontent.com',
					clientSecret: 'tJi-WQg1KSx7_Qb1OlzYDpLJ',
					callbackURL:
						'http://localhost:4200/api/auth/google/callback'
				},
				function(accessToken, refreshToken, profile, next) {
					User.findOne(
						{
							provider: 'google',
							profileId: profile.id
						},
						function(err, user) {
							// if user doesn't exist create a new one
							if (!user) {
								var err = new Error('User already exists');

								User.create(
									{
										provider: 'google',
										profileId: profile.id,
										firstName: profile.name.givenName,
										lastName: profile.name.familyName
									},
									function(err, user) {
										return next(err, user);
									}
								);
							} else {
								// else return the user
								next(null, user);
							}
						}
					);
				}
			)
		);
	}
];

var initStrategies = function() {
	strategies.forEach(function(strategy) {
		strategy();
	});
};

module.exports = {
	initStrategies
};
