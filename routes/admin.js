const express = require('express')
const router = express.Router()

router.get('/',(req, res)=>{
    res.render('admin')
})

const credentials = {
    email : 'Nischal@gmail.com',
    password : 'red'

}

router.post('/',(req ,res)=>{
    const {email ,password} = req.body;
    console.log(email, password);
    if(email === credentials.email && password === credentials.password ){
        res.render('adminDashboard')
        console.log("Valid credentials of the admin");
    } else {
        res.redirect('/')
        console.log("Invalid credentials of the admin");
    }
})

module.exports = router