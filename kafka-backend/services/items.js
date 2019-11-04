//var bcrypt = require('bcrypt');
const userModel = require('../db_Schema/user')

function handle_request(msg, callback) {

    var res = {};

    console.log(msg.originalUrl);
    if (msg.originalUrl === '/item/additem') {//switch functionality


        let itemObject = {
            itemName: msg.itemName,
            itemDescription: msg.itemDescription,
            itemPrice: msg.itemPrice,
            sec_ref: msg.menu_section_id,
        }
        console.log(itemObject);

        userModel.findById(msg.user_id, (err, fetchedUser) => {
            if (err) {
                callback(err, "ITEM_ADDITION_FAILED");
            } else if (fetchedUser) {
                console.log(`*****----fetcheduser-----****`); console.log(fetchedUser);
                let section = fetchedUser.restaurant.menu_sections.id(msg.menu_section_id);
                if (!section) {
                    callback(err, "SECTION_NOT_FOUND");
                } else {
                    let itemFlag;
                    section.menu_item.map(item => {
                        if (item.itemName === msg.itemName) {
                            itemFlag = true;
                        }
                    })
                    if (!itemFlag) {
                        console.log(`*****----section-----****`); console.log(section);
                        section.menu_item.push(itemObject);
                        fetchedUser.save((err, dbres) => {
                            if (err) {
                                callback(err, "ITEM_ADDITION_FAILED");
                            } else {
                                console.log(`*****-----dbres----****`);
                                console.log(dbres)
                                callback(null, "ITEM_ADDED")
                            }
                        })
                    }
                    else {
                        callback(null, "ITEM_EXISTS")
                    }
                }
            }
        });
    }

    else if (msg.originalUrl === '/item/update') {

        userModel.findById(msg.user_id, (err, fetchedUser) => {
            if (err) {
                callback(null, "SOMETHING_WENT_WRONG")
            } else if (fetchedUser) {
                section = fetchedUser.restaurant.menu_sections.id(msg.sec_id);
                if (!section) {
                    callback(null, "SECTION_NOT_FOUND");
                } else {
                    let itemExists = section.menu_item.filter(item => {

                        console.log(`****---RED_ALERT--*****`);
                        console.log(item.itemName);
                        console.log(msg.newItemName);
                        console.log(`****---RED_END--*****`);


                        if (item.itemName === msg.newItemName) {
                            console.log(`found match!!!!!!!!!!!!!!!!!!!`);
                            return item
                        }
                    })
                    console.log(`***--itemExists--****`);
                    console.log(itemExists);
                    if (itemExists.length === 0) {

                        item = section.menu_item.id(msg.item_id)
                        if (item) {
                            item.itemName = msg.newItemName;
                            item.itemDescription = msg.newItemDescription;
                            item.itemPrice = msg.newItemPrice;

                            fetchedUser.save((err, dbres) => {
                                if (err) {
                                    console.log('SOMETHING_WENT_WRONG');
                                    callback(null, 'SOMETHING_WENT_WRONG')
                                } else {
                                    console.log('UPDATE_SUCCESSFULL');
                                    callback(null, 'UPDATE_SUCCESSFULL')
                                }
                            })
                        }
                    } else {
                        callback(null, 'ITEM_EXISTS_CANNOT_UPDATE')
                    }
                }
            }
        })

    }




    else if (msg.originalUrl === '/item/deleteitem') {

console.log(`#######################`);
        userModel.findById(msg.user_id, (err, fetchedUser) => {
            if (err) {
                callback(null, "SOMETHING_WENT_WRONG");
            } else if (fetchedUser) {
                section = fetchedUser.restaurant.menu_sections.id(msg.sec_id);
                console.log(`**---section----**`);
                console.log(section);
                item = section.menu_item.id(msg.item_id);
                console.log(`**---item----**`);
                console.log(item);
                item.remove();
                fetchedUser.save((err, dbres) => {
                    if (err) {
                        console.log(err);
                        console.log("DELETION_FAILED");
                        callback(null, 'DELETION_FAILED')

                    } else {
                        console.log(`***-------item_added-------***`)
                        callback(null, "ITEM_DELETED_SUCCESSFULLY")
                        console.log("ITEM_DELETED");
                    }
                })
            }
        });
    }







};


exports.handle_request = handle_request;