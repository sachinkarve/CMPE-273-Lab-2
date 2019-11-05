const express = require('express')
const router = express.Router();
const pool = require('../pool')
const passwordHash = require('password-hash');
const passport = require('passport')
var kafka = require('../kafka/client');

const userModel = require('../db_Schema/user')

//this shows the user profile
router.post('/userget',passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.originalUrl = req.originalUrl

  kafka.make_request('profile', req.body, function (err, results) {
    
    if (err) {
      res.status(500).send(err);
    } else {
      if(results == "NOT_FETCHED"){
        console.log(`##############`);
        res.status(500).send('UNABLE_TO_FETCH');
      }else{
        console.log(`$$$$$$$$$$$$$$`)
        res.status(200).send(results)
      }
    }
  });

  // userModel.findById(req.body.user_id , (err, user) => {
  //   if (err) {
  //     res.status(500).send('Error in Data')
  //   } else {
  //     res.status(200).send(user)
  //   }
  // })
});

router.post('/restaurantget', passport.authenticate('jwt', { session: false }),(req, res) => {
  req.body.originalUrl = req.originalUrl

  kafka.make_request('profile', req.body, function (err, results) {
    
    if (err) {
      res.status(500).send(err);
    } else {
      if(results == "NOT_FETCHED"){
        console.log(`##############`);
        res.status(500).send('NOT_FETCHED');
      }else{
        console.log(`$$$$$$$$$$$$$$`)
        res.status(200).send(results)
      }
    }
  });







  // userModel.findOne({ _id: req.body.user_id }, (err, user) => {
  //   if (err) {
  //     res.status(500).send('Error in Data')
  //     return;
  //   } else {
  //     console.log(user);
  //     res.status(200).send(user)
  //   }
  // })
});


//
router.post('/restaurantupdate',passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.originalUrl = req.originalUrl
  kafka.make_request('profile', req.body, function (err, results) {
    
    if (err) {
      res.status(500).send(err);
    } else {
      if(results != "RESTAURANT_UPDATED"){
        console.log(`##############`);
        res.status(500).send('PASSWORD_INCORRECT_NO_USER_FOUND');
      }else{
        console.log(`$$$$$$$$$$$$$$`)
        res.status(200).send(results)
      }
    }
  });






  // var hashedPassword;
  // if (req.body.password && req.body.password !== "") {
  //   var hashedPassword = passwordHash.generate(req.body.password);
  // } 
  // console.log(`hashedpasswordvalue`);
  // console.log(hashedPassword);
  // userModel.findById(req.body.user_id , (err, user) => {
  //   if (err) {
  //     res.status(500).send("User_not_Found_which_is_never_gonna_happen")
  //   }
  //   else {
  //     userModel.findOneAndUpdate({ _id: req.body.user_id }, {
  //       $set: {
  //         email: req.body.email_id,
  //         name: req.body.name,
  //         password: hashedPassword || user.password,
  //         address: req.body.address,
  //         phone_number: req.body.phone_number,
  //         restaurant: {
  //           res_cuisine: req.body.res_cuisine,
  //           res_zip_code: req.body.res_zip_code,
  //           res_name: req.body.res_name
  //         }
  //       }
  //     },
  //       { new: true },
  //       (err, updateResponse) => {
  //         if (err) {
  //           res.status(500).send("Error in Data")
  //           return;
  //         } else {
  //           res.status(200).send('Restaurant Updated')
  //         }
  //       });
  //   }
  // })
});




//
router.post('/customerupdate',passport.authenticate('jwt', { session: false }), (req, res) => {

  req.body.originalUrl = req.originalUrl

  console.log(`****----Inside customerupdate------******`);
  console.log(req.body);
  req.body.originalUrl = req.originalUrl;
  kafka.make_request('profile', req.body, function (err, results) {
    if (err) {
      console.log("Inside err");
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log(`*******------4-------******`);
      console.log("Inside else");
      console.log(results);
      if(results != "CUSTOMER_UPDATED"){
        console.log(`##############`);
        res.status(500).send('PASSWORD_INCORRECT_NO_USER_FOUND');
      }else{
        console.log(`$$$$$$$$$$$$$$`)
        res.status(200).send(results)
      }
    }
  });









  // console.log(`password in request:: ${req.body.password}`);
  // var hashedPassword;
  // if (req.body.password && req.body.password !== "") {
  //    hashedPassword =passwordHash.generate(req.body.password);
  // }
  // console.log(`hashedPassword::::`);
  // console.log(hashedPassword);

  // userModel.findOne({ _id: req.body.user_id }, (err, user) => {
  //   if (err) {
  //     throw errs
  //   } else {
  //     console.log(user.password);
  //     userModel.findOneAndUpdate({ _id: req.body.user_id }, {
  //       $set: {
  //         name: req.body.name,
  //         password: hashedPassword || user.password,
  //         address: req.body.address,
  //         phone_number: req.body.phone_number
  //       }
  //     }, { new: true },
  //       (err, userData) => {
  //         if (err) {
  //           res.status(500).send('Error in Data');
  //           return;
  //         }
  //         else {
  //           res.status(200).send('Customer updated')
  //         }
  //       })

  //   }
  // })
});


module.exports = router;