// importing the modules
const express = require('express')
const Users = require('../models/mongodb')

const router = express.Router()

// getting all the users
router.post('/',(req, res)=>{
    Users.find()
    .exec()
    .then(users=>{
        res.render('adminDashboard',{users :users })
    })
    .catch (err=>{
        console.error('Error querying users:', err);
        res.status(500).send('Internal Server Error');
    })
})

// setting up the middleware
// router.post('/',(req ,res)=>{
//     res.render('adminDashboard')
// })

router.post('/add',(req, res)=>{
    res.redirect('/signup')
})


// exporting the module
module.exports = router