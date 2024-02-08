//require express
const express = require('express');

const cookieParser = require('cookie-parser');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

//create server 
const app = express();

//import express-ejs-layouts
const expressLayouts = require('express-ejs-layouts');

//require database;
const db = require('./config/mongoose');

//create port
const port = 8000;

app.use(express.urlencoded());
app.use(cookieParser());

//set up static files
app.use(express.static('./assets'));

//load layouts
app.use(expressLayouts);

//extract scripts and styles
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session(
    {
        name: 'career_camp',
        secret: "something",
        saveUninitialized: false,
        resave: false,
        cookie:{
            maxAge: (1000 * 60 * 10)
        },
        store: new MongoStore(
            {
                mongooseConnection: db,
                autoRemove: 'disabled'
            }, function(err){
                console.log(err || "mongostore connection ok");
            }
        )
    }
));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes'));

//fireup server
app.listen(port, function(err){
    if(err){console.log(`Error in running the server ${err}`)}

    console.log(`Server is running on port : ${port}`);
})
