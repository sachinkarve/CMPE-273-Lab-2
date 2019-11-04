const express = require('express')
const router = express.Router();
const pool = require('../pool');
const passwordHash = require('password-hash');


// new
// router.get('/restaurantsearch', (req, res) => {

//     let sql = `CALL Fetch_Search_Results('${req.body.search_input}');`;
//     pool.query(sql, (err, result) => {
//       if (err) {
//         res.writeHead(500, {
//           'Content-Type': 'text/plain'
//         });
//         res.end("Error in Data");
//       }
//       if (result && result.length > 0 && result[0][0]) {
//         res.writeHead(200, {
//           'Content-Type': 'text/plain'
//         });
//         res.end(JSON.stringify(result[0]));
//       }
//     });
//   });
  //doesnt apply for lab 2

module.exports = router;