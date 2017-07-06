var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/userModel');

module.exports = function (passport) {

    //jwt-strategy
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = process.env.secret;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findById(jwt_payload._id, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};