var mongoose = require('mongoose');
const passwordHash = require('password-hash');

// Schema defines how the user's data will be stored in MongoDB
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    is_owner: {
        type: Boolean
    },

}, 
{ versionKey: false });

module.exports = mongoose.model('User', UserSchema);
