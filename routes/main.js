const { Router } = require('express');
const user = require("../database/models/users");
// const { handle } = require('express/lib/application');
const router = Router();
const jwt = require('jsonwebtoken');



const adminLayout = './layouts/admin';


//sign up 

router.get("/signup",(req, res)=>{
    const local = {
        title: "Signup",
        description : "node authorization"
    }
    
    res.render('signup', {local})
})

// handling error

const handleError=(err)=>{
    console.log(err.message, err.code)
    let errors = { email: '', password: ''};

    if(err.message === "incorrect email"){
        errors.email = "email not registered"
    }

    if(err.message === "incorrect password"){
        errors.password = "wrong password"
    }
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
const maxAge = 3*24*60*60;

const createToken=(id)=>{
    return jwt.sign({id}, 'mySecret', {
        expiresIn:maxAge
    })
}

router.post("/signup", async(req, res)=>{

    const{ email, password}= req.body
    try {
        const User = await user.create({ email, password })
        const token = createToken(User._id)
        res.cookie('jwt', token, {httpOnly:true, maxAge:maxAge* 1000});
        res.status(201).redirect('/admin')

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

    const{ email, password }= req.body
   
    try {
        const User = await user.login(email, password);
        const token = createToken(User._id)
        res.cookie('jwt', token, {httpOnly:true, maxAge:maxAge* 1000});
        res.status(200).redirect('/admin')
    } catch(err) {
        const errors = handleError(err)
        res.status(400).json({errors});
    }
})



router.get('/admin',(req,res)=>{
    const local = {
        title: "Admin",
        description : "node authorization"
    }
    
    res.render('./layouts/admin', {local, layout:adminLayout})

})










module.exports = router;