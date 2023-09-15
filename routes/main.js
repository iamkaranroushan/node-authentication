const { Router } = require('express');

const router = Router();

router.get("/",(req, res)=>{
    const local = {
        title: "homepage",
        description : "node authorization"
    }
    
    res.render('layouts/main', {local})
})

router.get("/admin",(req, res)=>{
    const local = {
        title: "admin",
        description : "node authorization"
    }
    res.render('layouts/admin', {local})
})

router.post("/",(req, res)=>{
    const local = {
        title: "homepage",
        description : "node authorization"
    }
    const data = req.body
    
    data.username === "karan"  ? res.redirect('/admin') : res.send("<h1>wrong credential</h1>")
})









module.exports = router;