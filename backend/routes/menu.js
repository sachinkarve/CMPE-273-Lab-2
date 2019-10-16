
const express = require('express')
const router = express.Router();
const pool = require('../pool')
const passwordHash = require('password-hash');


router.get('/items/:user_id', (req, res) => {
    let sql = `CALL Fetch_menu_items(NULL, ${req.params.user_id});`;
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
    });
    console.log(`Get items`);
  });

router.get('/sections/:user_id', (req, res) => {
    let sql = `CALL Fetch_menu_sections(NULL, ${req.params.user_id});`;
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
    });
    console.log(`Get Sections`);
  });
  

  module.exports = router;