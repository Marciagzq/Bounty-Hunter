// Dependencies
// passport-jwt: passport strategy for authenticating with a JSON Web Token
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const keys = require('../config/keys');


// options "opts" is an object literal containing options to control how the token is extracted from the request or verified.

// REQUIRED
// secretOrKey is a string containing the secret or public key for verifying the token's signature. 
// jwtFromRequest Function that accepts a request as the only parameter and returns either the JWT as a string or null

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.cypher
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id).then(user => {
                if(user) return done(null, user);
                return done(null, false);
            }).catch(err => console.log(err));
        })
    );
};