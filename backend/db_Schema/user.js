var mongoose = require('mongoose');
const passwordHash = require('password-hash');
const Schema = mongoose.Schema

var itemSchema = new mongoose.Schema({
    itemName :  {type: String, required: true},
    item_image :  {type: String},
    itemPrice :  {type: Number, required: true},
    itemDescription :  {type: String, required: true},
    sec_ref : {type: Schema.Types.ObjectId}
},{versionKey : false});

var sectionSchema = new mongoose.Schema({
    menu_section_name : {type: String, required: true},
    restaurant_ref : {type: Schema.Types.ObjectId},
    menu_item : [itemSchema]
},{versionKey :false});

var restaurantSchema = new mongoose.Schema({
    res_name:{type: String,required: true},
    res_cuisine:{type: String,required: true},
    res_zip_code:{type: String,required: true},
    res_image:{type: String},
    user_address: {type: String },
    menu_sections: [sectionSchema],
    user_ref : {type: Schema.Types.ObjectId}
},{ versionKey: false });


// Schema defines how the user's data will be stored in MongoDB
var UserSchema = new mongoose.Schema({
    name: {type: String,required: true},
    email: {type: String,lowercase: true,unique: true,required: true},
    password: {type: String,required: true},
    address: {type: String,required: true },
    phone_number: {type: String,required: true},
    is_owner: {type: Boolean, required:true},
    restaurant : restaurantSchema
}, 
{ versionKey: false });


module.exports = mongoose.model('User', UserSchema);
//User -- gets converted to a table in mongo adding an 's' at the end and all small letters