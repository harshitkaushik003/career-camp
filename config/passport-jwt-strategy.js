const passport = require('passport');
const User = require('../models/user');
const JWTStrategy = require('passport-jwt').Strategy;
const EXtractJWT = require('passport-jwt').ExtractJwt;

let opts = {
    jwtFromRequest : EXtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey : 'jwt-auth-key'
}

passport.use(new JWTStrategy(opts, async (jwtPayLoad, done)=>{
    try {
        let user = await User.findById(jwtPayLoad._id);
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    } catch (error) {
        console.log("Error in finding user from jwt --> " + error);
        return;
    }

}));

module.exports = passport;