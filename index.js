//require express
const express = require('express');

//create server 
const app = express();

//create port
const port = 8000;

//fireup server
app.listen(port, function(err){
    if(err){console.log(`Error in running the server ${err}`)}

    console.log(`Server is running on port : ${port}`);
})