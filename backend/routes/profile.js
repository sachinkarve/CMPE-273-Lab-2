const express = require('express')
const router = express.Router();
const pool = require('../pool')
const passwordHash = require('password-hash');
const passport = require('passport')

const userModel = require('../db_Schema/user')

//this shows the user profile
router.post('/userget', (req, res) => {
  userModel.findById(req.body.user_id , (err, user) => {
    if (err) {
      res.status(500).send('Error in Data')
      return;
    } else {
      console.log(user);
      res.status(200).send(user)
    }
  })
});

router.post('/restaurantget', (req, res) => {
  userModel.findOne({ _id: req.body.user_id }, (err, user) => {
    if (err) {
      res.status(500).send('Error in Data')
      return;
    } else {
      console.log(user);
      res.status(200).send(user)
    }
  })
});


//
router.post('/restaurantupdate', (req, res) => {
  var hashedPassword;
  if (req.body.password && req.body.password !== "") {
    var hashedPassword = passwordHash.generate(req.body.password);
  } 
  console.log(`hashedpasswordvalue`);
  console.log(hashedPassword);
  userModel.findById(req.body.user_id , (err, user) => {
    if (err) {
      res.status(500).send("User_not_Found_which_is_never_gonna_happen")
    }
    else {
      userModel.findOneAndUpdate({ _id: req.body.user_id }, {
        $set: {
          email: req.body.email_id,
          name: req.body.name,
          password: hashedPassword || user.password,
          address: req.body.address,
          phone_number: req.body.phone_number,
          restaurant: {
            res_cuisine: req.body.res_cuisine,
            res_zip_code: req.body.res_zip_code,
            res_name: req.body.res_name
          }
        }
      },
        { new: true },
        (err, updateResponse) => {
          if (err) {
            res.status(500).send("Error in Data")
            return;
          } else {
            res.status(200).send('Restaurant Updated')
          }
        });
    }
  })
});




//
router.post('/customerupdate', (req, res) => {
  console.log(`password in request:: ${req.body.password}`);
  var hashedPassword;
  if (req.body.password && req.body.password !== "") {
     hashedPassword =passwordHash.generate(req.body.password);
  }
  console.log(`hashedPassword::::`);
  console.log(hashedPassword);

  userModel.findOne({ _id: req.body.user_id }, (err, user) => {
    if (err) {
      throw errs
    } else {
      console.log(user.password);
      userModel.findOneAndUpdate({ _id: req.body.user_id }, {
        $set: {
          name: req.body.name,
          password: hashedPassword || user.password,
          address: req.body.address,
          phone_number: req.body.phone_number
        }
      }, { new: true },
        (err, userData) => {
          if (err) {
            res.status(500).send('Error in Data');
            return;
          }
          else {
            res.status(200).send('Customer updated')
          }
        })

    }
  })
});


module.exports = router;