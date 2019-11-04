const userModel = require('../db_Schema/user')




function handle_request(msg, callback) {

    var res = {};

    console.log(msg.originalUrl);
    if (msg.originalUrl === '/section/editsection') {

        console.log(`\n\n****---req.body----****`);
        console.log(msg.body);
        userModel.findById(msg.user_id, (err, fetchedUser) => {
            if (err) {
                callback(err, "ERROR")
            }
            else if (fetchedUser) {
                console.log(`****----fetchedUser-----****`);
                console.log(fetchedUser);
                let sectionObj = fetchedUser.restaurant.menu_sections.id(msg.section_id)
                if (!sectionObj) {
                    callback(err, "SECTION_DOES_NOT_EXISTS")
                } else {
                    sectionObj.menu_section_name = msg.dynamic_menu_section_name;
                    fetchedUser.save((err, dbres) => {
                        if (err) {
                            console.log(`****----DB_ERROR-----****`);
                            console.log(err);
                            callback(err, "ERROR")
                        } else {
                            console.log(`****----DB_RES-----****`);
                            console.log(dbres);
                            callback(null, "SUCCESS")
                        }
                    })
                }
            }
        });

    }


    else if (msg.originalUrl === '/section/addsection') {

        var flag = 0
        userModel.findById(msg.user_id, (err, fetchedUser) => {
            if (err) {
                callback(err, "Error in Data");
            }
            console.log(fetchedUser)
            fetchedUser.restaurant.menu_sections.map(sec => {
                if (sec.menu_section_name == msg.sectionName) {
                    flag = 1;
                }
            })
            if (!flag) {
                fetchedUser.restaurant.menu_sections.push({ menu_section_name: msg.sectionName, restaurant_ref: fetchedUser.restaurant._id })
                fetchedUser.save((err, dbres) => {
                    if (err) {
                        console.log(err);
                        console.log('SECTION_ADDITION_FAILED');
                        callback(null, "SECTION_ADDITION_FAILED")
                        return;
                    }
                    console.log(`SECTION_ADDED`);
                    callback(null, "SECTION_ADDED")
                    return;
                })
            } else {
                console.log(`SECTION_EXISTS`);
                callback(null, "SECTION_EXISTS")
            }
        })
    }


    else if (msg.originalUrl === '/section/deletesection') {


        console.log(`**--------body-------**`);
        console.log(msg);

        userModel.findById(msg.user_id, (err, fetchedUser) => {
            if (err) {
                callback(err, "ERROR")
            }
            else if (fetchedUser) {
                console.log(`**--------fetchedUser-------**`);
                console.log(fetchedUser);
                let section = fetchedUser.restaurant.menu_sections.id(msg.menu_section_id)
                if (!section) {
                    console.log(`**--------section not found-------**`);
                    console.log(section);
                    callback(err, "SECTION_DOES_NOT_EXISTS")
                } else {
                    section.remove();
                    fetchedUser.save((err, dbres) => {
                        if (err) {
                            console.log(`**--------err-------**`);
                            console.log(err);
                            callback(err, "ERROR")
                        } else if (dbres) {
                            console.log(`**--------dbres-------**`);
                            console.log(dbres);
                            callback(null, "SECTION_DELETED_SUCCESSFULLY")
                        }
                    });
                }
            }
        });
    }

    else {

        console.log(msg)
        userModel.findById(msg.user_id, (err, owner) => {
            if (err) {
                callback(err, "Error in Data")
            }
            if (!owner) {
                callback(err, "User does not exist");
            }
            else {
                callback(null, owner.restaurant.menu_sections);
            }
        });

    }


};


exports.handle_request = handle_request;