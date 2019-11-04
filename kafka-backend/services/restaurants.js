//var bcrypt = require('bcrypt');
const userModel = require('../db_Schema/user')
const _ = require('lodash');
const orderModel = require('../db_Schema/orders')

function handle_request(msg, callback) {

    var res = {};

    console.log(msg.originalUrl);
    if (msg.originalUrl === '/restaurant/placeorder') {//switch functionality

        console.log(`******----placeorder------******`);
        console.log(msg);

        userModel.findById(msg.user_id, (err, user) => {

            if (err) return callback(err, "User does not exist");
            console.log("------------user-------------");
            console.log(user);
            const customer = _.pick(user, [
                "_id",
                "name",
                "email",
                "address",
                "phone_number"
            ]);
            console.log("------------customer-------------");
            console.log(customer);


            userModel.findOne({"restaurant._id" : msg.res_id}, (err, rest) => {

                if (err) return callback(err, "Restaurant does not exist");
                console.log("------------rest-------------");
                console.log(rest);
                let restaurant = _.pick(rest.restaurant, [
                    "_id",
                    "user_ref",
                    "res_name",
                    "res_cuisine",
                    "res_zip_code",
                ]);

                console.log("------------restaurant-------------");
                console.log(restaurant);

                let items = {
                    itemName: msg.cart_items[0].item_name,
                    itemPrice: msg.cart_items[0].item_price,
                    item_quantity: msg.cart_items[0].item_quantity,
                }

                let order = new orderModel({
                    order_status: msg.order_status,
                    total: msg.total,
                    order_items: items
                }
                );
                console.log("-----order a -------");
                console.log(order);
                order.order_date = new Date(Date.now()).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                });
                order.customer = {
                    customer_id: customer._id,
                    customer_name: customer.name
                };
                order.restaurant = {

                    res_id: restaurant._id,
                    owner_user_id: restaurant.user_ref,
                    res_name: restaurant.res_name,

                };
                console.log("-----order b -------");
                console.log(order);

                order.save((err, place_order) => {

                    if (err) {
                        callback(err, "Some thing went wrong");
                    } else {
                        callback(null, "ORDER_PLACED");
                    }


                });




            });



        });


    }

    else {

        let searchinput = msg.search_input.toLowerCase();
        userModel.find({ is_owner: true }, (err, owners) => {

            console.log(`***--owners---***`);
            console.log(owners);

            if (!owners) callback(err, "NOTHING_WORKED");

            let restaurants = owners.map(owner => owner.restaurant);
            console.log(`going till herer`);
            let searchresults = [];
            if (msg.search_input === "_") {
                searchresults = restaurants;
            } else {
                console.log(restaurants);
                console.log(`***--restaurants---****`);
                console.log(restaurants);
                console.log(`going till restaurants`);
                restaurants.map(restaurant => {
                    if (
                        restaurant.res_name.toLowerCase().includes(searchinput) &&
                        !searchresults.includes(restaurant)
                    )
                        searchresults.push(restaurant);
                    console.log(`***--searchresults---****`);
                    console.log(searchresults);
                    restaurant.menu_sections.map(menu_section => {
                        menu_section.menu_item.map(item => {
                            if (
                                (item.itemName.toLowerCase().includes(searchinput) ||
                                    item.itemDescription.toLowerCase().includes(searchinput)) &&
                                !searchresults.includes(restaurant)
                            )
                                searchresults.push(restaurant);
                        });
                    });
                });
            }
            if (searchresults.length > 0) callback(null, searchresults);

            callback(err, "NOTHING_WORKED");

        });

    }


};


exports.handle_request = handle_request;