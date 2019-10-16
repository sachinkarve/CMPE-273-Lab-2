const express = require("express");
const router = express.Router();
const pool = require('../pool.js');

router.get('/pendingorders/:user_id', (req, res) => {

  let sql = `CALL Fetch_pending_orders(${req.params.user_id});`;
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
      res.end("NO_PENDING_ORDERS");
    }
  });
  console.log(`Pending Orders`);
});

router.get('/completedorders/:user_id', (req, res) => {

  let sql = `CALL Fetch_completed_orders(${req.params.user_id});`;
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
      res.end("NO_COMPLETED_ORDERS");
    }
  });
  console.log(`Completed orders`);
});

router.get('/pendingorders/restaurant/:user_id', (req, res) => {

  let sql = `CALL Fetch_res_pending_orders(${req.params.user_id});`;
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
      res.end("NO_PENDING_ORDERS");
    }
  });
  console.log(`restaurant id get`);
});

router.get('/completedorders/restaurant/:user_id', (req, res) => {

  let sql = `CALL Fetch_res_completed_order(${req.params.user_id});`;
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
      res.end("NO_COMPLETED_ORDERS");
    }
  });
  console.log(`Restaurant id get`);
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
  let sql = `UPDATE customer_orders SET order_status = '${req.body.order_status}' WHERE order_id = ${req.body.order_id};`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Database Error");
    }
    if (result) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end("STATUS_UPDATED");
    }
  });
});

router.post('/cancelorder', (req, res) => {
  let sql = `UPDATE customer_orders SET order_status = 'ORDER_CANCELLED' WHERE order_id = ${req.body.order_id};`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Database Error");
    }
    if (result) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end("ORDER_CANCELLED");
    }
  });
});

module.exports = router;