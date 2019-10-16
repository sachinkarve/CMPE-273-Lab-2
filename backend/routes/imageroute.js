const express = require('express')
const router = express.Router();
const multer = require('multer')
const fs = require('fs')
const pool = require('../pool')
const passwordHash = require('password-hash');
const path = require('path')

//upload
const storage = multer.diskStorage({
    destination: path.join(__dirname, '..') + '/public/uploads',
    filename: (req, file, cb) => {
        cb(null, 'user' + req.params.user_id + path.extname(file.originalname));
    }
  });
  
  const uploads = multer({
    storage: storage,
    limits: { fileSize: 500000 },
  }).single("image");
  
  router.post("/uploader/:user_id", (req, res) => {
    uploads(req, res, function (err) {
        if (!err) {
            return res.sendStatus(200).end();
        }
        else {
            console.log('Error!');
        }
    })
  });



  router.get('/uploader/:user_id', (req, res) => {

    var image = path.join(__dirname, '..') + '/public/uploads/user' + req.params.user_id;
    if (fs.existsSync(image + '.jpg')) {
        res.sendFile(image + '.jpg');
    }
    else if (fs.existsSync(image + '.png')) {
        res.sendFile(image + '.png');
    }
    else {
        res.sendFile(path.join(__dirname, '..')+'/public/uploads/crp.png')
    }
  });
  
  

  module.exports = router;