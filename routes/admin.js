// importing the modules
const express = require('express')
const router = express.Router()
const collection = require('../models/mongodb')


// rendering the admin page
router.get('/',(req, res)=>{
    res.render('admin')
})

// setting the admin credentials
const credentials = {
    email : 'Nischal@gmail.com',
    password : 'red'

}

// rendering the admin dashboard
router.post('/',(req, res)=>{
    const {email, password} = req.body
    console.log(email, password);
    if(email === credentials.email && password === credentials.password){

        collection.find()
        .exec()
        .then(users=>{
            res.render('adminDashboard',{credentials, users :users })
            console.log("valid credentials of admin");
        })
        .catch (err=>{
            console.error('Error querying users:', err);
            res.status(500).send('Internal Server Error');
        })
    } else {
        res.redirect('/')
        console.log("Invalid credentials of the admin");
    }
})


module.exports = router