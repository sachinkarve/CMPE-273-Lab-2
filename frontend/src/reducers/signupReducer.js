import { SIGNUP, OWNERSIGNUP } from '../actions/types'

const initialState = {
    signupState: {},
    ownerSignupState :{}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SIGNUP:
            return {
                ...state,
                signupState: action.payload
            }
            break;
        case OWNERSIGNUP:
            return {
                ...state,
                ownerSignupState: action.payload
            }
            break;

        default:
            return {
                ...state
            }
            break;
    }
}