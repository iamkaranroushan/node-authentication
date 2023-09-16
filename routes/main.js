const { Router } = require('express');
const user = require("../database/models/users")
const router = Router();

// const adminLayout = '../layouts/admin';

//sign up 

router.get("/signup",(req, res)=>{
    const local = {
        title: "Signup",
        description : "node authorization"
    }
    
    res.render('signup', {local})
})

router.post("/signup", async(req, res)=>{

    const{ email, password}= req.body
    try {
        const User = await user.create({ email, password })
        res.status(201).redirect('admin');
        

    } catch (error) {
        console.log (error);
        res.status(400).send('error, user not created');
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
        layout: '../layouts/admin'
    }
    res.render('layouts/admin', {local})
})









module.exports = router;