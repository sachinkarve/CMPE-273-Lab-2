import { ADD_SECTION, DELETE_SECTION, UPDATE_SECTION } from '../actions/types'

const initialState = {
    sectionState: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_SECTION:
            return {
                ...state,
                sectionState: action.payload
            }
            break;

        case DELETE_SECTION:
            return {
                ...state,
                sectionState: action.payload
            }
            break;

        case UPDATE_SECTION:
            return {
                ...state,
                sectionState: action.payload
            }
            break;

        default:
            return {
                ...state
            }
            break;
    }
}