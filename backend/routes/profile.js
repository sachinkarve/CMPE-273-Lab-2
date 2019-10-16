const express = require('express')
const router = express.Router();
const pool = require('../pool')
const passwordHash = require('password-hash');


//this shows the user profile
router.post('/userget', (req, res) => {
    let sql = `CALL Fetch_customer('${req.body.user_id}', NULL);`;
    pool.query(sql, (err, result) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end("Error in Data");
      }
      if (result && result.length > 0 && result[0][0]) {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end(JSON.stringify(result[0]));
      }
    });
    console.log(`Fetch Customer`);
  });
  


//
router.post('/restaurantupdate', (req, res) => {
    if(req.body.password === ""){
      var hashedPassword = "NULL";
    }
    else{
      var hashedPassword = "'" + passwordHash.generate(req.body.password) +"'";
    }
    let sql = `CALL Update_Restaurant_Owner(NULL, '${req.body.email_id}', '${req.body.name}', '${req.body.res_name}', '${req.body.res_cuisine}', ${hashedPassword}, '${req.body.res_zip_code}', '${req.body.address}', '${req.body.phone_number}');`;
    console.log(sql);
    
    console.log(req.body);
    pool.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end("Error in Data");
      }
      if (result && result.length > 0 && result[0][0].status === 'RESTAURANT_UPDATED') {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end("Restaurant Updated");
      }
      else if(result && result.length > 0 && result[0][0].status === 'NO_RECORD'){
        res.writeHead(401, {
          'Content-Type': 'text/plain'
        });
        res.end("No Record Found");
      }
    });
    console.log(`Update restaurant`);
  });

  


  //
router.post('/customerupdate', (req, res) => {
    if(req.body.password === ""){
      var hashedPassword = "NULL";
    }
    else{
      var hashedPassword = "'" + passwordHash.generate(req.body.password) +"'";
    }
    let sql = `CALL Update_customer_profile('${req.body.user_id}', '${req.body.email_id}', '${req.body.name}', ${hashedPassword}, '${req.body.address}', '${req.body.phone_number}' );`;
    pool.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end("Error in Data");
      }
      if (result && result.length > 0 && result[0][0].status === 'CUSTOMER_UPDATED') {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end("Customer updated");
      }
      else if(result && result.length > 0 && result[0][0].status === 'NO_RECORD'){
        res.writeHead(401, {
          'Content-Type': 'text/plain'
        });
        res.end("No Record Found");
      }
    });
    console.log(`Customer update`);
  });

  


  router.post('/restaurantget', (req, res) => {
    let sql = `CALL Fetch_Restaurant_Owner('${req.body.user_id}', NULL, NULL);`;
  
    pool.query(sql, (err, result) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end("Error in Data");
      }
      if (result && result.length > 0 && result[0][0]) {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end(JSON.stringify(result[0]));
      }
    });
    console.log(`Restaurant get`);
  });
  

module.exports = router;