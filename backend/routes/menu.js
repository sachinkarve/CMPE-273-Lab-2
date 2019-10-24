
const express = require('express')
const router = express.Router();
const pool = require('../pool')
const passwordHash = require('password-hash');
const userModel = require('../db_Schema/user')


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

  router.get("/sections/:user_id", async (req, res) => {
    console.log(req.params);
    console.log(`hi`);
    let owner = await userModel.findOne({
      _id: req.params.user_id
    });
    if (!owner) return res.status(400).send("User does not exist");
    console.log(owner);
    //console.log(owner.restaurant.menu_sections);
    return res.status(200).send(owner.restaurant.menu_sections);
  });
  

  module.exports = router;