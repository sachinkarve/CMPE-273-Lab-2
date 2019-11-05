const express = require('express')
const router = express.Router();
const orderModel = require('../db_Schema/orders')
const passport = require('passport')
var kafka = require('../kafka/client');


router.get('/get/:order_id', passport.authenticate('jwt', { session: false }),(req, res) => {
let params={
    order_id : req.params.order_id
}
    kafka.make_request('messaging', params, function (err, results) {
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
          if (results == "SOMETHING_WENT_WRONG")
          res.status(500).send("SOMETHING_WENT_WRONG")
          else
          res.status(200).send(results)
        }
      });

    // console.log(`\n\n****---req.params----****`);
    // console.log(req.params);
    // orderModel.findById(req.params.order_id, (err, fetchedOrder) => {
    //     if (err) {
    //         res.status(500).send("ERROR")
    //     }
    //     else if (fetchedOrder) {
    //         console.log(`****----fetchedOrder-----****`);
    //         console.log(fetchedOrder);
    //         res.status(200).send(fetchedOrder.messages)
    //     }

    //     })

    });










router.post('/send',passport.authenticate('jwt', { session: false }), (req, res) => {

  console.log(`#######------INSIDE_ SEND _MSG--------########`);

    req.body.originalUrl = req.originalUrl;


    kafka.make_request('messaging', req.body, function (err, results) {
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
          if(results == "SOMETHING_WENT_WRONG")
          res.status(500).send('SOMETHING_WENT_WRONG')
          else
          res.status(200).send(results)
        }
      });








    // console.log(`\n\n****---req.body----****`);
    // console.log(req.body);
    // orderModel.findById(req.body.order_id, (err, fetchedOrder) => {
    //     if (err) {
    //         res.status(500).send("ERROR")
    //     }
    //     else if (fetchedOrder) {
    //         console.log(`****----fetchedOrder-----****`);
    //         console.log(fetchedOrder);
    //         message = {
    //             order_id: req.body.order_id,
    //             sender_name: req.body.sender_name,
    //             receiver_name: req.body.receiver_name,
    //             messageText: req.body.messageText
    //         }
    //         fetchedOrder.messages.push(message);
    //         fetchedOrder.save((err, dbres) => {
    //             if (err) {
    //                 console.log(err);
    //                 res.status(400).send(err)
    //             }
    //             else if (dbres) {
    //                 console.log(`****----dbres-----****`);
    //                 console.log(dbres);
    //                 res.status(200).send(dbres)
    //             }
    //         })

    //     }
    // });
});



module.exports = router;