const express = require("express");
const mainRoute  = require('./routes/main')


//initiallizes the app
const app = express()


//middlewares
app.use(express.static('/public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))
app.use(express.json());





app.use(mainRoute )





//listening the app on port 3000
app.listen(3000,()=>{
    console.log("app is listening on port 3000");
})