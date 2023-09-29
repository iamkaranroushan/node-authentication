const express = require("express");
const mainRoute  = require('./routes/main')
const mongoose = require("mongoose")
const expressLayout = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
//initiallizes the app
const app = express()

//middlewares
app.use(express.static('public'));
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());

//database connection

const MongodbURI = 'mongodb+srv://karan:jpdpk9897c@cluster3.h1qqk80.mongodb.net/'

mongoose.connect(MongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then((result)=>app.listen(3000,()=>{
        console.log("database connected and app is listening on port 5000");
    }) )
    .catch((err)=> console.log(err));


//routes
app.use('/', mainRoute)






