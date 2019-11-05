import { LOGIN } from '../actions/types'

const initialState = {
    loginState: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loginState: action.payload
            }
            break;

        default:
            return {
                ...state
            }
            break;
    }
}