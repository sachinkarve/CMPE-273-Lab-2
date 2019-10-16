const mysql = require('mysql');
const Port = process.env.PORT || 3306

var pool = mysql.createPool({
  connectionLimit : 100,
  host: 'localhost',
  user: 'root',
  port: Port,
  password: 'sachin123',
  database: 'grubhub'
});

pool.getConnection((err) => {
  if (err) {
    //throw `clg: something went wrong in db connection::=> ${err}`
  }
  console.log(`MySql DB Connected`);
});




module.exports = pool;
