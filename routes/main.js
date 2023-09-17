const { Router } = require('express');
const user = require("../database/models/users");
const { handle } = require('express/lib/application');
const router = Router();

const adminLayout = './layouts/admin';
// const Layout = './layouts/admin'
//sign up 

router.get("/signup",(req, res)=>{
    const local = {
        title: "Signup",
        description : "node authorization"
    }
    
    res.render('signup', {local})
})

const handleError=(err)=>{
    console.log(err.message, err.code)
    let errors = { email: '', password: ''};

    if (err.code === 11000){
        errors.email = 'this user email already exists.'
        return errors;
    }

    if( err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}




router.post("/signup", async(req, res)=>{

    const{ email, password}= req.body
    try {
        const User = await user.create({ email, password })
        res.status(201).redirect('admin');
        

    } catch (err) {
        const error = handleError(err);
        res.status(400).json({error});
    }
    
})


// log in

router.get("/login",(req, res)=>{
    const local = {
        title: "Login",
        description : "node authorization"
    }
    
    res.render('login', {local})
})

router.post("/login", async(req, res)=>{

    const{ email, password}= req.body
    try {
        

    } catch (error) {
        
    }
    
})





router.get("/admin",(req, res)=>{
    const local = {
        title: "admin",
        description : "node authorization",
        
    }
    res.render('layouts/admin', {local, layout: adminLayout})
})









module.exports = router;