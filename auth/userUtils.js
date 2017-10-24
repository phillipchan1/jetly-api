var User = require('./user');

var findUserById = function(id) {
	return new Promise(function(resolve, reject) {
		User.findById(id, function(err, user) {
			if (err) {
				reject(err);
			} else {
				resolve(user);
			}
		});
	});
};

var findUserByEmail = function(email) {
	return new Promise(function(resolve, reject) {
		User.findOne({ email: email }, function(err, user) {
			if (user) {
				resolve(user);
			} else {
				reject(err);
			}
		});
	});
};

var removeUserByEmail = function(email) {
	return new Promise(function(resolve, reject) {
		User.findOneAndRemove({
			email: email
		}, function(err) {
			if (err) {
				reject(err);
			} else {
				resolve('success');
			}
		});
	});
};

// saves user Data, based on a category
var saveUserData = function(options) {
	return new Promise(function(resolve, reject) {
		var category = options.category;
		var data = options.data;
		var user = options.user;

		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				user[category][key] = data[key];
			}
		}

		user.markModified(options.category);

		user.save(function (err, user) {
			if (err) {
				reject(err);
			} else {
				resolve(user);
			}
		});
	});
};

module.exports = {
	findUserById: findUserById,
	findUserByEmail: findUserByEmail,
	removeUserByEmail: removeUserByEmail,
	saveUserData: saveUserData
};