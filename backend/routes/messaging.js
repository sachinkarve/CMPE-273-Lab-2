const express = require('express')
const router = express.Router();
const orderModel = require('../db_Schema/orders')
const passport = require('passport')



router.get('/get/:order_id', (req, res) => {
    console.log(`\n\n****---req.params----****`);
    console.log(req.params);
    orderModel.findById(req.params.order_id, (err, fetchedOrder) => {
        if (err) {
            res.status(500).send("ERROR")
        }
        else if (fetchedOrder) {
            console.log(`****----fetchedOrder-----****`);
            console.log(fetchedOrder);
            res.status(200).send(fetchedOrder.messages)
        }

        })
    });










router.post('/send', (req, res) => {
    console.log(`\n\n****---req.body----****`);
    console.log(req.body);
    orderModel.findById(req.body.order_id, (err, fetchedOrder) => {
        if (err) {
            res.status(500).send("ERROR")
        }
        else if (fetchedOrder) {
            console.log(`****----fetchedOrder-----****`);
            console.log(fetchedOrder);
            message = {
                order_id: req.body.order_id,
                sender_name: req.body.sender_name,
                receiver_name: req.body.receiver_name,
                messageText: req.body.messageText
            }
            fetchedOrder.messages.push(message);
            fetchedOrder.save((err, dbres) => {
                if (err) {
                    console.log(err);
                    res.status(400).send(err)
                }
                else if (dbres) {
                    console.log(`****----dbres-----****`);
                    console.log(dbres);
                    res.status(200).send(dbres)
                }
            })

        }
    });
});



module.exports = router;