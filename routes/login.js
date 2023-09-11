// importing the modules
const express = require('express')
const router = express.Router()
const collection = require('../models/mongodb')

// rendering the login page
router.get('/',(req, res)=>{
    if(req.session.user){
        console.log(req.session.user);
        res.render('homepage')
        
    }else{

        res.render('login')
    }
})


// rendering the home page if the given username and password is true
router.post('/',async(req, res)=>{
    try{
        const check = await collection.findOne({email : req.body.email ,password : req.body.password}) 
         //checking whether the value is present in the database
        console.log(check);
        if(check.email === req.body.email && check.password === req.body.password){ // checking whether the value entered and the value in the database same
            req.session.user = req.body.email
            console.log(req.session.user);
            res.redirect('/home');
        } else {
            res.redirect('/')
        }
    }catch{ 
        req.session.message = {
            type : 'warning',
            message : 'Invalid user details !'
        }                         //if the user is not found then login page will be rendered
        res.redirect('/')
    }
})
//  destroying the session when the user clickes the logout button
router.post("/logout", (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
          console.log(err);
          res.send("Error");
        } else {
          console.log("logout successful");
          res.status(200)
          res.redirect('/')
        }
      });
})

module.exports = router