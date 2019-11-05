import { combineReducers } from 'redux';
// import profileReducer from './profileReducer'
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
// import restaurantReducer from './restaurantReducer';
import sectionReducer from './sectionReducer';
import itemReducer from './itemReducer';
// import orderReducer from './orderReducer';
// import messageReducer from './messageReducer';

export default combineReducers({
    loginReducer: loginReducer,
    signupReducer: signupReducer,
    // profile: profileReducer,
    // restaurant: restaurantReducer,
    sectionReducer: sectionReducer,
    itemReducer: itemReducer,
    // order: orderReducer,
    // messenger: messageReducer,
});