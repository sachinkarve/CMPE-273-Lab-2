const userModel = require('../db_Schema/user');
const passwordHash = require('password-hash');



function handle_request(msg, callback) {

    res = {}

    if (msg.originalUrl === '/signup/customer') {


        if (!msg) {
            callback(err,"Error in Data");
          }
          else {
        
            var hashedPassword = passwordHash.generate(msg.password);
            var newUser = new userModel({
              name: msg.name,
              email: msg.email_id,
              password: hashedPassword,
              address: msg.address,
              phone_number: msg.phone_number,
              is_owner: 0
            });
            // Attempt to save the user
            newUser.save(err => {
              if (err && err.code===11000) {
                callback(err,"User already exists");
              }
              else {
                callback(null,"User added");
              }
            });
          }




    }else if (msg.originalUrl === '/signup/owner') {



        var hashedPassword = passwordHash.generate(msg.password);
        var newOwner = new userModel({
          name: msg.name,
          email: msg.email_id,
          password: hashedPassword,
          address: msg.address,
          phone_number: msg.phone_number,
          is_owner: true   
        });
      
        var newRes={
          res_name: msg.res_name,
          res_cuisine: msg.res_cuisine,
          res_zip_code: msg.res_zip_code,
          user_address : msg.address,
          user_ref : newOwner._id
        }
      
        newOwner.restaurant = newRes
      
        if (!msg) {
          callback(err,"Error in Data");
        }
      
        newOwner.save(err => {
          if (err && err.code===11000) 
            {
                callback(err,"User already exists");
            }
          else 
          callback(null,"User added");
        })
      




    }

}
exports.handle_request = handle_request;