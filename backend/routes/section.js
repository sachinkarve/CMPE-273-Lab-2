const express = require('express')
const router = express.Router();
const pool = require('../pool')
const passwordHash = require('password-hash');






router.get('/editsection/:editSectionName',(req,res)=>{
  let sql = `SELECT menu_section_id, menu_section_name FROM menu_sections WHERE menu_section_name = '${req.params.editSectionName}'`;
console.log(sql);
  pool.query(sql, (err,result)=>{
    if(err){
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("DB_ERROR");

    }
    if(result && result.length>0){
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(JSON.stringify(result[0]));

    }else{
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("NO_SECTION_FOUND");
    }
  })
})


router.get('/getallsections/:user_id',(req,res)=>{
  let sql = `CALL Get_all_sections(NULL, ${req.params.user_id})`;
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
      res.end("NO_SECTION_FOUND");
    }
  })
})




router.post('/editsection',(req,res)=>{
  let sql = `UPDATE menu_sections SET  menu_section_name ='${req.body.dynamic_menu_section_name}' WHERE menu_section_id = ${req.body.dynamic_menu_section_id}`;
  console.log(sql);
  pool.query(sql, (err,result)=>{
    if(err){
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("DB_ERROR");

    }
    if(result){
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end("UPDATE_SUCCESSFUL");

    }
  })
})







//this shows the user profile
router.post('/addsection', (req, res) => {
    let sql = `CALL Insert_section('${req.body.sectionName}','${req.body.user_id}')`;
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
  });


//this shows the user profile
router.post('/deletesection', (req, res) => {
  console.log(req.body.menu_section_name);
  let sql = `CALL delete_section('${req.body.menu_section_name}')`;
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
});

module.exports = router;