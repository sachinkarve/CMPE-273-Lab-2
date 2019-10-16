const express = require('express')
const router = express.Router();
const pool = require('../pool')
const passwordHash = require('password-hash');
const config = require('../config');

const user = require('../db_Schema/user');

//All passport and jwt shit below
//all below for Jwt passport


//from 
router.post('/customer', function (req, res) {
  if (!req.body) {
    res.writeHead(401, {
      'Content-Type': 'text/plain'
    })
    res.end("Error in Data")
  } 
  else {

    var hashedPassword = passwordHash.generate(req.body.password);
    var newUser = new user({
      name: req.body.name,
      email: req.body.email_id,
      password: hashedPassword,
      address : req.body.address,
      phone_number : req.body.phone_number,
      is_owner : 0
    });
    // Attempt to save the user
    newUser.save(err => {
      if (err) {
        res.writeHead(401, {
          'Content-Type': 'text/plain'
        })
        res.end("User already exists")
        return ;
      }
      else{
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.end("User added");
      }
    });
  }
});


// Protect dashboard route with JWT
// router.get('/dashboard', passport.authenticate('jwt', { session: false }), function (req, res) {
//   res.send('It worked! User id is: ' + req.user._id + '.');
// });



router.post('/owner', (req, res) => {
  var hashedPassword = passwordHash.generate(req.body.password);
  let sql = `CALL Insert_Restaurant_Owner('${req.body.name}', '${req.body.res_name}', '${req.body.res_cuisine}', '${req.body.email_id}', '${hashedPassword}', '${req.body.res_zip_code}', '${req.body.address}', '${req.body.phone_number}');`;
  console.log(sql)
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0].status === 'USER_ADDED') {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end("User added");
    }
    else if (result && result.length > 0 && result[0][0].status === 'USER_EXISTS') {
      res.writeHead(401, {
        'Content-Type': 'text/plain'
      });
      res.end("User already exists");
    }
  });
});



module.exports = router;


//old mysql
//latest
// router.post('/customer', (req, res) => {
//   var hashedPassword = passwordHash.generate(req.body.password);
//   console.log(req.body);
//   let sql = `CALL Insert_customer('${req.body.name}', '${req.body.email_id}', '${hashedPassword}', '${req.body.address}', '${req.body.phone_number}');`;
//   console.log(sql);
//   pool.query(sql, (err, result) => {
//     if (err) {
//       res.writeHead(401, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Error in Data");
//     }
//     if (result && result.length > 0 && result[0][0].status === 'USER_ADDED') {
//       res.writeHead(200, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("User added");
//     }
//     else if (result && result.length > 0 && result[0][0].status === 'USER_EXISTS') {
//       res.writeHead(401, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("User already exists")
//     }
//   });
// });
