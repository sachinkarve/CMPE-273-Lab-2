var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('./db_Schema/user');
var config = require('./config');
var kafka = require('./kafka/client');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {

    kafka.make_request('passport', jwt_payload.id, function (err, results) {

      if (err) {
        return done(err, false);
      } else {
        if (results == "ERROR") {
          console.log(`#######-------UNAUTHORISED-------#######`);
          done(null, false);
        } else {
          console.log(`$$$$$$$------SUCCESS-----$$$$$$$`)
          done(null, results);
        }
      }
    });








    //   User.findOne({id: jwt_payload.id}, function(err, user) {
    //     if (err) {
    //       return done(err, false);
    //     }
    //     if (user) {
    //       done(null, user);
    //     } else {
    //       done(null, false);
    //     }
    //   });
  }));

};