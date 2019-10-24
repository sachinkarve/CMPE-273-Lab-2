const express = require('express')
const router = express.Router();
const pool = require('../pool')
const passwordHash = require('password-hash');
const userModel = require('../db_Schema/user')



//this shows the user profile
router.post('/additem', (req, res) => {
  console.log(`*****----req.body-----****`);
  console.log(req.body);
let itemObject = {
  itemName: req.body.itemName,
  itemDescription: req.body.itemDescription,
  itemPrice: req.body.itemPrice,
  sec_ref: req.body.menu_section_id,
}
  userModel.findById(req.body.user_id, (err, fetchedUser) => {
    if (err) {
      return res.status(500).send("ITEM_ADDITION_FAILED");
    } else if (fetchedUser) {
      console.log(`*****----fetcheduser-----****`); console.log(fetchedUser);
      let section = fetchedUser.restaurant.menu_sections.id(req.body.menu_section_id);
      if (!section) {
        res.status(500).send("SECTION_NOT_FOUND");
      } else {
        let itemFlag;
        section.menu_item.map(item => {
          if (item.itemName === req.body.itemName) {
            itemFlag = true;
          }
        })
        if (!itemFlag) {
          console.log(`*****----section-----****`); console.log(section);
          section.menu_item.push(itemObject);
          fetchedUser.save((err, dbres) => {
            if (err) {
              res.status(500).send("ITEM_ADDITION_FAILED");
            } else {
              console.log(`*****-----dbres----****`);
              console.log(dbres);
              res.status(200).send("ITEM_ADDED")
            }
          })
        }
        else {
          res.status(200).send("ITEM_EXISTS");
        }
      }
    }
  });
});


router.get('/getallitems/:user_id', (req, res) => {
  



});



router.post('/update', (req, res) => {
console.log(`***---Request Body-----***`);
console.log(req.body);
  userModel.findById(req.body.user_id, (err, fetchedUser) => {
    if (err) {
      return res.status(200).send("SOMETHING_WENT_WRONG");
    } else if (fetchedUser) {
        section = fetchedUser.restaurant.menu_sections.id(req.body.sec_id);
        if(!section){
          res.status(500).send("SECTION_NOT_FOUND");
        }else{
          let itemExists =section.menu_item.filter(item=>{
            item.itemName === req.body.newItemName
          })
          if(!itemExists){

            item = section.menu_item.id(req.body.item_id)
            if(item){
              item.itemName = req.body.newItemName;
              item.itemDescription = req.body.newItemDescription;
              item.itemPrice = req.body.newItemPrice;
  
              fetchedUser.save((err,dbres)=>{
                if(err){
                  console.log('SOMETHING_WENT_WRONG');
                  res.status(200).send('SOMETHING_WENT_WRONG')
                }else{
                  console.log('UPDATE_SUCCESSFULL');
                  res.status(200).send('UPDATE_SUCCESSFULL')
                }
              })
            }
          }else{
            res.status(200).send('ITEM_EXISTS')
          }
        }
      }
    });
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

  userModel.findById(req.body.user_id, (err, fetchedUser) => {
    if (err) {
      return res.status(200).send("SOMETHING_WENT_WRONG");
    } else if (fetchedUser) {
        section = fetchedUser.restaurant.menu_sections.id(req.body.sec_id);
        console.log(`**---section----**`);
        console.log(section);
        item = section.menu_item.id(req.body.item_id);
        console.log(`**---item----**`);
        console.log(item);
        item.remove();
        fetchedUser.save((err,dbres)=>{
          if (err) {
            console.log(err);
            console.log("DELETION_FAILED");
            res.status(200).send('DELETION_FAILED')

          } else {
            console.log(`***-------item_added-------***`)
            res.status(200).send("ITEM_DELETED_SUCCESSFULLY")
            console.log("ITEM_DELETED");
          }
        })







      // index = fetchedUser.restaurant.menu_sections.findIndex(sec => sec.menu_section_name === req.body.menu_section_name)
      // if (index > -1) {
      //   exists = fetchedUser.restaurant.menu_sections[index].menu_item.findIndex(item => item.itemName === req.body.itemName)
      //   console.log(`----exists----`);
      //   console.log(exists);
      //   if (exists < 0) {
      //     console.log(`***-------item doesnt exists, can be added-------***`);
      //     console.log(exists);
      //     fetchedUser.restaurant.menu_sections[index].menu_item.push(newItem);
      //     console.log(fetchedUser.restaurant.menu_sections);
      //     fetchedUser.save((err, status) => {
      //       if (err) {
      //         console.log((`***------errrrorororororo____***`));
      //         console.log(err);
      //         res.status(500)

      //       } else {
      //         console.log(`***-------item_added-------***`)
      //         res.status(200).send("ITEM_ADDED")
      //       }
      //     })
      //   } else {
      //     console.log(`***-------item_exists-------***`);
      //     res.status(200).send("ITEM_EXISTS")
      //   }
      // } else {
      //   console.log(`***-------SECTION_DOES_NOT_EXIST-------***`);

      //   res.status(200).send("SECTION_DOES_NOT_EXIST")
      // }
    }



  });
});

module.exports = router;