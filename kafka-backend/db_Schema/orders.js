const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var customer = {
    customer_id: {type: String, required: true},
    customer_name: {type: String, required: true},
};

var restaurant = {
    res_id: {type: String, required: true},
    owner_user_id: {type: String, required: true},
    res_name: {type: String, required: true},
};

var messages = {
    order_id:  {type: String},
    sender_name: {type: String},
    receiver_name: {type: String},
    messageText: {type: String},
}

var itemsSchema = new Schema({
    itemName: {type: String, required: true},
    itemPrice: {type: String, required: true},
    item_quantity: {type: String, required: true},
},
{
    versionKey: false
});

var ordersSchema = new Schema({
    customer: customer,
    restaurant: restaurant,
    messages: [],
    total: {type: String, required: true},
    order_status: {type: String, required: true},
    order_date: {type: String, required: true},
    order_items: [itemsSchema],
},
{
    versionKey: false
});

module.exports = mongoose.model('order', ordersSchema);