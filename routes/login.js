// importing the modules
const express = require('express')
const router = express.Router()
const collection = require('../models/mongodb')

// rendering the login page
router.get('/',(req, res)=>{
    res.render('login')
})


// rendering the home page if the given username and password is true
router.post('/',async(req, res)=>{
    try{
        const check = await collection.findOne({email : req.body.email ,password : req.body.password})  //checking whether the value is present in the database
        console.log(check);
        if(check.email === req.body.email && check.password === req.body.password){ // checking whether the value entered and the value in the database same
            res.render('homepage');
        }
    }catch{                          //if the user is not found then login page will be rendered
        res.redirect('/')
    }
})


module.exports = router