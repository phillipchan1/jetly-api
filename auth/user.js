var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    provider: String,
    firstName: String,
    lastName: String,
    profileId: Number
});

var User = mongoose.model('User', UserSchema);

module.exports = User;