// importing the modules
const express = require('express')
const collection = require('../models/mongodb')

const router = express.Router()

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

// editing the user
router.get('/edit/:id',(req, res)=>{
    let id = req.params.id;
    collection.findById(id)
    .then(user=>{
        if(!user){
            res.redirect('/adminDashboard')
        } else {
            res.render('edit_users',{user : user})
        }
    })
    .catch(err =>{
        console.log("Error in finding the user : ", err);
        res.redirect('/adminDashboard')
    })
})

// updating the user
router.post('/update/:id', async (req, res) => {
    try{
        let id = req.params.id
        const result = await collection.findByIdAndUpdate(id, {
            name : req.body.name,
            password : req.body.password,
            email : req.body.email,
            phone : req.body.phone,
        })
        if(!result){
            res.json({message : 'User not found', type : 'danger'})
        } else { 
            req.session.message ={
                type : 'success',
                message : 'User updated sucessfully'
            }
            res.redirect('/adminDashboard')
        }
    }catch(err){
        console.log('Error updating the user : ',err);
        res.json({message : err.message, type :'danger'})
    }
})

// getting the admindashboard
router.get('/',(req, res)=>{
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

// deleting the user

router.get('/delete/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await collection.findByIdAndRemove(id);
  
      if (result) {
        req.session.message = {
          type: 'success',
          message: 'User deleted successfully',
        };
      } else {
        res.json({ message: 'User not found' });
      }
  
      res.redirect('/adminDashboard');
    } catch (err) {
      console.error('Error deleting user: ', err);
      res.json({ message: err.message });
    }
  });
  

// exporting the module
module.exports = router