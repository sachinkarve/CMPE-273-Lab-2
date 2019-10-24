const express = require('express')
const router = express.Router();
const pool = require('../pool')
const passwordHash = require('password-hash');
const passport = require('passport')
const userModel = require('../db_Schema/user')
const ObjectID = require("mongodb").ObjectID;


router.get('/editsection/:editSectionName', (req, res) => {
  let sql = `SELECT menu_section_id, menu_section_name FROM menu_sections WHERE menu_section_name = '${req.params.editSectionName}'`;
  console.log(sql);
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("DB_ERROR");

    }
    if (result && result.length > 0) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(JSON.stringify(result[0]));

    } else {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("NO_SECTION_FOUND");
    }
  })
})


// router.get('/getallsections/:user_id', (req, res) => {

//   userModel.findById(req.params.user_id, (err, fetchedUser) => {
//     if (err) {
//       return res.status(500).send("Error in Data");
//     }

//     let allSections = fetchedUser.restaurant.menu_sections
//     console.log(allSections);
//     res.status(200).send(JSON.stringify(allSections))

//   });



  // let sql = `CALL Get_all_sections(NULL, ${req.params.user_id})`;
  // console.log(sql);
  // pool.query(sql, (err, result) => {
  //   if (err) {
  //     res.writeHead(500, {
  //       'Content-Type': 'text/plain'
  //     });
  //     res.end("DB_ERROR");

  //   }
  //   if (result && result.length > 0) {
  //     console.log(result);
  //     res.writeHead(200, {
  //       'Content-Type': 'text/plain'
  //     });
  //     res.end(JSON.stringify(result[0]));

  //   } else {
  //     console.log(`inside else in backend`);
  //     console.log(result);
  //     res.writeHead(500, {
  //       'Content-Type': 'text/plain'
  //     });
  //     res.end("NO_SECTION_FOUND");
  //   }
  // })
// });


router.post('/editsection', (req, res) => {
  console.log(`\n\n****---req.body----****`);
  console.log(req.body);
  userModel.findById(req.body.user_id, (err, fetchedUser) => {
    if (err) {
      res.status(500).send("ERROR")
    }
    else if (fetchedUser) {
      console.log(`****----fetchedUser-----****`);
      console.log(fetchedUser);
      let sectionObj = fetchedUser.restaurant.menu_sections.id(req.body.section_id)
      if (!sectionObj) {
        res.status(500).send("SECTION_DOES_NOT_EXISTS")
      } else {
        sectionObj.menu_section_name = req.body.dynamic_menu_section_name;
        fetchedUser.save((err, dbres) => {
          if (err) {
            console.log(`****----DB_ERROR-----****`);
            console.log(ERR);
            res.status(500).send("ERROR")
          } else {
            console.log(`****----DB_RES-----****`);
            console.log(dbres);
            res.status(200).send("SUCCESS")
          }
        })
      }
    }
  });
});


router.get("/:user_id", async (req, res) => {
  console.log(req.params);
  let owner = await userModel.findOne({
    _id: req.params.user_id
  });
  if (!owner) return res.status(400).send("User does not exist");
  console.log(owner);
  //console.log(owner.restaurant.menu_sections);
  return res.status(200).send(owner.restaurant.menu_sections);
});


//this shows the user profile
router.post('/addsection', passport.authenticate('jwt', { session: false }), (req, res) => {
  var flag = 0
  userModel.findById(req.body.user_id, (err, fetchedUser) => {
    if (err) {
      return res.status(500).send("Error in Data");
    }
    console.log(fetchedUser)
    fetchedUser.restaurant.menu_sections.map(sec => {
      if (sec.menu_section_name == req.body.sectionName) {
        flag = 1;
      }
    })
    if (!flag) {
      fetchedUser.restaurant.menu_sections.push({ menu_section_name: req.body.sectionName, restaurant_ref: fetchedUser.restaurant._id })
      fetchedUser.save((err, dbres) => {
        if (err) {
          console.log(err);
          console.log('SECTION_ADDITION_FAILED');
          res.status(200).send("SECTION_ADDITION_FAILED")
          return;
        }
        console.log(`SECTION_ADDED`);
        res.status(200).send("SECTION_ADDED")
        return;
      })
    } else {
      console.log(`SECTION_EXISTS`);
      res.status(200).send("SECTION_EXISTS")
    }
  })
});


//this shows the user profile
router.post('/deletesection', (req, res) => {
  console.log(`**--------body-------**`);
  console.log(req.body);

  userModel.findById(req.body.user_id, (err, fetchedUser) => {
    if (err) {
      res.status(500).send("ERROR")
    }
    else if (fetchedUser) {
      console.log(`**--------fetchedUser-------**`);
      console.log(fetchedUser);
      let section = fetchedUser.restaurant.menu_sections.id(req.body.menu_section_id)
      if (!section) {
        console.log(`**--------section not found-------**`);
        console.log(section);
        res.status(500).send("SECTION_DOES_NOT_EXISTS")
      } else {
        section.remove();
        fetchedUser.save((err, dbres) => {
          if (err) {
            console.log(`**--------err-------**`);
            console.log(err);
            res.status(500).send("ERROR")
          } else if (dbres) {
            console.log(`**--------dbres-------**`);
            console.log(dbres);
            res.status(200).send("SECTION_DELETED_SUCCESSFULLY")
          }
        });
      }
    }
  });


  //   const data = {
  //     menu_section_id: e.target.name,
  //     user_id: this.state.user_id
  // }

  // userModel.findById(req.body.user_id, (err, fetchedUser) => {
  //   if (err) {
  //     res.status(500).send("ERROR")
  //   }
  //   else if (fetchedUser) {
  //     console.log(fetchedUser);
  //     index = fetchedUser.restaurant.menu_sections.findIndex(sec => sec.menu_section_name === req.body.menu_section_name)
  //     console.log(index);
  //     if (index > -1) {
  //       console.log(`**--------inside if-------**`);
  //       fetchedUser.restaurant.menu_sections.splice(index, 1);
  //       fetchedUser.save((err, success) => {
  //         if (err) {
  //           console.log(`**--------error-------**`);
  //           res.status(500).send("ERROR")
  //         } else if (success) {
  //           console.log(`**--------success-------**`);
  //           res.status(200).send("SUCCESS")
  //         }
  //       })
  //     } else {
  //       console.log(`**--------SECTION_EXISTS-------**`);
  //       res.status(200).send("SECTION_DOES_NOT_EXISTS")

  //     }
  //   }
  //})

  //     userModel.findById(req.body.user_id, (err, fetchedUser) => {
  //     if(err){
  //       console.log(`**--------fetched usr err-------**`);
  //       console.log(err);
  //     }
  //     else{
  //       console.log(`**--------fetcheduser-------**`);
  //       console.log(fetchedUser);
  // //
  //       userModel.aggregate([
  //         {$match:{_id : ObjectID(req.body.user_id)}},
  //         {$project: {
  //           index:{
  //             $indexOfArray :["$restaurant.menu_sections.menu_section_name", req.body.menu_section_name]
  //           }
  //         }}
  //       ]).then(out=>{
  //         console.log(`**--------%%%%%%%%%%%%%%%%%%%%-------**`);
  //         console.log(out);
  //         console.log(fetchedUser.restaurant.menu_sections[out[0].index].menu_section_name);
  //         userModel.find({})
  //         userModel.update( { "_id": ObjectID("5da819fb953d530a60737e47") }, { $pull: { "restaurant.menu_sections":{menu_section_name: req.body.menu_section_name }} } )
  //         //userModel.save()
  //         // userModel.save((err,status)=>{
  //         //   if(err){
  //         //     console.log(`---save erro---`);
  //         //     console.log(err);
  //         //   }else{
  //         //     console.log(`---save status---`);
  //         //     console.log(status);
  //         //   }
  //         // })
  // console.log(`---after udpdate---`);

  //       }).catch(err=>{
  //         console.log(`**--------err-------**`);
  //         console.log(err);
  //       })
  // //



  //   }
  // });



  // userModel.aggregate([
  //   {$match:{_id : ObjectID(req.body.user_id)}},
  //   {$project: {
  //     index:{
  //       $indexOfArray :["$restaurant.menu_sections.menu_section_name", req.body.menu_section_name]
  //     }
  //   }}
  // ]).then(out=>{
  //   console.log(`**--------out-------**`);
  //   console.log(out);
  //   //fetchedUser.restaurant.update( { _id: 1 }, { $pop: { menu_sections: out.index } } )
  //   // fetchedUser.restaurant.menu_sections.pull({_id : '5da8f21e2018f92d1bc004e2'})

  //   // .then(upOut=>{
  //   //   console.log(`**--------upOut-------**`);
  //   //   console.log(upOut);
  //   // }).catch(err=>{
  //   //   console.log(`**--------upout_err-------**`);
  //   //   console.log(err);
  //   // })    
  // }).catch(err=>{
  //   console.log(`**--------err-------**`);
  //   console.log(err);
  // })






  // userModel.aggregate([
  //   {$match:{_id : ObjectID(req.body.user_id)}},
  //   {$project: {
  //     index:{
  //       $indexOfArray :["$restaurant.menu_sections.menu_section_name", req.body.menu_section_name]
  //     }
  //   }}
  // ]).then(out=>{
  //   console.log(`**--------out-------**`);
  //   console.log(out);
  //   x.restaurant.update( { _id: 1 }, { $pop: { menu_sections: out.index } } )
  //   .then(upOut=>{
  //     console.log(`**--------upOut-------**`);

  //     console.log(upOut);
  //   }).catch(err=>{
  //     console.log(`**--------upout_err-------**`);

  //     console.log(err);
  //   })

  //   //fetchedUser.restaurant.menu_sections.pull({_id : '5da8f21e2018f92d1bc004e2'})


  // }).catch(err=>{
  //   console.log(`**--------err-------**`);

  //   console.log(err);
  // })

  // userModel.findOne({_id:req.body.user_id,
  // "restaunrant.menu_sections":{
  //   $elematch:{menu_section_name: req.body.menu_section_name }
  // }}).then(section_i)

  // userModel.findById(req.body.user_id, (err, fetchedUser) => {
  //   console.log(`insde mongo q`);
  //   if (err) {
  //     console.log(`**-------error1--------**`);
  //     console.log(err);
  //     return res.status(500).send("Error in Data");
  //   } else {
  //     console.log(`**-------fetchedUser--------**`);
  //     console.log(fetchedUser);
  //     //fetchedUser.restaurant.menu_sections.pull({_id : '5da8f21e2018f92d1bc004e2'})
  //     console.log(`**------req.body.sectionName---------**`);
  //     console.log(req.body.menu_section_name);

  //     //fetchedUser.restaurant.update({},{$pull:{ menu_sections:{menu_section_name: req.body.menu_section_name} }})

  //     fetchedUser.restaurant.menu_sections.pull($elematch:{{ menu_section_name: req.body.menu_section_name }})
  //     //fetchedUser.restaurant.menu_sections.remove({'menu_section_name': req.body.sectionName})
  //     console.log(`**-------after delete--------**`);
  //     console.log(fetchedUser.restaurant.menu_sections);

  //     fetchedUser.save((err, doc) => {
  //       if (err) {
  //         console.log(`**--------err2-------**`);
  //         res.status(500).send("Error in Data");
  //       } else {
  //         console.log(`**--------doc-------**`);
  //         console.log(doc);
  //         res.status(200).send("successful")
  //       }
  //     })
  //   }
  //})
  // let sql = `CALL delete_section('${req.body.menu_section_name}')`;
  // console.log(sql);
  // pool.query(sql, (err, result) => {
  //   if (err) {
  //     res.writeHead(500, {
  //       'Content-Type': 'text/plain'
  //     });
  //     res.end("Error in Data");
  //   }
  //   if (result && result.length > 0 && result[0][0]) {
  //     res.writeHead(200, {
  //       'Content-Type': 'text/plain'
  //     });
  //     res.end(JSON.stringify(result[0]));
  //   }
  // });
});

module.exports = router;