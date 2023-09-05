// importing the modules
const express = require('express')
const collection = require('../models/mongodb')
const router = express.Router()

// rendering the signup page
router.get('/', (req, res)=>{
    res.render('signup')
})

// rendering the login page after getting the new users data
router.post('/',async (req, res)=>{
    console.log(req.body.email,req.body.password);
    const data = {
        name : req.body.name,
        password : req.body.password,
        email : req.body.email,
        phone : req.body.phone,
    }
    console.log(data);
    await collection.insertMany([data]);

    // rendering the login page
    res.redirect('/');
})

module.exports = router
