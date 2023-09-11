// importing the modules
const express = require('express')
const collection = require('../models/mongodb')

const router = express.Router()

router.get('/',async(req, res)=>{
   
    if(req.session.adminEntered){
        const users = await collection.find()
        const message1 = req.session.message1
        req.session.message1 = null
        
        res.render('adminDashboard',{users , message1})
    }else{
        res.render('admin')

    }
    
   
})
// setting the admin credentials
const credentials = {
    email : 'Nischal@gmail.com',
    password : 'red'

}

// rendering the admin dashboard
router.post('/',async(req, res)=>{
    req.session.data1=await collection.find()
    const {email, password} = req.body
    console.log(email, password);
    try{
        if(email === credentials.email && password === credentials.password){
            req.session.adminEntered=req.body.email
            res.redirect('/admin')
        }
        else{
           
            req.session.message = {
                type : 'danger',
                message : 'Invalid admin credentials !'
            } 
            res.redirect('/')
        }
    }
    catch{
     
        req.session.message = {
            type : 'danger',
            message : 'Invalid admin credentials !'
        } 
        res.redirect('/')
    }

})

// editing the user
router.get('/edit/:id',(req, res)=>{
    let id = req.params.id;
    collection.findById(id)
    .then(user=>{
        if(!user){
            res.redirect('/admin')
        } else {
            res.render('edit_users',{user : user})
        }
    })
    .catch(err =>{
        console.log("Error in finding the user : ", err);
        res.redirect('/admin')
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
            res.redirect('/admin')
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
        res.redirect('/admin')
    })
    .catch (err=>{
        console.error('Error querying users:', err);
        res.status(500).send('Internal Server Error');
    })
})

router.get('/add',(req ,res)=>{
    res.render('adminsign')
})

router.post('/add', async(req, res)=>{
    console.log(req.body.email,req.body.password);
     const data2 = {
        name : req.body.name,
        password : req.body.password,
        email : req.body.email,
        phone : req.body.phone,
    }
    // console.log(data);
    await collection.insertMany([data2]);


    // rendering the login page

    req.session.message1 = {
        type : 'success',
        message : 'Registration successfull'
    }
    res.redirect('/admin');
})


// deleting the user
// router.get('/admin',(req, res)=>{
//     res.render('adminsign')
// })
router.get('/delete/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await collection.findByIdAndRemove({_id: id});
  
      if (result) {
        req.session.message1 = {
          type: 'success',
          message: 'User deleted successfully',
          
        }
        res.redirect('/admin');
      } else {
        res.json({ message: 'User not found' });
      }
  
    } catch (err) {
      console.error('Error deleting user: ', err);
      res.json({ message: err.message });
    }
  });
  

  router.get("/logout", (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
          console.log(err);
          res.send("Error");
        } else {
          console.log("logout successful");
          res.status(200)
          res.redirect('/admin')
          
        }
      });
})

// exporting the module
module.exports = router