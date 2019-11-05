const express = require('express')
const router = express.Router();
const pool = require('../pool')
const passwordHash = require('password-hash');
const passport = require('passport')
const userModel = require('../db_Schema/user')
const ObjectID = require("mongodb").ObjectID;
var kafka = require('../kafka/client');



router.post('/editsection', passport.authenticate('jwt', { session: false }),(req, res) => {


  console.log(`****----sachin------******`);
  console.log(req.body);
  req.body.originalUrl = req.originalUrl;
  kafka.make_request('sections', req.body, function (err, results) {
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









  // console.log(`\n\n****---req.body----****`);
  // console.log(req.body);
  // userModel.findById(req.body.user_id, (err, fetchedUser) => {
  //   if (err) {
  //     res.status(500).send("ERROR")
  //   }
  //   else if (fetchedUser) {
  //     console.log(`****----fetchedUser-----****`);
  //     console.log(fetchedUser);
  //     let sectionObj = fetchedUser.restaurant.menu_sections.id(req.body.section_id)
  //     if (!sectionObj) {
  //       res.status(500).send("SECTION_DOES_NOT_EXISTS")
  //     } else {
  //       sectionObj.menu_section_name = req.body.dynamic_menu_section_name;
  //       fetchedUser.save((err, dbres) => {
  //         if (err) {
  //           console.log(`****----DB_ERROR-----****`);
  //           console.log(ERR);
  //           res.status(500).send("ERROR")
  //         } else {
  //           console.log(`****----DB_RES-----****`);
  //           console.log(dbres);
  //           res.status(200).send("SUCCESS")
  //         }
  //       })
  //     }
  //   }
  // });
});


router.get("/:user_id",passport.authenticate('jwt', { session: false }), (req, res) => {




  console.log(`****----sachin------******`);
  console.log(req.params);
  let params ={
    user_id : req.params.user_id
  }
  kafka.make_request('sections', params, function (err, results) {
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


  // console.log(req.params);
  // userModel.findById(req.params.user_id, (err, owner)=>{
  //   if (err) {
  //     res.status(500).send("Error in Data")
  //   }
  //   if (!owner) {
  //     return res.status(400).send("User does not exist");
  //   }
  //   else {
  //     return res.status(200).send(owner.restaurant.menu_sections);
  //   }
  // });
});


//this shows the user profile
router.post('/addsection',  passport.authenticate('jwt', { session: false }),(req, res) => {


  //passport.authenticate('jwt', { session: false }),

  console.log(`****----sachin------******`);
  console.log(req.params);
  req.body.originalUrl = req.originalUrl;
  kafka.make_request('sections', req.body, function (err, results) {
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










  // var flag = 0
  // userModel.findById(req.body.user_id, (err, fetchedUser) => {
  //   if (err) {
  //     return res.status(500).send("Error in Data");
  //   }
  //   console.log(fetchedUser)
  //   fetchedUser.restaurant.menu_sections.map(sec => {
  //     if (sec.menu_section_name == req.body.sectionName) {
  //       flag = 1;
  //     }
  //   })
  //   if (!flag) {
  //     fetchedUser.restaurant.menu_sections.push({ menu_section_name: req.body.sectionName, restaurant_ref: fetchedUser.restaurant._id })
  //     fetchedUser.save((err, dbres) => {
  //       if (err) {
  //         console.log(err);
  //         console.log('SECTION_ADDITION_FAILED');
  //         res.status(200).send("SECTION_ADDITION_FAILED")
  //         return;
  //       }
  //       console.log(`SECTION_ADDED`);
  //       res.status(200).send("SECTION_ADDED")
  //       return;
  //     })
  //   } else {
  //     console.log(`SECTION_EXISTS`);
  //     res.status(200).send("SECTION_EXISTS")
  //   }
  // })
});


//this shows the user profile
router.post('/deletesection',passport.authenticate('jwt', { session: false }), (req, res) => {


  console.log(`****----sachin------******`);
  console.log(req.params);
  req.body.originalUrl = req.originalUrl;
  kafka.make_request('sections', req.body, function (err, results) {
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
});

module.exports = router;