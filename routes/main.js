const { Router } = require('express');

const router = Router();

router.get("/",(req, res)=>{
    const local = {
        title: "homepage",
        description : "node authorization"
    }
    
    res.render('layouts/main', {local})
})

router.post("/",(req, res)=>{
    const local = {
        title: "homepage",
        description : "node authorization"
    }
    const data = req.body
    // res.send(data);
    data.username === "karan"  ? res.redirect('/admin') : res.send("<h1>wrong credential</h1>")
})

router.get("/admin",(req, res)=>{
    const local = {
        title: "admin",
        description : "node authorization"
    }
    res.render('layouts/admin', {local})
})










module.exports = router;