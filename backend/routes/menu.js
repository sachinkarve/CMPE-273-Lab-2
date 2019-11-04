
const express = require('express')
const router = express.Router();
const pool = require('../pool')
const passwordHash = require('password-hash');
const userModel = require('../db_Schema/user')
var kafka = require('../kafka/client');


router.get("/sections/:user_id", (req, res) => {
console.log(`!!!!!!!!!!!!!`);
console.log(req.params);
  let params ={
    user_id : req.params.user_id
  }


  kafka.make_request('menu', params, function (err, results) {
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
      res.status(200).send(results)
    }
  });







  // console.log(req.params);
  // console.log(`hi`);
  // let owner = userModel.findById(req.params.user_id, (err, owner) => {
  //   if (err) {
  //     return res.status(400).send("SOMETHING_WENT_WRONG");
  //   }
  //   if (!owner) return res.status(400).send("User does not exist");
  //   else {
  //     return res.status(200).send(owner.restaurant.menu_sections);
  //   }
  // });
});


module.exports = router;