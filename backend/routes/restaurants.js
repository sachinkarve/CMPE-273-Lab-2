const express = require('express')
const router = express.Router();
const pool = require('../pool')
const passport = require('passport')

router.get('/searchrestaurant/:input',passport.authenticate('jwt', { session: false }), (req, res) => {
    let sql = `CALL Fetch_Search_Results('${req.params.input}');`;
    console.log(sql);
    pool.query(sql, (err, response) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end("ERROR_IN_DATA");
      }
      if (response && response.length > 0 && response[0][0]) {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end(JSON.stringify(response[0]));
      }
    });
  });




  router.get('/:res_id', (req, res) => {

    let sql = `CALL Fetch_restaurant_owner(NULL, NULL, ${req.params.res_id});`;
    console.log(sql);
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
        res.end(JSON.stringify(result[0][0]));
      }
    });
  });



  router.post('/placeorder', (req, res) => {
    let sql = `CALL Insert_orders(${req.body.user_id}, ${req.body.res_id}, '${req.body.order_status}', ${req.body.total});`;
    console.log(sql);
    pool.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end("Database Error");
      }
      if (result && result.length > 0 && result[0][0].status === 'ORDER_PLACED') {
        req.body.cart_items.forEach(cart_item => {
          let sqlItem = `CALL Insert_orders_items(${result[0][0].order_id}, ${cart_item.item_id}, ${cart_item.item_quantity});`;
          pool.query(sqlItem, (err, result) => {
            if (err) {
              console.log(err);
              res.writeHead(500, {
                'Content-Type': 'text/plain'
              });
              res.end("Database Error");
            }
          });
        });
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end(JSON.stringify(result[0][0]));
      }
      else {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end(result[0][0]);
      }
    });
  });


  module.exports = router;