const express = require("express");
const router = express.Router();
const pool = require('../pool.js');
const orderModel = require('../db_Schema/orders')


router.get('/pendingorders/:user_id', (req, res) => {
  console.log(`*****-----HHHHH----*******`);
  console.log(req.params.user_id);
  orderModel.find({ "customer.customer_id": req.params.user_id, "order_status": "ORDER_PLACED" }, (err, order) => {
    if (err) {
      return res.status(500).send("NO_PENDING_ORDERS");
    } else if (order) {

      res.status(200).send(order)
    }
  });
});

router.get('/completedorders/:user_id', (req, res) => {
  console.log(`*****----FFFF-----*******`);
  console.log(req.params.user_id);
  orderModel.find({ "customer.customer_id": req.params.user_id, "order_status": "ORDER_CANCELED" || "ORDER_COMPLETED" }, (err, order) => {
    if (err) {
      return res.status(500).send("NO_PAST_ORDERS");
    } else if (order) {
      console.log(order);
      res.status(200).send(order)
    }
  });

});

router.get('/pendingorders/restaurant/:user_id', (req, res) => {

  console.log(`*****-----HGHGH----*******`);
  console.log(req.params.user_id);
  orderModel.find({ "restaurant.owner_user_id": req.params.user_id, "order_status": "ORDER_PLACED" }, (err, order) => {
    if (err) {
      return res.status(500).send("NO_PAST_ORDERS");
    } else if (order) {
      console.log(order);
      res.status(200).send(order)
    }
  });
});

router.get('/completedorders/restaurant/:user_id', (req, res) => {

  console.log(`*****-----COMPLETED----*******`);
  console.log(req.params.user_id);
  orderModel.find({ "restaurant.owner_user_id": req.params.user_id, "order_status": "ORDER_CANCELED" }, (err, order) => {
    if (err) {
      return res.status(500).send("NO_PAST_ORDERS");
    } else if (order) {
      console.log(order);
      res.status(200).send(order)
    }
  });

});

router.get('/orderitems/:order_id', (req, res) => {

  let sql = `CALL Fetch_order_items(${req.params.order_id});`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Database Error");
    }
    if (result && result.length > 0 && result[0][0]) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(JSON.stringify(result[0]));
    }
    else {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("NO_RECORDS");
    }
  });
});


router.post('/orderstatus', (req, res) => {
  // order_status: 'DELIVERED',
  // order_id: '5dafb0d04b30384d92fb292a'

  console.log(`*****-----ORDER_STATUS----*******`);
  console.log(req.body);
  orderModel.findById(req.body.order_id, (err, order) => {
    if (err) {
      console.log(err);
      return res.status(500).send("NO_ORDERS");
    } else if (order) {
      console.log(`****----order----****`);
      console.log(order);
      order.order_status = "ORDER_CANCELLED"
      order.save((err, saveres => {
        if (err) {
          console.log(err);
        } else {
          console.log(saveres);
          console.log(`STATUS_CHANGED`);
          res.status(200).send(order)

        }
      }));
    }
  });
});

router.post('/cancelorder', (req, res) => {
  console.log(`*****-----ORDER_ID----*******`);
  console.log(req.body);
  orderModel.findById(req.body.order_id, (err, order) => {
    if (err) {
      console.log(err);
      return res.status(500).send("NO_ORDERS");
    } else if (order) {
      console.log(`****----order----****`);
      console.log(order);
      order.order_status = "ORDER_CANCELLED"
      order.save((err, saveres => {
        if (err) {
          console.log(err);
        } else {
          console.log(saveres);
          console.log(`ORDER_CANCELLED`);
          res.status(200).send(order)

        }
      }));
    }
  });


});

module.exports = router;