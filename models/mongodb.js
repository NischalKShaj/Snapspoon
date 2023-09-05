// importing the module for the mongodb
const mongoose = require('mongoose')

// declaring the schema for the database
const snapSpoonUsers = new mongoose.Schema({

    name : {
        type : String,
        required : true,
    },
    password :{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
    },
    phone :{
        type : String,
        required : true,
    },
    created : {
        type : Date,
        required : true,
        default : Date.now,
    }
    
})


// declaring the collection name
const collection = new mongoose.model("Users",snapSpoonUsers)

// exporting the module
module.exports = collection