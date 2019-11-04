const express = require('express');
const router = express.Router();
const passwordHash = require('password-hash');
const passport = require('passport')
var kafka = require('../kafka/client');

const userModel = require('../db_Schema/user');





router.post('/customer', (req, res)=> {



  console.log(`****----sachin------******`);
  console.log(req.body);
  req.body.originalUrl = req.originalUrl;
  kafka.make_request('singup', req.body, function (err, results) {
    console.log(`*******------2-------******`);
    console.log('in result');
    console.log(results);
    console.log('in errrrrrrr');
    console.log(err);
    console.log(`*******------3-------******`);
    if (err) {
      console.log("Inside err");
      console.log(err);
      res.status(500).send(err);

    } else {
      console.log(`*******------4-------******`);
      console.log("Inside else");
      console.log(results);
      res.status(200).send(results)
    }
  });







  // if (!req.body) {
  //   res.status(401).send("Error in Data");
  // }
  // else {

  //   var hashedPassword = passwordHash.generate(req.body.password);
  //   var newUser = new userModel({
  //     name: req.body.name,
  //     email: req.body.email_id,
  //     password: hashedPassword,
  //     address: req.body.address,
  //     phone_number: req.body.phone_number,
  //     is_owner: 0
  //   });
  //   // Attempt to save the user
  //   newUser.save(err => {
  //     if (err && err.code===11000) {
  //       res.status(401).send("User already exists");
  //       return;
  //     }
  //     else {
  //       res.status(200).send("User added");
  //     }
  //   });
  // }
});


router.post('/owner', (req, res) => {




  console.log(`****----sachin------******`);
  console.log(req.body);
  req.body.originalUrl = req.originalUrl;
  kafka.make_request('signup', req.body, function (err, results) {
    console.log(`*******------2-------******`);
    console.log('in result');
    console.log(results);
    console.log('in errrrrrrr');
    console.log(err);
    console.log(`*******------3-------******`);
    if (err) {
      console.log("Inside err");
      console.log(err);
      res.status(500).send(err);

    } else {
      console.log(`*******------4-------******`);
      console.log("Inside else");
      console.log(results);
      res.status(200).send(results)
    }
  });










  // var hashedPassword = passwordHash.generate(req.body.password);
  // var newOwner = new userModel({
  //   name: req.body.name,
  //   email: req.body.email_id,
  //   password: hashedPassword,
  //   address: req.body.address,
  //   phone_number: req.body.phone_number,
  //   is_owner: true   
  // });

  // var newRes={
  //   res_name: req.body.res_name,
  //   res_cuisine: req.body.res_cuisine,
  //   res_zip_code: req.body.res_zip_code,
  //   user_address : req.body.address,
  //   user_ref : newOwner._id
  // }

  // newOwner.restaurant = newRes

  // if (!req.body) {
  //   res.status(500).send("Error in Data");
  // }

  // newOwner.save(err => {
  //   if (err && err.code===11000) 
  //     {
  //     res.status(401).send("User already exists");
  //     }
  //   else 
  //     res.status(200).send("User added");
  // })

});


module.exports = router;