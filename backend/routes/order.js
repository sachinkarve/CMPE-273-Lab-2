const express = require("express");
const router = express.Router();
const pool = require('../pool.js');
const orderModel = require('../db_Schema/orders')
var kafka = require('../kafka/client');
const passport = require('passport')


router.get('/pendingorders/:user_id',passport.authenticate('jwt', { session: false }), (req, res) => {

  let params = {
    user_id: req.params.user_id,
    originalUrl: 'pendingorders'
  }

  kafka.make_request('orders', params, function (err, results) {
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







router.get('/completedorders/:user_id', passport.authenticate('jwt', { session: false }),(req, res) => {

  let params = {
    user_id: req.params.user_id,
    originalUrl: 'completedorders'
  }
  kafka.make_request('orders', params, function (err, results) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results)
    }
  });
});






router.get('/pendingorders/restaurant/:user_id',passport.authenticate('jwt', { session: false }), (req, res) => {

  let params = {
    user_id: req.params.user_id,
    originalUrl: 'pendingorders/restaurant'
  }
  kafka.make_request('orders', params, function (err, results) {
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





router.get('/completedorders/restaurant/:user_id',passport.authenticate('jwt', { session: false }), (req, res) => {
console.log(`**********--------completedorders--------*********`);
console.log(req.params);
  let params = {
    user_id: req.params.user_id,
    originalUrl: 'completedorders/restaurant'
  }

  kafka.make_request('orders', params, function (err, results) {
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





router.post('/orderstatus',passport.authenticate('jwt', { session: false }), (req, res) => {

  req.body.originalUrl = req.originalUrl


  kafka.make_request('orders', req.body, function (err, results) {
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





router.post('/cancelorder', passport.authenticate('jwt', { session: false }),(req, res) => {

  req.body.originalUrl = req.originalUrl
  kafka.make_request('orders', req.body, function (err, results) {
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