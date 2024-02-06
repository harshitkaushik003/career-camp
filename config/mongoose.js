const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/career_camp_dev");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting to db"));
db.once('open', ()=>{
    console.log("Successfully connected to database")
});

module.exports = db;
