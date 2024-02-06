//require express
const express = require('express');

const cookieParser = require('cookie-parser');

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

//use express router
app.use('/', require('./routes'));

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//fireup server
app.listen(port, function(err){
    if(err){console.log(`Error in running the server ${err}`)}

    console.log(`Server is running on port : ${port}`);
})
