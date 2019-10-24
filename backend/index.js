const app = require('./myApp');
var pool = require('./pool');
const home = require('./routes/home');
const messaging = require('./routes/messaging');

const login = require('./routes/login');
const signup = require('./routes/signup');
const profile = require('./routes/profile');
const imager = require('./routes/imageroute');
const section = require('./routes/section');
const item = require('./routes/item');
const restaurant = require('./routes/restaurants');
const fetchimages = require('./routes/fetchimages');
const menu = require('./routes/menu');
const order = require('./routes/order');
const express = require('express')
const router = express.Router();

app.use("/orders", order);
app.use("/menu", menu);
app.use("/fetchimages", fetchimages);
app.use("/restaurant", restaurant);
app.use("/home", home);
app.use("/section", section);
app.use("/item", item);
app.use("/login", login);
app.use("/signup", signup);
app.use("/messaging", messaging)
app.use("/profile", profile);
app.use("/imager", imager);

const config = require('./config');
const mongoose = require('mongoose'); 

//All passport and jwt shit below

//all below for Jwt passport
const bodyParser = require('body-parser')
const passport = require('passport')
const jwt = require('jsonwebtoken')

app.use(passport.initialize());

require('./passport')(passport);

mongoose.connect(config.URL, { useNewUrlParser: true, useUnifiedTopology: true },(err,res)=>{
  if(err){
    console.log(`MongoDB Connection Failed::: ${err}`);
  }else{
    console.log(`Mongo connected!${res}`);
  }
});



app.listen(3001, function () {
  console.log('Grubhub-Server listening on port 3001!');
});

module.exports = app;