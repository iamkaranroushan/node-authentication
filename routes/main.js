const { Router } = require('express');
const user = require("../database/models/users")
const router = Router();

router.get("/",(req, res)=>{
    const local = {
        title: "Signup",
        description : "node authorization"
    }
    
    res.render('layouts/main', {local})
})

router.post("/", async(req, res)=>{

    const{ email, password}= req.body
    try {
        const User = await user.create({ email, password })
        res.status(201).json(User);

    } catch (error) {
        console.log (error);
        res.status(400).send('error, user not created');
    }
    
})





router.get("/admin",(req, res)=>{
    const local = {
        title: "admin",
        description : "node authorization"
    }
    res.render('layouts/admin', {local})
})










module.exports = router;