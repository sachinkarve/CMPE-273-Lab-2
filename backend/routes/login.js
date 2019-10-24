const express = require('express')
const router = express.Router();
const passwordHash = require('password-hash');
const config = require('../config');

const passport = require('passport')
const jwt = require('jsonwebtoken')
require('../passport')(passport);
const userModel = require('../db_Schema/user');


// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/', function (req, res) {
  userModel.findOne({
    email: req.body.email_id
  }, function (err, user) {
    if (err) {
      res.status(500).send("Error in Data")
      return;
    }
    if (!user) {
      res.status(400).send("No user with this email id")
      return;

    } else {

      if (passwordHash.verify(req.body.password, user.password)) {
        // Create token if the password matched and no error was thrown
        console.log(user);

        const { _id , name, email, is_owner } = user;
        const payload = {_id,  name, email, is_owner }

        var token = jwt.sign(payload, config.secret, {
          expiresIn: 1008000 // in seconds
        });
        res.json({ success: true, token: 'JWT ' + token });
      } else {
        res.status(401).send("Password Incorrect")
        return;
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



