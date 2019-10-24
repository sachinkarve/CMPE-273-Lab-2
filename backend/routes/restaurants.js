const express = require('express')
const router = express.Router();
const pool = require('../pool')
const passport = require('passport')
const userModel = require('../db_Schema/user')
const orderModel = require('../db_Schema/orders')

const _ = require('lodash');

router.get('/searchrestaurant/:search_input', passport.authenticate('jwt', { session: false }), async (req, res) => {

  let searchinput = req.params.search_input.toLowerCase();
  let owners = await userModel.find({ is_owner: true });
  console.log(`***--owners---***`);
  console.log(owners);

  if (!owners) return res.send(400).send("No registered restaurants");

  let restaurants = owners.map(owner => owner.restaurant);
  console.log(`going till herer`);
  let searchresults = [];
  if (req.params.search_input === "_") {
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
  if (searchresults.length > 0) return res.status(200).send(searchresults);

  return res.status(200).send("No match");
});



router.post('/placeorder', async(req, res) => {

console.log(`******----placeorder------******`);
console.log(req.body);

  let user = await userModel.findOne({
    _id: req.body.user_id
  });
  if (!user) return res.status(400).send("User does not exist");
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
  let rest = await userModel.findOne({
    "restaurant._id": req.body.res_id
  });
  if (!res) return res.status(400).send("Restaurant does not exist");
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
  itemName: req.body.cart_items[0].item_name,
    itemPrice: req.body.cart_items[0].item_price,
    item_quantity: req.body.cart_items[0].item_quantity,
}

  let order = new orderModel({
    order_status : req.body.order_status,
    total : req.body.total,
    order_items : items
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

  let place_order = await order.save();

  if (place_order) {
    return res.status(200).send("ORDER_PLACED");
  } else {
    return res.status(400).send("Some thing went wrong");
  }



});


module.exports = router;