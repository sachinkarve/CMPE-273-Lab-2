import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from '../actions/types'

const initialState = {
    itemState: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                itemState: action.payload
            }
            break;

        case DELETE_ITEM:
            return {
                ...state,
                itemState: action.payload
            }
            break;

        case UPDATE_ITEM:
            return {
                ...state,
                itemState: action.payload
            }
            break;

        default:
            return {
                ...state
            }
            break;
    }
}