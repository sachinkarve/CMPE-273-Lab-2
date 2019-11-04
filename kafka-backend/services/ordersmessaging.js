const userModel = require('../db_Schema/user')
const orderModel = require('../db_Schema/orders')

function handle_request(msg, callback) {

    res = {}
    if (msg.originalUrl === '/messaging/send') {

        console.log(`\n\n****---msg----****`);
        console.log(msg);
        orderModel.findById(msg.order_id, (err, fetchedOrder) => {
            if (err) {
                callback(err,"ERROR")
            }
            else if (fetchedOrder) {
                console.log(`****----fetchedOrder-----****`);
                console.log(fetchedOrder);
                message = {
                    order_id: msg.order_id,
                    sender_name: msg.sender_name,
                    receiver_name: msg.receiver_name,
                    messageText: msg.messageText
                }
                fetchedOrder.messages.push(message);
                fetchedOrder.save((err, dbres) => {
                    if (err) {
                        console.log(err);
                        callback(err, "SOMETHING_WENT_WRONG")
                    }
                    else if (dbres) {
                        console.log(`****----dbres-----****`);
                        console.log(dbres);
                        callback(null,dbres)
                    }
                })
            }
        });

    } else {

        console.log(`\n\n****---req.params----****`);
        //console.log(msg);
        orderModel.findById(msg.order_id, (err, fetchedOrder) => {
            if (err) {
                callback(err,"SOMETHING_WENT_WRONG")
            }
            else if (fetchedOrder) {
                console.log(`****----fetchedOrder-----****`);
               // console.log(fetchedOrder);
                callback(null,fetchedOrder.messages)
            }

        })


    }


}
exports.handle_request = handle_request;