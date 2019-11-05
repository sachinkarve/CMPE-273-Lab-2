//var bcrypt = require('bcrypt');
const userModel = require('../db_Schema/user')

function handle_request(msg, callback) {

    var res = {};

    userModel.findOne({ id: msg }, function (err, user) {
        if (err) {
            callback(err, "ERROR")
        }
        if (user) {
            callback(null,user)
        } else {
            callback(null,"ERROR")
        }
    });
};


exports.handle_request = handle_request;