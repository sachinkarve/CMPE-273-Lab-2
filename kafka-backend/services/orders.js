const userModel = require('../db_Schema/user')
const orderModel = require('../db_Schema/orders')


function handle_request(msg, callback) {

    res = {}
    if (msg.originalUrl === 'pendingorders') {

        console.log(`*****-----HHHHH----*******`);
        console.log(msg.user_id);
        orderModel.find({ "customer.customer_id": msg.user_id, "order_status": "ORDER_PLACED" }, (err, order) => {
            if (err) {
                callback(null, "NO_PENDING_ORDERS");
            } else if (order) {

                callback(null, order)
            }
        });


    } else if (msg.originalUrl === 'completedorders') {

        console.log(`*****----FFFF-----*******`);
        console.log(msg.user_id);
        // , "order_status": "ORDER_CANCELED" || "ORDER_COMPLETED"
        orderModel.find({ "customer.customer_id": msg.user_id, "order_status": {$ne : "PLACED"} }, (err, order) => {
            if (err) {
                callback(err, "NO_PAST_ORDERS");
            } else if (order) {
                console.log(order);
                callback(null, order)
            }
        });


    } else if (msg.originalUrl === 'pendingorders/restaurant') {

        console.log(msg.user_id);
        orderModel.find({ "restaurant.owner_user_id": msg.user_id, "order_status": "ORDER_PLACED" }, (err, order) => {
            if (err) {
                callback(err, "NO_PAST_ORDERS");
            } else if (order) {
                console.log(order);
                callback(null, order)
            }
        });

    } else if (msg.originalUrl === 'completedorders/restaurant') {

        console.log(`*****-----COMPLETED----*******`);
        console.log(msg.user_id);
        // , "order_status": "ORDER_CANCELED" || "DELIVERED"
        orderModel.find({ "restaurant.owner_user_id": msg.user_id}, (err, order) => {
            if (err) {
                callback(err, "NO_PAST_ORDERS");
            } else if (order) {
                console.log(order);
                callback(null, order)
            }
        });

    } else if (msg.originalUrl === '/orders/orderstatus') {

        console.log(`*****-----ORDER_STATUS----*******`);
        console.log(msg);
        orderModel.findById(msg.order_id, (err, order) => {
            if (err) {
                console.log(err);
                callback(err, "NO_ORDERS");
            } else if (order) {
                console.log(`****----order----****`);
                console.log(order);
                console.log(`***-----msg.order_status---****`);
                console.log(msg.order_status);
                order.order_status = msg.order_status;
                order.save((err, saveres => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(saveres);
                        console.log(`STATUS_CHANGED`);
                        callback(null, order)
                    }
                }));
            }
        });

    } else if (msg.originalUrl === '/orders/cancelorder') {

        console.log(`*****-----ORDER_ID----*******`);
        console.log(msg);
        orderModel.findById(msg.order_id, (err, order) => {
          if (err) {
            console.log(err);
            callback(err,"NO_ORDERS");
          } else if (order) {
            console.log(`****----order----****`);
            console.log(order);
            order.order_status = "ORDER_CANCELLED"
            order.save((err, saveres => {
              if (err) {
                console.log(err);
              } else {
                console.log(saveres);
                console.log(`ORDER_CANCELLED`);
                callback(null,'ORDER_CANCELLED')
      
              }
            }));
          }
        });

    }


}
exports.handle_request = handle_request;