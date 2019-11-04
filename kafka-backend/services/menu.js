const userModel = require('../db_Schema/user')


function handle_request(msg, callback) {
console.log(`%%%%%%%%%%%%%%%%%%%%%%%%%%`);
    res = {}

        console.log(msg);
        console.log(`hi`);
        userModel.findById(msg.user_id, (err, owner) => {
            if (err) {
                console.log(err);
                callback(err,"SOMETHING_WENT_WRONG");
            }
            if (!owner) callback(err,"User does not exist");
            else {
                console.log(`***************----OWNER_PRESENT-----****************`);
                console.log(owner);
                 callback(null,owner.restaurant.menu_sections);
            }
        });
}
exports.handle_request = handle_request;