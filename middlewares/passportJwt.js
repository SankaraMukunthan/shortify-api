const passportJwt = require('passport-jwt');
const passport = require('passport');
const User= require('../models/user');
require('dotenv').config();

const configureJwtStrategy = () => {

    let opts = {}
    opts.jwtFromRequest = passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_SECRET_KEY;
    passport.use(new passportJwt.Strategy(opts, function(payload, done) {
        User.findOne({_id: payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}

module.exports = configureJwtStrategy;