import { combineReducers } from 'redux';
// import profileReducer from './profileReducer'
// import loginReducer from './loginReducer';
// import signupReducer from './signupReducer';
// import restaurantReducer from './restaurantReducer';
// import menuSectionReducer from './menuSectionReducer';
import itemReducer from './itemReducer';
// import orderReducer from './orderReducer';
// import messageReducer from './messageReducer';

export default combineReducers({
    // login: loginReducer,
    // signup: signupReducer,
    // profile: profileReducer,
    // restaurant: restaurantReducer,
    // menuSection: menuSectionReducer,
    itemReducer: itemReducer,
    // order: orderReducer,
    // messenger: messageReducer,
});