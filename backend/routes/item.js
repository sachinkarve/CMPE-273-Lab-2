const express = require('express')
const router = express.Router();
const pool = require('../pool')
const passwordHash = require('password-hash');
const userModel = require('../db_Schema/user')
var kafka = require('../kafka/client');


//this shows the user profile
router.post('/additem', (req, res) => {
  console.log(`****----sachin------******`);
  console.log(req.body);
  req.body.originalUrl = req.originalUrl;
  kafka.make_request('items', req.body, function (err, results) {
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


router.post('/update', (req, res) => {
  req.body.originalUrl = req.originalUrl;

  kafka.make_request('items', req.body, function (err, results) {
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



//this shows the user profile
router.post('/deleteitem', (req, res) => {
  req.body.originalUrl = req.originalUrl;

  kafka.make_request('items', req.body, function (err, results) {
    console.log(`*******------2-------******`);
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