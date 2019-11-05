import { combineReducers } from 'redux';
// import profileReducer from './profileReducer'
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import ordersReducer from './ordersReducer'
// import restaurantReducer from './restaurantReducer';
import sectionReducer from './sectionReducer';
import itemReducer from './itemReducer';
// import orderReducer from './orderReducer';
 import messagingReducer from './messagingReducer';

export default combineReducers({
    loginReducer: loginReducer,
    signupReducer: signupReducer,
    ordersReducer : ordersReducer,
    // profile: profileReducer,
    // restaurant: restaurantReducer,
    messagingReducer : messagingReducer,
    sectionReducer: sectionReducer,
    itemReducer: itemReducer,
    // order: orderReducer,
    // messenger: messageReducer,
});