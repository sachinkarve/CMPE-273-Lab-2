const orderModel = require('../db_Schema/orders')
const userModel = require('../db_Schema/user')


function handle_request(msg, callback) {
    res = {}

    if (msg.originalUrl === '/profile/restaurantupdate') {
        console.log(`********inside restaurant update**********`);
        var hashedPassword;
        if (msg.password && msg.password !== "") {
            var hashedPassword = passwordHash.generate(msg.password);
        }
        console.log(`hashedpasswordvalue`);
        console.log(hashedPassword);
        userModel.findById(msg.user_id, (err, user) => {
            if (err) {
                callback(err, "User_not_Found_which_is_never_gonna_happen")
            }
            else {
                userModel.findOneAndUpdate({ _id: msg.user_id }, {
                    $set: {
                        email: msg.email_id,
                        name: msg.name,
                        password: hashedPassword || user.password,
                        address: msg.address,
                        phone_number: msg.phone_number,
                        restaurant: {
                            res_cuisine: msg.res_cuisine,
                            res_zip_code: msg.res_zip_code,
                            res_name: msg.res_name
                        }
                    }
                },
                    { new: true },
                    (err, updateResponse) => {
                        if (err) {
                            callback(err, "Error in Data")
                            return;
                        } else {
                            callback(null, 'RESTAURANT_UPDATED')
                        }
                    });
            }
        })




    } else if (msg.originalUrl === '/profile/customerupdate') {


        console.log(`password in request:: ${msg.password}`);
        var hashedPassword;
        if (msg.password && msg.password !== "") {
            hashedPassword = passwordHash.generate(msg.password);
        }
        console.log(`hashedPassword::::`);
        console.log(hashedPassword);

        userModel.findOne({ _id: msg.user_id }, (err, user) => {
            if (err) {
                throw err
            } else {
                console.log(user.password);
                userModel.findOneAndUpdate({ _id: msg.user_id }, {
                    $set: {
                        name: msg.name,
                        password: hashedPassword || user.password,
                        address: msg.address,
                        phone_number: msg.phone_number
                    }
                }, { new: true },
                    (err, userData) => {
                        if (err) {
                            callback(err, 'Error in Data');
                        }
                        else {
                            callback(null, 'CUSTOMER_UPDATED')
                        }
                    })

            }
        })

    } else if (msg.originalUrl === '/profile/userget') {
        userModel.findById(msg.user_id, (err, user) => {
            if (err) {
                callback(err,'NOT_FETCHED')
            } else {
                callback(null,user)
            }
        })

    } else if (msg.originalUrl === '/profile/restaurantget') {

        userModel.findOne({ _id: msg.user_id }, (err, user) => {
            if (err) {
              callback(err,'NOT_FETCHED')
              return;s
            } else {
              console.log(user);
              callback(null,user)
            }
          })
        
    }
}
exports.handle_request = handle_request;