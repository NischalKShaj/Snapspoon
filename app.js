// importing the modules
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')

// importing the local modules
const adminRouter = require('./routes/admin')
const loginRouter = require('./routes/login')
const signupRouter = require('./routes/signup')
const adminDashRouter = require('./routes/adminDashboard')

const app = express()

// connecting the mongodb server
mongoose.connect("mongodb://localhost:27017/snapSpoonUsers")
.then(()=>{
    console.log("Mongodb is connected properly");
}).catch(()=>{
    console.log("Mongodb is not connected properly");
})

// declaring the port number 
const port = 3000;

// paring the user inputed data
app.use(express.urlencoded({extended : true}))
app.use(express.json())

// session handleing 
app.use(session({
    secret : ['mysecretkey','ujtyyt','sffddfg','dgdgdg','gyrtyr'],
    saveUninitialized : false,
    resave : false
}))

// for storing the session message
app.use((req ,res ,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

// setting the static pages
app.use(express.static('public'))

// setting the view engines
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

// setting the middlewares
app.use('/',loginRouter)
app.use('/home',loginRouter)
app.use('/signup',signupRouter)
// app.use('/adminDashboard',adminRouter)
// app.use('/adminDashboard',adminRouter)
// app.use('/adminDashboard',adminDashRouter)
// app.use('/adminDashboard/update',adminDashRouter)
app.use('/admin',adminDashRouter)


// connecting to the server
app.listen(port,()=>{
    console.log(`The server is connected to the port ${port}`);
})
