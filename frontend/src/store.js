import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window._REDUX_DEVTOOLS_EXTENSION_ ? window._REDUX_DEVTOOLS_EXTENSION_() : f => f
    ));

export default store;