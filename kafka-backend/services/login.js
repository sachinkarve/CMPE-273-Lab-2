const userModel = require('../db_Schema/user')
//const express = require('express')
//const router = express.Router();
const passwordHash = require('password-hash');
const config = require('../config');

const passport = require('passport')
const jwt = require('jsonwebtoken')
require('../passport')(passport);

function handle_request(msg, callback) {

    var res = {};

console.log(`*******----------Start-------******`);
console.log(`*******----------msg-------******`);
console.log(msg);


    userModel.findOne({
        email: msg.email_id
    }, function (err, user) {
        if (err) {
            callback(err, "Error in Data")
        }
        if (!user) {
            callback(err, "PASSWORD_INCORRECT")

        } else {

            if (passwordHash.verify(msg.password, user.password)) {
                // Create token if the password matched and no error was thrown
                console.log(user);

                const { _id, name, email, is_owner } = user;
                const payload = { _id, name, email, is_owner }

                var token = jwt.sign(payload, config.secret, {
                    expiresIn: 1008000 // in seconds
                });
                resPacket = {
                    success: true,
                    token: 'JWT ' + token
                }
                //jsObj = JSON.stringify(resPacket)
                console.log(`*****------response successfull-----******`);
                callback(null, resPacket)
            } else {
                console.log(`*****------INCORRECT OASSWORD-----******`);

                callback(err, "PASSWORD_INCORRECT")
            }
        }
    });





}
exports.handle_request = handle_request;