const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, function(email, password, done){
    //find the user and establish identity
    User.findOne({email: email})
    .then((user)=>{
        console.log("inside find one")
        if(!user || user.password != password){
            console.log("Invalid username or password");
            return done(null, false);
        }
        console.log(user);
        return done(null, user);
    }).catch((err)=>{
        console.log("error in creating session -> passport");
        return done(err);
    })
}));

//serializing
passport.serializeUser((user, done)=>{
    return done(null, user.id);
})

//deserializing
passport.deserializeUser((id, done)=>{
    User.findById(id)
    .then((user)=>{
        return done(null, user);
    }).catch((err)=>{
        console.log("error in deserializing");
        return done(err);
    })
})