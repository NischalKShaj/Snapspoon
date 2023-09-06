// importing the modules
const express = require('express')
const collection = require('../models/mongodb')

const router = express.Router()

// getting all the users
const credentials ={
    name : 'Nischal'
}
router.post('/',(req, res)=>{
    collection.find()
    .exec()
    .then(users=>{
        res.render('adminDashboard',{credentials,users :users })
    })
    .catch (err=>{
        console.error('Error querying users:', err);
        res.status(500).send('Internal Server Error');
    })
})

router.post('/add',(req, res)=>{
    res.redirect('/signup')
})


// exporting the module
module.exports = router