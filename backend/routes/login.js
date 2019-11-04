//done kafka
const express = require('express')
const router = express.Router();
const passwordHash = require('password-hash');
const config = require('../config');
var kafka = require('../kafka/client');

const passport = require('passport')
const jwt = require('jsonwebtoken')
require('../passport')(passport);
const userModel = require('../db_Schema/user');


// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/', function (req, res) {

  console.log(`****----Inside Login------******`);
  console.log(req.body);
  req.body.originalUrl = req.originalUrl;
  kafka.make_request('login', req.body, function (err, results) {
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
      if(results === "PASSWORD_INCORRECT"){
        console.log(`##############`);
        res.status(401).send('PASSWORD_INCORRECT_NO_USER_FOUND');
      }else{
        console.log(`$$$$$$$$$$$$$$`)
        res.status(200).send(results)
      }
    }
  });
});

module.exports = router;


// //latest
// router.post('/', (req, res) => {

//     let sql = `CALL Fetch_password('${req.body.email_id}');`;
//     console.log(sql);
//     pool.query(sql, (err, result) => {
//       if (err) {
        // res.writeHead(500, {
        //   'Content-Type': 'text/plain'
        // });
        // res.send("Error in Data");
//       }
//       if (result && result.length > 0 && result[0][0].status) {
//         if (passwordHash.verify(req.body.password, result[0][0].password)) {
//           res.cookie('cookie', result[0][0].user_id, { maxAge: 9000000, httpOnly: false, path: '/' });
//           req.session.user = req.body.email_id;
//           let userObject = { user_id: result[0][0].user_id, name: result[0][0].name, email_id: result[0][0].email_id, is_owner: result[0][0].is_owner };
//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           res.end(JSON.stringify(userObject));
//         }
//         else {
          // res.writeHead(401, {
          //   'Content-Type': 'text/plain'
          // });
          // res.end("Password Incorrect");
//         }
//       }
//       else {
        // res.writeHead(401, {
        //   'Content-Type': 'text/plain'
        // })
        // res.end("No user with this email id");
//       }
//     });
//     console.log(`Login end`);
//   });



