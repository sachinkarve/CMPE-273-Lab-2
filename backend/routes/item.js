const express = require('express')
const router = express.Router();
const pool = require('../pool')
const passwordHash = require('password-hash');



//this shows the user profile
router.post('/additem', (req, res) => {
  let sql = `CALL Insert_item('${req.body.itemName}','${req.body.itemDescription}',${req.body.itemPrice},'${req.body.menu_section_name}', ${req.body.user_id})`;
  console.log(sql);
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      console.log(err);
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0]) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(JSON.stringify(result[0]));
    }
  });
  console.log(`Item Added`);
});



router.get('/getallitems/:user_id',(req,res)=>{
  let sql = `CALL Get_all_items(NULL, ${req.params.user_id})`;
  console.log(sql);
  pool.query(sql, (err,result)=>{
    if(err){
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("DB_ERROR");

    }
    if(result && result.length>0){
      console.log(result);
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(JSON.stringify(result[0]));

    }else{
      console.log(`inside else in backend`);
      console.log(result);
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("NO_ITEM_FOUND");
    }
  })
});





router.post('/update', (req, res) => {

  let sql = `UPDATE menu_items SET item_name = '${req.body.newItemName}', item_description= '${req.body.newItemDescription}',item_price = 
  ${req.body.newItemPrice} WHERE item_id = ${req.body.item_id}`;
  console.log(sql);
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      console.log(err);
      res.end("SOMETHING_WENT_WRONG");
    }
    if (result) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end("UPDATE_SUCCESSFULL");
    }

  });
  console.log(`Update Successful`);
});













//this shows the user profile
router.get('/itemfeed/:user_id', (req, res) => {
  let sql = `SELECT ('${req.body.itemName}','${req.body.itemDescription}',${req.body.itemPrice},'${req.body.menu_section_name}', ${req.body.user_id})`;
  console.log(sql);
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      console.log(err);
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0]) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});


router.get('/edititem/:item_name', (req, res) => {

  let sql = `SELECT item_id, item_name, item_description, item_price from menu_items where "${req.params.item_name}"=item_name`;
  console.log(sql);
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      console.log(err);
      res.end("Error in Data");
    }
    if (result && result.length > 0) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      let data = {
        item_id: result[0].item_id,
        item_name: result[0].item_name,
        item_description: result[0].item_description,
        item_price: result[0].item_price
      }
      res.end(JSON.stringify(data));
    }
    else {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end("NO_ROW_RETURNED");

    }
  });
  console.log(`Item edited`);
});







//this shows the user profile
router.post('/deleteitem', (req, res) => {
  console.log(req.body);
  let sql = `CALL delete_item('${req.body.item_name}')`;
  console.log(sql);
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
  console.log(`Item deleted`);
});


module.exports = router;